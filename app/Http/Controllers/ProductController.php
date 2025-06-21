<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get()->map(function ($product) {
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

        return Inertia::render('products', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }
}
