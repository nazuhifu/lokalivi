<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'category_id',
        'price',
        'stock_quantity',
        'image_url',
        'features',
        'specifications',
        'images',
        'rating',
        'review_count'
    ];

    protected $casts = [
        'features' => 'array',
        'specifications' => 'array',
        'images' => 'array',
        'rating' => 'decimal:1',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function getImageUrlAttribute($value)
    {
        if (!$value) return null;
        return '/' . ltrim($value, '/');
    }

    public function getMainImageAttribute()
    {
        // First try to get the primary image from product_images table
        $primaryImage = $this->productImages()->where('is_primary', true)->first();
        if ($primaryImage) {
            return $primaryImage->image_url;
        }

        // Fallback to the first image in product_images
        $firstImage = $this->productImages()->first();
        if ($firstImage) {
            return $firstImage->image_url;
        }

        // Fallback to the old image_url field
        if ($this->images && count($this->images) > 0) {
            return $this->images[0];
        }

        return $this->image_url;
    }

    public function getAllImagesAttribute()
    {
        $images = $this->productImages()->orderBy('sort_order')->get();
        if ($images->count() > 0) {
            return $images->pluck('image_url')->toArray();
        }

        // Fallback to the old images field
        if ($this->images && count($this->images) > 0) {
            return $this->images;
        }

        // Fallback to single image_url
        return $this->image_url ? [$this->image_url] : [];
    }
}
