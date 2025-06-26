<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Chair'],
            ['name' => 'Table'],
            ['name' => 'Sofa'],
            ['name' => 'Bed'],
            ['name' => 'Desk'],
            ['name' => 'Cabinet'],
            ['name' => 'Shelf'],
            ['name' => 'Wardrobe'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
            ]);
        }
    }
}
