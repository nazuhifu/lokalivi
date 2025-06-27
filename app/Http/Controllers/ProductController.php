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
        
        // Handle search parameter
        if ($request->has('search') && $request->search !== '') {
            $searchTerm = $request->search;
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }
        
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
                'image_url' => $product->main_image ?? '/placeholder.svg',
                'main_image' => $product->main_image ?? '/placeholder.svg',
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
            'searchTerm' => $request->input('search', ''),
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'reviews.user', 'productImages']);

        // Get related products from the same category
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get()
            ->map(function ($relatedProduct) {
                return [
                    'id' => $relatedProduct->id,
                    'name' => $relatedProduct->name,
                    'price' => $relatedProduct->price,
                    'image_url' => $relatedProduct->main_image ?? '/placeholder.svg',
                    'rating' => $relatedProduct->rating,
                ];
            });

        return Inertia::render('product-detail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category->name ?? 'Uncategorized',
                'price' => $product->price,
                'stock_quantity' => $product->stock_quantity,
                'image_url' => $product->main_image ?? '/placeholder.svg',
                'images' => $product->all_images,
                'features' => $product->features ?? [],
                'specifications' => $product->specifications ?? [],
                'rating' => $product->rating,
                'review_count' => $product->review_count,
                'reviews' => $product->reviews->map(function ($review) {
                    return [
                        'id' => $review->id,
                        'rating' => $review->rating,
                        'comment' => $review->comment,
                        'user_name' => $review->user->name,
                        'created_at' => $review->created_at->format('M d, Y'),
                    ];
                }),
            ],
            'relatedProducts' => $relatedProducts,
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
