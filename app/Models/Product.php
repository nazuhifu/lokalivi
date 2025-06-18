<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'description', 'category_id', 'price', 'stock_quantity', 'image_url'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
