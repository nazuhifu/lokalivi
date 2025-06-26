<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'category_id' => Category::inRandomOrder()->first()->id,
            'price' => $this->faker->numberBetween(499000, 5000000),
            'stock_quantity' => $this->faker->numberBetween(10, 100),
            'image_url' => $this->faker->imageUrl(640, 480, 'product', true, 'Faker'),
        ];
    }
}
