<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Chair'],
            ['name' => 'Table'],
            ['name' => 'Sofa'],
            ['name' => 'Bed'],
        ];

        $extensions = ['jpg', 'jpeg', 'png'];

        foreach ($categories as $index => $category) {
            $id = $index + 1;
            $imageUrl = null;

            // Cek gambar berdasarkan ID + ekstensi
            foreach ($extensions as $ext) {
                $path = public_path("images/category/{$id}.{$ext}");
                if (file_exists($path)) {
                    $imageUrl = "images/category/{$id}.{$ext}";
                    break;
                }
            }

            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'image_url' => $imageUrl ?? 'placeholder.svg', // fallback jika tidak ditemukan
            ]);
        }
    }
}
