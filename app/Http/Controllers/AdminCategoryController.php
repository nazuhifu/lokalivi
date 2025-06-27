<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminCategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->latest()->get()->map(function ($category) {
            $imageUrl = $this->getCategoryImage($category->id);
            
            // Temporary debugging
            \Log::info("Category {$category->id} ({$category->name}): image_url = {$imageUrl}");
            
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'image_url' => $imageUrl,
                'products_count' => $category->products_count,
                'created_at' => $category->created_at->format('M d, Y'),
            ];
        });
        
        return Inertia::render('admin/categories', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/category-form', [
            'category' => null,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('category', $filename, 'public');
            $data['image_url'] = 'storage/' . $path;
        }

        Category::create($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category)
    {
        $formattedCategory = [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'image_url' => $this->getCategoryImage($category->id),
        ];
        
        return Inertia::render('admin/category-form', [
            'category' => $formattedCategory,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image_url && str_starts_with($category->image_url, 'storage/')) {
                Storage::disk('public')->delete(str_replace('storage/', '', $category->image_url));
            }
            
            $image = $request->file('image');
            $filename = time() . '_' . $image->getClientOriginalName();
            $path = $image->storeAs('category', $filename, 'public');
            $data['image_url'] = 'storage/' . $path;
        }

        $category->update($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category)
    {
        // Check if category has products
        if ($category->products()->count() > 0) {
            return back()->with('error', 'Cannot delete category with existing products.');
        }

        // Delete image if exists
        if ($category->image_url && str_starts_with($category->image_url, 'storage/')) {
            Storage::disk('public')->delete(str_replace('storage/', '', $category->image_url));
        }

        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }

    private function getCategoryImage($categoryId)
    {
        // First check if there's a database image_url
        $category = Category::find($categoryId);
        if ($category && $category->image_url) {
            return $category->image_url;
        }

        // Fallback to file-based approach for existing images
        $extensions = ['png', 'jpg', 'jpeg'];
        foreach ($extensions as $ext) {
            $fullPath = public_path("images/category/{$categoryId}.{$ext}");
            if (file_exists($fullPath)) {
                \Log::info("Found image for category {$categoryId}: {$fullPath}");
                return "/images/category/{$categoryId}.{$ext}";
            }
        }
        
        \Log::info("No image found for category {$categoryId}, using placeholder");
        return '/placeholder.svg';
    }
} 