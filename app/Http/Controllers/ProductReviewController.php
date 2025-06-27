<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductReviewController extends Controller
{
  public function store(Request $request, Product $product)
  {
    $request->validate([
      'rating' => 'required|integer|min:1|max:5',
      'comment' => 'nullable|string|max:1000',
    ]);

    // Check if user already reviewed this product
    $existingReview = ProductReview::where('user_id', Auth::id())
      ->where('product_id', $product->id)
      ->first();

    if ($existingReview) {
      return back()->with('error', 'You have already reviewed this product.');
    }

    // Create the review
    ProductReview::create([
      'product_id' => $product->id,
      'user_id' => Auth::id(),
      'rating' => $request->rating,
      'comment' => $request->comment,
    ]);

    // Update product rating and review count
    $this->updateProductRating($product);

    return back()->with('success', 'Review submitted successfully.');
  }

  public function update(Request $request, Product $product, ProductReview $review)
  {
    $request->validate([
      'rating' => 'required|integer|min:1|max:5',
      'comment' => 'nullable|string|max:1000',
    ]);

    // Check if user owns this review
    if ($review->user_id !== Auth::id()) {
      return back()->with('error', 'You can only edit your own reviews.');
    }

    $review->update([
      'rating' => $request->rating,
      'comment' => $request->comment,
    ]);

    // Update product rating and review count
    $this->updateProductRating($product);

    return back()->with('success', 'Review updated successfully.');
  }

  public function destroy(Product $product, ProductReview $review)
  {
    // Check if user owns this review or is admin
    if ($review->user_id !== Auth::id() && !Auth::user()->is_admin) {
      return back()->with('error', 'You can only delete your own reviews.');
    }

    $review->delete();

    // Update product rating and review count
    $this->updateProductRating($product);

    return back()->with('success', 'Review deleted successfully.');
  }

  private function updateProductRating(Product $product)
  {
    $reviews = $product->reviews;

    if ($reviews->count() > 0) {
      $averageRating = $reviews->avg('rating');
      $product->update([
        'rating' => round($averageRating, 1),
        'review_count' => $reviews->count(),
      ]);
    } else {
      $product->update([
        'rating' => 0,
        'review_count' => 0,
      ]);
    }
  }
}
