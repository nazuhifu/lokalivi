<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Cart;
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
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'nullable|integer|min:1',
        ]);

        $product = Product::findOrFail($data['product_id']);
        $user = $request->user();

        $cartItem = $user->carts()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->update([
                'quantity' => $cartItem->quantity + ($data['quantity'] ?? 1),
            ]);
        } else {
            $user->carts()->create([
                'product_id' => $product->id,
                'name'       => $product->name,
                'price'      => (int) $product->price,
                'image'      => $product->image_url,
                'quantity'   => $data['quantity'] ?? 1,
            ]);
        }

        return back()->with('success', 'Product added/updated in cart');
    }

    public function update(Request $request, $id)
    {
        $quantity = $request->validate(['quantity' => 'required|integer|min:0'])['quantity'];
        $item = $request->user()->carts()->findOrFail($id);

        if ($quantity === 0) {
            $item->delete();
        } else {
            $item->update(['quantity' => $quantity]);
        }

        return back()->with('success', 'Cart updated');
    }

    public function destroy(Request $request, $id)
    {
        $item = $request->user()->carts()->findOrFail($id);
        $item->delete();

        return back()->with('success', 'Item removed from cart');
    }
}
