<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Settings\ProfileController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');

Route::get('/categories', fn () => Inertia::render('categories'))->name('categories');
Route::get('/about', fn () => Inertia::render('about'))->name('about');
Route::get('/contact', fn () => Inertia::render('contact'))->name('contact');
Route::get('/cart', fn () => Inertia::render('cart'))->name('cart');
Route::get('/wishlist', fn () => Inertia::render('wishlist'))->name('wishlist');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            'user' => Auth::user(),
            'cart' => [
                [
                    'id' => 1,
                    'product' => [
                        'name' => 'Oakwood Dining Table',
                        'price' => 1299,
                        'image' => '/placeholder.svg?height=100&width=100',
                    ],
                    'quantity' => 1,
                ],
                [
                    'id' => 7,
                    'product' => [
                        'name' => 'Velvet Armchair',
                        'price' => 799,
                        'image' => '/placeholder.svg?height=100&width=100',
                    ],
                    'quantity' => 2,
                ],
            ]
        ]);
    })->name('dashboard');

    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
