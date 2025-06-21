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
        $categories = Category::withCount('products')->get();

        return Inertia::render('categories', [
            'categories' => $categories,
        ]);
    }
}
