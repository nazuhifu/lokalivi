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
                'name' => 'Eum Bar Chair',
                'description' => 'Combining modern aesthetics with traditional craftsmanship, the Eum Bar Chair delivers both style and comfort. It features Eastern Edition\'s signature copper bar joint technique and is customizable with a range of high-quality fabrics. Designed for contemporary interiors, it blends seamlessly into residential and commercial spaces.',
                'category_id' => $categories->where('name', 'Chair')->first()->id,
                'price' => 1450000,
                'stock_quantity' => 10,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Copper bar joint technique for enhanced durability',
                    'Customizable fabric options',
                    'Ergonomically designed for comfort',
                    'Perfect for dining or bar use',
                    'Handcrafted ash wood frame in dark finish',
                ],
                'specifications' => [
                    'Material' => 'Ash wood and PE 100% Fabric',
                    'Finish' => 'Dark Ash Wood',
                    'Available Fabrics' => 'AL-TS-100-IVORY, AL-TS-101-CREAM, AL-TS-300-ULTIMATE GRAY, AT-TS-301-STONE',
                    'Dimensions' => 'W460 x D475 x H900 / SH650mm',
                    'Assembly' => 'Fully assembled',
                    'Warranty' => '3-year limited warranty',
                ],
                'rating' => 4.6,
                'review_count' => 12,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Square Dining Chair',
                'description' => 'A minimalist yet elegant piece, the Square Dining Chair brings contemporary form and traditional craftsmanship together. With a structured silhouette, cushioned seat, and intricately woven backrest, it offers both comfort and character to any dining setup. A functional handle on the back adds convenience while showcasing artisan details.',
                'category_id' => $categories->where('name', 'Chair')->first()->id,
                'price' => 1250000,
                'stock_quantity' => 8,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Minimalist and geometric design',
                    'Comfortable seat cushion and supportive backrest',
                    'Convenient handle for easy mobility',
                    'Woven back detailing showcasing traditional woodworking',
                    'Ideal for both residential and hospitality use',
                ],
                'specifications' => [
                    'Material' => 'Oak Veneer (Dark) & Fabric',
                    'Fabric Type' => 'CT-CS-C5004-BEIGE',
                    'Frame Finish' => 'Natural & Dark Oak Veneer',
                    'Dimensions' => 'W440 x D440 x H750 / SH480mm',
                    'Weight' => 'Approx. 9 kg',
                    'Assembly' => 'No assembly required',
                    'Warranty' => '2-year limited warranty',
                ],
                'rating' => 4.7,
                'review_count' => 18,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Joined Lounge Chair',
                'description' => 'A fusion of traditional wood textures and modern form, the Joined Lounge Chair—also known as the Songjung Lounge Chair—presents a luxurious yet minimalistic profile. Its thick cushioning and solid ash wood frame offer unmatched comfort and visual warmth, making it an ideal piece for both rest and reflection.',
                'category_id' => $categories->where('name', 'Chair')->first()->id,
                'price' => 3700000,
                'stock_quantity' => 4,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Solid ash wood frame in dark finish',
                    'Premium fabric and calf leather options',
                    'Deep cushioning for superior comfort',
                    'Low seating height ideal for lounging',
                    'Crafted with traditional woodworking techniques',
                ],
                'specifications' => [
                    'Material' => 'Ash Wood and Calf Leather / Fabric',
                    'Frame Finish' => 'Dark Ash Wood',
                    'Available Fabrics' => 'TK-CH, TK-CH-BLACK, TK-CH-WHITE, DA-BN (White, Ivory, Gray, Charcoal), AL-TS-100-IVORY, AL-TS-101-CREAM, AL-TS-300-ULTIMATE GRAY, AT-TS-301-STONE',
                    'Dimensions' => 'W785 x D755 x H670 / SH360mm',
                    'Assembly' => 'No assembly required',
                    'Warranty' => '5-year structural warranty',
                ],
                'rating' => 4.9,
                'review_count' => 10,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => "'ㄷ' Lounge Chair",
                'description' => "Designed for modern living in compact spaces, the ‘ㄷ’ Lounge Chair offers a refined blend of comfort and simplicity. Its angled backrest and armrest provide ergonomic support, while the mix of ash wood, polished mirror steel, and soft fabrics creates a piece that’s both functional and visually distinct.",
                'category_id' => $categories->where('name', 'Chair')->first()->id,
                'price' => 2100000,
                'stock_quantity' => 6,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Angled back and armrest for ergonomic comfort',
                    'Compact footprint ideal for small spaces',
                    'Mirror steel accents for a modern touch',
                    'Wide fabric customization options',
                    'Hand-finished ash wood frame available in dark or black',
                ],
                'specifications' => [
                    'Material' => 'Ash Wood, Mirror Steel, Fabric (PE 94%, AC 6%)',
                    'Frame Finish' => 'Dark or Black Ash Wood, with Mirror Steel accent',
                    'Available Fabrics' => 'DA-BN (White, Ivory, Gray, Charcoal), AL-TS-100-IVORY, AL-TS-101-CREAM, AL-TS-300-ULTIMATE GRAY, AT-TS-301-STONE',
                    'Dimensions' => 'W650 x D720 x H710 / SH450mm',
                    'Assembly' => 'No assembly required',
                    'Warranty' => '3-year limited warranty',
                ],
                'rating' => 4.5,
                'review_count' => 9,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
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
