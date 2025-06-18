<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Jalankan migrasi dan buat data dummy produk
    Product::factory()->count(4)->create();
});

it('returns a successful response', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});
