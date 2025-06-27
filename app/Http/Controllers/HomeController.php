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

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
        ]);
    }
}
