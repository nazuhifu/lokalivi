import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Heart, Minus, Plus, Share, ShoppingCart, Star, Truck } from 'lucide-react';
import { useState } from 'react';

import { ProductReviews } from '@/components/product-reviews';
import { RelatedProducts } from '@/components/related-products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AppLayout from '@/layouts/app-layout';

interface ProductDetailProps {
    product: {
        id: number;
        name: string;
        category: string;
        price: number;
        description: string;
        stock_quantity: number;
        image_url: string;
        images: string[];
        features: string[];
        specifications: Record<string, string>;
        rating: number;
        review_count: number;
        reviews: Array<{
            id: number;
            rating: number;
            comment: string;
            user_name: string;
            created_at: string;
        }>;
    };
    relatedProducts: Array<{
        id: number;
        name: string;
        price: number;
        image_url: string;
        rating: number;
    }>;
}

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    const handleAddToCart = () => {
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
        });
    };

    const handleAddToWishlist = () => {
        router.post('/wishlist', {
            product_id: product.id,
        });
    };

    const handleQuantityChange = (type: 'increase' | 'decrease') => {
        if (type === 'increase' && quantity < product.stock_quantity) {
            setQuantity(quantity + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <AppLayout>
            <Head title={product.name} />
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6">
                    <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-lg border">
                            <img
                                src={product.images[selectedImage] || product.image_url || '/placeholder.svg'}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer overflow-hidden rounded-md border ${
                                        selectedImage === index ? 'ring-2 ring-primary' : ''
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={image || '/placeholder.svg'}
                                        alt={`${product.name} - View ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <div className="mt-2 flex items-center gap-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {product.rating} ({product.review_count} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="text-2xl font-bold">${product.price.toLocaleString()}</div>

                        <p className="text-muted-foreground">{product.description}</p>

                        {product.features && product.features.length > 0 && (
                            <div className="space-y-2">
                                <div className="font-medium">Features:</div>
                                <ul className="ml-6 list-disc text-sm text-muted-foreground">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <div className="font-medium">Quantity:</div>
                            <div className="flex items-center">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-r-none"
                                    onClick={() => handleQuantityChange('decrease')}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-3 w-3" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 rounded-l-none"
                                    onClick={() => handleQuantityChange('increase')}
                                    disabled={quantity >= product.stock_quantity}
                                >
                                    <Plus className="h-3 w-3" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">{product.stock_quantity} available</div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                className="flex-1 bg-[#8B5A2B] hover:bg-[#6d472a]"
                                onClick={handleAddToCart}
                                disabled={product.stock_quantity === 0}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                            <Button variant="outline" className="flex-1" onClick={handleAddToWishlist}>
                                <Heart className="mr-2 h-4 w-4" /> Add to Wishlist
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Truck className="h-4 w-4" />
                            <span>Free shipping on orders over $100</span>
                        </div>

                        <Separator />

                        <Tabs defaultValue="specifications">
                            <TabsList className="w-full">
                                <TabsTrigger value="specifications" className="flex-1">
                                    Specifications
                                </TabsTrigger>
                                <TabsTrigger value="shipping" className="flex-1">
                                    Shipping & Returns
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="specifications" className="pt-4">
                                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                                    <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex justify-between py-1">
                                                <dt className="font-medium">{key}:</dt>
                                                <dd className="text-muted-foreground">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                ) : (
                                    <p className="text-muted-foreground">No specifications available.</p>
                                )}
                            </TabsContent>
                            <TabsContent value="shipping" className="pt-4">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium">Shipping</h4>
                                        <p className="text-sm text-muted-foreground">
                                            We offer free shipping on all orders over $100. Standard delivery takes 5-7 business days. Expedited
                                            shipping options are available at checkout.
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Returns & Exchanges</h4>
                                        <p className="text-sm text-muted-foreground">
                                            If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund
                                            or exchange. Please note that custom orders cannot be returned unless damaged.
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <Share className="h-4 w-4" />
                                <span className="sr-only">Share</span>
                            </Button>
                            <span className="text-sm text-muted-foreground">Share this product</span>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
                    <ProductReviews productId={product.id} reviews={product.reviews} />
                </div>

                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
                    <RelatedProducts products={relatedProducts} />
                </div>
            </div>
        </AppLayout>
    );
}
