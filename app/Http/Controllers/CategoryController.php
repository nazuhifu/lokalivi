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
        $category = Category::find($categoryId);
        if ($category && $category->image_url) {
            return $category->image_url;
        }

        $extensions = ['png', 'jpg', 'jpeg'];
        foreach ($extensions as $ext) {
            $fullPath = public_path("images/category/{$categoryId}.{$ext}");
            if (file_exists($fullPath)) {
                return "/images/category/{$categoryId}.{$ext}";
            }
        }
        return '/placeholder.svg';
    }
}
