<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');
        
        // Support multiple categories
        $categoriesParam = $request->input('categories');
        if ($categoriesParam) {
            $categoryNames = array_filter(explode(',', $categoriesParam));
            if (count($categoryNames) > 0) {
                $query->whereHas('category', function ($q) use ($categoryNames) {
                    $q->whereIn('name', $categoryNames);
                });
            }
        } elseif ($request->has('category') && $request->category !== '') {
            // Fallback for single category (from categories page)
            $categoryName = $request->category;
            $query->whereHas('category', function ($q) use ($categoryName) {
                $q->where('name', $categoryName);
            });
        }

        $products = $query->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category->name ?? 'Uncategorized',
                'price' => $product->price,
                'stock_quantity' => $product->stock_quantity,
                'image_url' => $product->image_url,
            ];
        });

        $categories = Category::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
            ];
        });

        // Pass selected categories to frontend
        $selectedCategories = $categoriesParam
            ? array_filter(explode(',', $categoriesParam))
            : ($request->category ? [$request->category] : []);

        return Inertia::render('products', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategories' => $selectedCategories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $data['image_url'] = 'storage/' . $path;
        }

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }
}
