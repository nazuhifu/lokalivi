<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Menampilkan isi keranjang pengguna
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $cart = $user->carts()->get(['id', 'name', 'price', 'quantity', 'image'])->toArray();

        return Inertia::render('cart', [
            'cart' => $cart
        ]);
    }

    /**
     * Menambahkan produk ke keranjang
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'nullable|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        $request->user()->carts()->create([
            'name' => $product->name,
            'price' => (int) $product->price,
            'quantity' => $request->input('quantity', 1),
            'image' => $product->image_url,
        ]);

        return back()->with('success', 'Product added to cart');
    }
}
