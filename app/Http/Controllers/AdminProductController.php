<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
  public function index()
  {
    $products = Product::with('category')->latest()->get()->map(function ($product) {
      return [
        'id' => $product->id,
        'name' => $product->name,
        'image_url' => $product->main_image ?? '/placeholder.svg',
        'price' => $product->price,
        'stock_quantity' => $product->stock_quantity,
        'category' => $product->category,
      ];
    });
    
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
      'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
      'features' => 'nullable|string',
      'specifications' => 'nullable|string',
    ]);

    // Parse JSON fields
    if (isset($data['features'])) {
      $data['features'] = json_decode($data['features'], true);
    }
    if (isset($data['specifications'])) {
      $data['specifications'] = json_decode($data['specifications'], true);
    }

    // Create the product
    $product = Product::create($data);

    // Handle multiple image uploads
    if ($request->hasFile('images')) {
      $images = $request->file('images');
      foreach ($images as $index => $image) {
        $path = $image->store('products', 'public');
        ProductImage::create([
          'product_id' => $product->id,
          'image_url' => 'storage/' . $path,
          'sort_order' => $index,
          'is_primary' => $index === 0,
        ]);
      }
    }

    return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
  }

  public function edit(Product $product)
  {
    $categories = Category::all();
    $product->load('productImages');
    
    // Format the product data to ensure images are properly displayed
    $formattedProduct = [
      'id' => $product->id,
      'name' => $product->name,
      'description' => $product->description,
      'category_id' => $product->category_id,
      'price' => $product->price,
      'stock_quantity' => $product->stock_quantity,
      'features' => $product->features,
      'specifications' => $product->specifications,
      'product_images' => $product->productImages->map(function ($image) {
        return [
          'id' => $image->id,
          'image_url' => $image->image_url,
        ];
      }),
    ];
    
    return Inertia::render('admin/product-form', [
      'categories' => $categories,
      'product' => $formattedProduct,
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
      'images.*' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
      'features' => 'nullable|string',
      'specifications' => 'nullable|string',
    ]);

    // Parse JSON fields
    if (isset($data['features'])) {
      $data['features'] = json_decode($data['features'], true);
    }
    if (isset($data['specifications'])) {
      $data['specifications'] = json_decode($data['specifications'], true);
    }

    // Update the product
    $product->update($data);

    // Handle multiple image uploads
    if ($request->hasFile('images')) {
      // Delete existing images
      foreach ($product->productImages as $image) {
        if (str_starts_with($image->image_url, 'storage/')) {
          Storage::disk('public')->delete(str_replace('storage/', '', $image->image_url));
        }
        $image->delete();
      }

      // Upload new images
      $images = $request->file('images');
      foreach ($images as $index => $image) {
        $path = $image->store('products', 'public');
        ProductImage::create([
          'product_id' => $product->id,
          'image_url' => 'storage/' . $path,
          'sort_order' => $index,
          'is_primary' => $index === 0,
        ]);
      }
    }

    return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
  }

  public function destroy(Product $product)
  {
    // Delete all product images
    foreach ($product->productImages as $image) {
      if (str_starts_with($image->image_url, 'storage/')) {
        Storage::disk('public')->delete(str_replace('storage/', '', $image->image_url));
      }
    }

    // Delete old single image if exists
    if ($product->image_url && str_starts_with($product->image_url, 'storage/')) {
      Storage::disk('public')->delete(str_replace('storage/', '', $product->image_url));
    }

    $product->delete();
    return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
  }
}
