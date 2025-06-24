<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'name', 'price', 'quantity', 'image'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
