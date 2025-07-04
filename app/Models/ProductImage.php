<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductImage extends Model
{
  use HasFactory;

  protected $fillable = [
    'product_id',
    'image_url',
    'sort_order',
    'is_primary'
  ];

  protected $casts = [
    'is_primary' => 'boolean',
  ];

  public function product()
  {
    return $this->belongsTo(Product::class);
  }

  public function getImageUrlAttribute($value)
  {
    if (!$value) return null;
    return '/' . ltrim($value, '/');
  }
}
