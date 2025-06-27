<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductReviewController;
use App\Models\User;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

Route::get('/about', fn() => Inertia::render('about'))->name('about');
Route::get('/contact', fn() => Inertia::render('contact'))->name('contact');

Route::middleware(['auth'])->group(function () {
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist', [WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{product}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('checkout');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders');
    Route::delete('/orders/{order}', [OrderController::class, 'destroy'])->name('orders.destroy');

    // Product review routes
    Route::post('/products/{product}/reviews', [ProductReviewController::class, 'store'])->name('reviews.store');
    Route::put('/products/{product}/reviews/{review}', [ProductReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/products/{product}/reviews/{review}', [ProductReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');
    
    Route::get('/dashboard', function () {
        $user = Auth::user();
        $orders = [];
        if ($user instanceof User) {
            $orders = $user->orders()->with('items.product')->orderByDesc('created_at')->get();
        }
        return Inertia::render('dashboard', [
            'user' => $user,
            'orders' => $orders,
        ]);
    })->name('dashboard');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/orders', [AdminDashboardController::class, 'orders'])->name('admin.orders');
    
    // Product management routes
    Route::get('/admin/products', [\App\Http\Controllers\AdminProductController::class, 'index'])->name('admin.products.index');
    Route::get('/admin/products/create', [\App\Http\Controllers\AdminProductController::class, 'create'])->name('admin.products.create');
    Route::post('/admin/products', [\App\Http\Controllers\AdminProductController::class, 'store'])->name('admin.products.store');
    Route::get('/admin/products/{product}/edit', [\App\Http\Controllers\AdminProductController::class, 'edit'])->name('admin.products.edit');
    Route::put('/admin/products/{product}', [\App\Http\Controllers\AdminProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{product}', [\App\Http\Controllers\AdminProductController::class, 'destroy'])->name('admin.products.destroy');

    // User management
    Route::get('/admin/users', [\App\Http\Controllers\AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/{id}', [\App\Http\Controllers\AdminUserController::class, 'show'])->name('admin.users.show');
    Route::delete('/admin/users/{id}', [\App\Http\Controllers\AdminUserController::class, 'destroy'])->name('admin.users.destroy');

    // Category management routes
    Route::get('/admin/categories', [\App\Http\Controllers\AdminCategoryController::class, 'index'])->name('admin.categories.index');
    Route::get('/admin/categories/create', [\App\Http\Controllers\AdminCategoryController::class, 'create'])->name('admin.categories.create');
    Route::post('/admin/categories', [\App\Http\Controllers\AdminCategoryController::class, 'store'])->name('admin.categories.store');
    Route::get('/admin/categories/{category}/edit', [\App\Http\Controllers\AdminCategoryController::class, 'edit'])->name('admin.categories.edit');
    Route::put('/admin/categories/{category}', [\App\Http\Controllers\AdminCategoryController::class, 'update'])->name('admin.categories.update');
    Route::delete('/admin/categories/{category}', [\App\Http\Controllers\AdminCategoryController::class, 'destroy'])->name('admin.categories.destroy');
});

Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
