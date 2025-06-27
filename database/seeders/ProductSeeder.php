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
            [
                'name' => 'Wonban Dining Table',
                'description' => "The Wonban Dining Table features a modern design with bold geometric lines and natural materials. Its combination of steel frame and wooden top creates a sophisticated yet understated centerpiece for any dining space.",
                'category_id' => $categories->where('name', 'Table')->first()->id,
                'price' => 7150000,
                'stock_quantity' => 5,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Geometric modern design',
                    'Durable steel legs for stability',
                    'Natural wood grain tabletop',
                    'Minimalist silhouette fits various interiors',
                    'Compact yet spacious seating for 4-6 people',
                ],
                'specifications' => [
                    'Material' => 'Steel, Wood',
                    'Finish' => 'Matte Black Frame, Natural Wood Top',
                    'Dimensions' => 'W1800 x D900 x H740 mm',
                    'Assembly' => 'Simple assembly required',
                    'Warranty' => '2-year structural warranty',
                ],
                'rating' => 4.7,
                'review_count' => 11,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Black Stone and Wood Dining Table',
                'description' => "This elegant table combines the strength of black stone with the warmth of wood. Designed for refined dining experiences, its contrast of textures brings a modern touch to classic design.",
                'category_id' => $categories->where('name', 'Table')->first()->id,
                'price' => 9600000,
                'stock_quantity' => 3,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Premium black stone top',
                    'Solid wood legs with natural finish',
                    'Resistant to heat and scratches',
                    'Seats up to 6 comfortably',
                    'Timeless design with modern twist',
                ],
                'specifications' => [
                    'Material' => 'Stone, Wood',
                    'Top Finish' => 'Matte Black Stone',
                    'Legs' => 'Solid Oak Wood',
                    'Dimensions' => 'W2000 x D950 x H750 mm',
                    'Assembly' => 'Assembly required',
                    'Warranty' => '3-year limited warranty',
                ],
                'rating' => 4.8,
                'review_count' => 14,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Steel Top Dining Table',
                'description' => "Industrial meets modern in the Steel Top Dining Table. Crafted for durability, this table features a brushed steel surface and solid base construction, perfect for both home and commercial use.",
                'category_id' => $categories->where('name', 'Table')->first()->id,
                'price' => 4800000,
                'stock_quantity' => 7,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Brushed stainless steel surface',
                    'Sturdy industrial design',
                    'Scratch and stain resistant',
                    'Easy to clean and maintain',
                    'Ideal for modern interiors',
                ],
                'specifications' => [
                    'Material' => 'Stainless Steel, Metal Frame',
                    'Top Finish' => 'Brushed Steel',
                    'Base' => 'Powder-coated Metal',
                    'Dimensions' => 'W1800 x D850 x H740 mm',
                    'Assembly' => 'Partial assembly required',
                    'Warranty' => '1-year warranty',
                ],
                'rating' => 4.3,
                'review_count' => 8,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Oval Stone Dining Table',
                'description' => "The Oval Stone Dining Table exudes luxury and softness with its curved edges and smooth stone surface. Designed for contemporary elegance, it’s ideal for intimate or formal gatherings.",
                'category_id' => $categories->where('name', 'Table')->first()->id,
                'price' => 8300000,
                'stock_quantity' => 4,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Elegant oval shape',
                    'Polished stone top for visual impact',
                    'Smooth curved edges for safety and style',
                    'Strong base for support',
                    'Seats 4-6 comfortably',
                ],
                'specifications' => [
                    'Material' => 'Natural Stone, Resin Base',
                    'Top Finish' => 'Polished Stone Surface',
                    'Dimensions' => 'W1600 x D900 x H740 mm',
                    'Assembly' => 'Required',
                    'Warranty' => '2-year warranty',
                ],
                'rating' => 4.6,
                'review_count' => 13,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Billow Sofa',
                'description' => "The Billow Sofa is characterized by its low, expansive silhouette and plush cushions, offering superior lounging comfort. Wrapped in luxurious fabric with subtle quilting, it creates a cozy yet elevated presence in any room.",
                'category_id' => $categories->where('name', 'Sofa')->first()->id,
                'price' => 8450000,
                'stock_quantity' => 4,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Soft, low-profile structure for lounging',
                    'Subtle quilted fabric texture',
                    'Removable cushions for easy cleaning',
                    'Contemporary, relaxed style',
                    'Durable frame for long-lasting use',
                ],
                'specifications' => [
                    'Material' => 'Fabric, High-density Foam, Wood Frame',
                    'Color Options' => 'Cream, Charcoal, Mocha',
                    'Dimensions' => 'W2300 x D1000 x H750 mm',
                    'Assembly' => 'No assembly required',
                    'Warranty' => '3-year structural warranty',
                ],
                'rating' => 4.6,
                'review_count' => 10,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Square Modular Sofa 3P + Ottoman',
                'description' => "This 3-seater modular sofa with ottoman is ideal for flexible modern living. Clean lines and plush cushions make it suitable for lounging or entertaining, while its modular nature allows for easy rearrangement.",
                'category_id' => $categories->where('name', 'Sofa')->first()->id,
                'price' => 9900000,
                'stock_quantity' => 3,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Modular design with movable ottoman',
                    'Comfortable, deep seating',
                    'Neutral tones for easy styling',
                    'High-resilience foam cushions',
                    'Easy to reconfigure for different layouts',
                ],
                'specifications' => [
                    'Material' => 'Fabric, Foam, Wooden Base',
                    'Finish' => 'Soft-touch neutral upholstery',
                    'Dimensions' => 'W2600 x D900 x H720 mm (without ottoman)',
                    'Assembly' => 'Minimal setup required',
                    'Warranty' => '2-year warranty',
                ],
                'rating' => 4.8,
                'review_count' => 13,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Nubi Sofa',
                'description' => "The Nubi Sofa combines classic tufting with modern minimalism. Its sleek shape and quilted cushioning deliver a soft, tailored look that complements both contemporary and traditional interiors.",
                'category_id' => $categories->where('name', 'Sofa')->first()->id,
                'price' => 7150000,
                'stock_quantity' => 5,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Elegant quilting on seat and backrest',
                    'Supportive yet plush seating',
                    'Streamlined arms and compact footprint',
                    'Soft neutral fabric options',
                    'Solid wood frame construction',
                ],
                'specifications' => [
                    'Material' => 'Fabric, Foam, Hardwood Frame',
                    'Colors' => 'Beige, Gray, Olive',
                    'Dimensions' => 'W2000 x D900 x H780 mm',
                    'Assembly' => 'No assembly needed',
                    'Warranty' => '2-year fabric & frame warranty',
                ],
                'rating' => 4.4,
                'review_count' => 7,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Square Modular Sofa 3P',
                'description' => "A versatile 3-seater modular sofa built for both form and function. Its deep cushions and modular blocks allow customization and comfort, perfect for modern urban homes.",
                'category_id' => $categories->where('name', 'Sofa')->first()->id,
                'price' => 8800000,
                'stock_quantity' => 6,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Fully modular design',
                    'Deep, plush cushions',
                    'Stain-resistant fabric upholstery',
                    'Minimalist aesthetic',
                    'Great for compact or open-plan spaces',
                ],
                'specifications' => [
                    'Material' => 'Polyester Fabric, Foam, Plywood Frame',
                    'Upholstery' => 'Durable woven fabric',
                    'Dimensions' => 'W2400 x D900 x H750 mm',
                    'Assembly' => 'Basic setup required',
                    'Warranty' => '3 years',
                ],
                'rating' => 4.5,
                'review_count' => 12,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Folding Screen Bed',
                'description' => "The Folding Screen Bed offers a transformative solution for space-saving interiors. Its foldable screen headboard adds an element of privacy and visual texture, ideal for modern compact living.",
                'category_id' => $categories->where('name', 'Bed')->first()->id,
                'price' => 7650000,
                'stock_quantity' => 4,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Unique folding screen-style headboard',
                    'Compact footprint perfect for smaller rooms',
                    'Elegant wood grain finish',
                    'Easy to assemble and reposition',
                    'Ideal for multifunctional spaces',
                ],
                'specifications' => [
                    'Material' => 'Wood, Steel Reinforcement',
                    'Finish' => 'Natural Oak Veneer',
                    'Dimensions' => 'W1200 x D2000 x H800 mm',
                    'Assembly' => 'Assembly required',
                    'Warranty' => '3-year limited warranty',
                ],
                'rating' => 4.5,
                'review_count' => 8,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Desk Bed',
                'description' => "The Desk Bed is a multifunctional piece that combines a sleeping area with an integrated desk, making it perfect for students or professionals living in tight urban spaces.",
                'category_id' => $categories->where('name', 'Bed')->first()->id,
                'price' => 9250000,
                'stock_quantity' => 3,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Built-in desk with storage shelves',
                    'Space-saving vertical design',
                    'Durable wood finish with steel frame',
                    'Modern and minimalist look',
                    'Great for studio apartments',
                ],
                'specifications' => [
                    'Material' => 'Wood, Powder-Coated Steel',
                    'Color Options' => 'Walnut, White Oak',
                    'Dimensions' => 'W1400 x D2050 x H900 mm',
                    'Assembly' => 'Full assembly required',
                    'Warranty' => '2-year structural warranty',
                ],
                'rating' => 4.7,
                'review_count' => 10,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'Boryo Daybed',
                'description' => "Inspired by traditional Korean floor beds, the Boryo Daybed blends cultural aesthetics with modern comfort. Its minimal profile and wide padded seat make it versatile for sitting or reclining.",
                'category_id' => $categories->where('name', 'Bed')->first()->id,
                'price' => 6750000,
                'stock_quantity' => 5,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Low-profile traditional design',
                    'Removable cushion cover',
                    'Multi-use as a sofa or guest bed',
                    'Wooden frame with soft upholstery',
                    'Cultural and contemporary blend',
                ],
                'specifications' => [
                    'Material' => 'Wood, High-Density Foam, Fabric',
                    'Upholstery' => 'Neutral woven fabric',
                    'Dimensions' => 'W1900 x D850 x H400 mm',
                    'Assembly' => 'Minimal setup required',
                    'Warranty' => '2 years',
                ],
                'rating' => 4.6,
                'review_count' => 7,
                'images' => [
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                    '/placeholder.svg?height=600&width=800',
                ],
            ],
            [
                'name' => 'WA Top Daybed',
                'description' => "The WA Top Daybed merges simplicity and comfort with its minimalist wooden frame and layered cushion design. It's ideal for daytime lounging or as an additional guest bed.",
                'category_id' => $categories->where('name', 'Bed')->first()->id,
                'price' => 8350000,
                'stock_quantity' => 4,
                'image_url' => '/placeholder.svg',
                'features' => [
                    'Thick layered cushions for comfort',
                    'Sturdy wooden frame construction',
                    'Blends traditional and modern elements',
                    'Neutral tones suit any room',
                    'Suitable for lounging or sleeping',
                ],
                'specifications' => [
                    'Material' => 'Wood, Fabric, Foam',
                    'Finish' => 'Natural finish frame with soft cushion',
                    'Dimensions' => 'W2000 x D900 x H500 mm',
                    'Assembly' => 'No assembly required',
                    'Warranty' => '3-year warranty',
                ],
                'rating' => 4.8,
                'review_count' => 11,
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
