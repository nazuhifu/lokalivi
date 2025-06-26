<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
  public function index()
  {
    $products = Product::with('category')->latest()->get();
    return Inertia::render('admin/products', [
      'products' => $products,
    ]);
  }

  public function create()
  {
    $categories = Category::all();
    return Inertia::render('admin/product-form', [
      'categories' => $categories,
      'product' => null,
    ]);
  }

  public function store(Request $request)
  {
    $data = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'category_id' => 'required|exists:categories,id',
      'price' => 'required|numeric',
      'stock_quantity' => 'required|integer|min:0',
      'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    if ($request->hasFile('image')) {
      $path = $request->file('image')->store('products', 'public');
      $data['image_url'] = 'storage/' . $path;
    }

    Product::create($data);
    return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
  }

  public function edit(Product $product)
  {
    $categories = Category::all();
    return Inertia::render('admin/product-form', [
      'categories' => $categories,
      'product' => $product,
    ]);
  }

  public function update(Request $request, Product $product)
  {
    $data = $request->validate([
      'name' => 'required|string|max:255',
      'description' => 'nullable|string',
      'category_id' => 'required|exists:categories,id',
      'price' => 'required|numeric',
      'stock_quantity' => 'required|integer|min:0',
      'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
    ]);

    if ($request->hasFile('image')) {
      // Delete old image if exists
      if ($product->image_url && str_starts_with($product->image_url, 'storage/')) {
        Storage::disk('public')->delete(str_replace('storage/', '', $product->image_url));
      }
      $path = $request->file('image')->store('products', 'public');
      $data['image_url'] = 'storage/' . $path;
    }

    $product->update($data);
    return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
  }

  public function destroy(Product $product)
  {
    if ($product->image_url && str_starts_with($product->image_url, 'storage/')) {
      Storage::disk('public')->delete(str_replace('storage/', '', $product->image_url));
    }
    $product->delete();
    return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
  }
}
