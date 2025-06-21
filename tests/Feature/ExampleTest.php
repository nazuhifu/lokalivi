<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
});

it('returns a successful response', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});
