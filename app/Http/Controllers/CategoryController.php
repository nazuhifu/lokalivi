<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class CategoryController extends Controller
{
    public function index()
    {
        // Ambil semua kategori dan jumlah produknya
        $categories = Category::withCount('products')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'products_count' => $category->products_count,
                'image' => $this->getCategoryImage($category->id),
            ];
        });

        return Inertia::render('categories', [
            'categories' => $categories,
        ]);
    }

    public function show(Category $category)
    {
        $products = $category->products()->latest()->get();

        return Inertia::render('CategoryPage', [
            'category' => $category,
            'products' => $products,
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
