<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->error('No categories found. Please run CategorySeeder first.');
            return;
        }

        $products = [
            [
                'name' => 'Oakwood Dining Table',
                'description' => 'Crafted from solid oak with traditional joinery techniques, this dining table combines timeless design with modern functionality. The natural grain patterns make each piece unique, while the durable finish ensures it will last for generations.',
                'category_id' => $categories->where('name', 'Table')->first()->id,
                'price' => 1299000,
                'stock_quantity' => 5,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Solid oak construction',
                    'Traditional mortise and tenon joinery',
                    'Natural oil finish',
                    'Seats 6-8 people comfortably',
                    'Dimensions: 72" L x 38" W x 30" H',
                ],
                'specifications' => [
                    'Material' => 'Solid Oak',
                    'Finish' => 'Natural Oil',
                    'Dimensions' => '72" L x 38" W x 30" H',
                    'Weight' => '120 lbs',
                    'Assembly' => 'Partial assembly required',
                    'Warranty' => '5-year manufacturer warranty',
                ],
                'rating' => 4.8,
                'review_count' => 24,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'description' => 'Designed for maximum comfort during long work hours, this ergonomic office chair features adjustable lumbar support, breathable mesh back, and premium padding. Perfect for home offices and corporate environments.',
                'category_id' => $categories->where('name', 'Chair')->first()->id,
                'price' => 899000,
                'stock_quantity' => 12,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Ergonomic design with lumbar support',
                    'Breathable mesh back',
                    'Adjustable height and armrests',
                    '360-degree swivel',
                    'Heavy-duty base with smooth-rolling casters',
                ],
                'specifications' => [
                    'Material' => 'Mesh, Steel, Aluminum',
                    'Weight Capacity' => '300 lbs',
                    'Height Range' => '18.5" - 22.5"',
                    'Assembly' => 'Required',
                    'Warranty' => '3-year limited warranty',
                ],
                'rating' => 4.6,
                'review_count' => 18,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Modern L-Shaped Sofa',
                'description' => 'This contemporary L-shaped sofa offers both style and comfort with its clean lines and plush cushions. Perfect for family gatherings and movie nights, it provides ample seating space while maintaining a sleek appearance.',
                'category_id' => $categories->where('name', 'Sofa')->first()->id,
                'price' => 2499000,
                'stock_quantity' => 3,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'L-shaped design for maximum seating',
                    'High-density foam cushions',
                    'Stain-resistant fabric',
                    'Reversible chaise section',
                    'Includes throw pillows',
                ],
                'specifications' => [
                    'Material' => 'Polyester Blend',
                    'Frame' => 'Solid Wood',
                    'Dimensions' => '84" W x 84" D x 35" H',
                    'Seat Depth' => '22"',
                    'Assembly' => 'Minimal assembly required',
                    'Warranty' => '2-year warranty',
                ],
                'rating' => 4.7,
                'review_count' => 31,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Queen Platform Bed',
                'description' => 'A minimalist platform bed with clean lines and sturdy construction. The low-profile design creates a modern aesthetic while providing excellent support for your mattress. Includes a headboard for added comfort.',
                'category_id' => $categories->where('name', 'Bed')->first()->id,
                'price' => 1599000,
                'stock_quantity' => 8,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Platform bed design',
                    'Built-in headboard',
                    'No box spring required',
                    'Sturdy wooden slats',
                    'Easy assembly',
                ],
                'specifications' => [
                    'Material' => 'Solid Pine Wood',
                    'Finish' => 'Natural',
                    'Bed Size' => 'Queen (60" x 80")',
                    'Height' => '28"',
                    'Assembly' => 'Required',
                    'Warranty' => '1-year warranty',
                ],
                'rating' => 4.5,
                'review_count' => 15,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Standing Desk Converter',
                'description' => 'Transform your existing desk into a standing workspace with this adjustable desk converter. Features smooth height adjustment, spacious work surface, and cable management to keep your workspace organized.',
                'category_id' => $categories->where('name', 'Desk')->first()->id,
                'price' => 599000,
                'stock_quantity' => 20,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Adjustable height from 5" to 17"',
                    'Spacious 32" x 24" work surface',
                    'Gas spring lift mechanism',
                    'Cable management tray',
                    'Anti-slip feet',
                ],
                'specifications' => [
                    'Material' => 'Steel, MDF',
                    'Weight Capacity' => '35 lbs',
                    'Height Range' => '5" - 17"',
                    'Surface Size' => '32" x 24"',
                    'Assembly' => 'Minimal assembly',
                    'Warranty' => '2-year warranty',
                ],
                'rating' => 4.4,
                'review_count' => 22,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
        ];

        foreach ($products as $productData) {
            $images = $productData['images'] ?? [];
            unset($productData['images']);

            $product = Product::create($productData);

            // Create product images
            foreach ($images as $index => $imageUrl) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => $imageUrl,
                    'sort_order' => $index,
                    'is_primary' => $index === 0,
                ]);
            }
        }

        $this->command->info('Products seeded successfully!');
    }
}
