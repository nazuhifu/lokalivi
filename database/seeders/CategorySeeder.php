<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            ['name' => 'Dresser'],
            ['name' => 'Coffee Table'],
            ['name' => 'Dining Table'],
            ['name' => 'Office Chair'],
            ['name' => 'Recliner'],
            ['name' => 'Bean Bag'],
            ['name' => 'Ottoman'],
            ['name' => 'Bar Stool'],
        ];

        foreach ($categories as $category) {
            \App\Models\Category::create($category);
        }
    }
}
