<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::with('category')
            ->latest()
            ->take(4)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => $product->category->name,
                    'price' => $product->price,
                    'image_url' => $product->main_image ?? '/placeholder.svg',
                ];
            });

        $categories = Category::withCount('products')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'products_count' => $category->products_count,
                'image' => $this->getCategoryImage($category->id),
            ];
        });

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
        ]);
    }

    private function getCategoryImage($categoryId)
    {
        $imagePath = "/images/category/{$categoryId}";
        $extensions = ['png', 'jpg', 'jpeg'];
        foreach ($extensions as $ext) {
            $fullPath = public_path("images/category/{$categoryId}.{$ext}");
            if (file_exists($fullPath)) {
                return "{$imagePath}.{$ext}";
            }
        }
        return '/placeholder.svg';
    }
}
