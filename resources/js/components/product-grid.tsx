'use client';

import { router, Link } from '@inertiajs/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

import { Products } from '@/types/product';

export function ProductGrid({ products }: { products: Products[]; categories: { id: number; name: string }[] }) {
    const [categoryFilter] = useState<string | null>(null);

    const filteredProducts = useMemo(() => {
        if (!categoryFilter) return products;
        return products.filter((product) => product.category === categoryFilter);
    }, [products, categoryFilter]);

    const addToCart = (product: Products) => {
        router.post(
            '/cart',
            {
                product_id: product.id,
                quantity: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Added to cart', {
                        description: `${product.name} has been added to your cart.`,
                    });
                },
                onError: () => {
                    toast.error('Failed to add to cart', {
                        description: 'Something went wrong. Please try again.',
                    });
                },
            }
        );
    };

    const addToWishlist = (product: Products) => {
        router.post(
            '/wishlist',
            {
                product_id: product.id,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.message('Added to wishlist', {
                        description: `${product.name} has been added to your wishlist.`,
                    });
                },
                onError: () => {
                    toast.error('Failed to add to wishlist', {
                        description: 'Something went wrong. Please try again.',
                    });
                },
            }
        );
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
                <Card
                    key={product.id}
                    className="overflow-hidden border border-gray-200 pt-0 transition-all hover:shadow-md"
                >
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={product.image_url || '/placeholder.svg'}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                        />
                    </div>
                    <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                        <Link
                            href={`/products/${product.id}`}
                            className="mt-1 block text-lg font-medium hover:underline"
                        >
                            {product.name}
                        </Link>
                        <div className="mt-2 font-semibold text-[#8B5A2B]">
                            Rp{product.price.toLocaleString('id-ID')}
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 p-4 pt-0">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => addToWishlist(product)}
                        >
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                        <Button
                            className="flex-1 bg-[#8B5A2B] hover:bg-[#6d472a]"
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
