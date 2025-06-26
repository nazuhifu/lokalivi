'use client';

import { Products } from '@/types/product';
import { Link, router } from '@inertiajs/react';
import { Eye, Heart, ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

export function FeaturedProducts({ products }: { products: Products[] }) {
    const isLoggedIn = true; // Ganti dengan auth dari usePage().props jika sudah tersedia

    const addToWishlist = (product: Products) => {
        if (!isLoggedIn) {
            toast.warning('Please login', {
                description: 'You need to login to add items to wishlist.',
            });
            return;
        }

        router.post(
            '/wishlist',
            { product_id: product.id },
            {
                onSuccess: () => {
                    toast.success('Added to wishlist', {
                        description: `${product.name} has been added to your wishlist.`,
                    });
                },
                onError: () => {
                    toast.error('Failed to add to wishlist', {
                        description: 'Something went wrong. Please try again.',
                    });
                },
                preserveScroll: true,
            }
        );
    };

    const addToCart = (product: Products) => {
        router.post(
            '/cart',
            {
                product_id: product.id,
                quantity: 1,
            },
            {
                onSuccess: () => {
                    toast.success('Added to cart', {
                        description: `${product.name} has been added to your cart.`,
                    });
                },
                onError: () => {
                    toast.error('Error adding to cart', {
                        description: 'Something went wrong. Please try again.',
                    });
                },
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <Card
                    key={product.id}
                    className="group overflow-hidden border border-gray-200 pt-0 transition-all hover:scale-105 hover:shadow-lg"
                >
                    <div className="relative aspect-square overflow-hidden">
                        <img
                            src={product.image_url || '/placeholder.svg'}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                        <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" asChild>
                                <Link href={`/products/${product.id}`}>
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <CardContent className="p-4">
                        <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
                        <Link
                            href={`/products/${product.id}`}
                            className="mb-2 block text-lg font-semibold transition-colors hover:text-[#8B5A2B]"
                        >
                            {product.name}
                        </Link>
                        <div className="text-2xl font-bold text-[#8B5A2B]">
                            Rp{product.price.toLocaleString('id-ID')}
                        </div>
                    </CardContent>
                    {isLoggedIn ? (
                        <CardFooter className="flex gap-2 p-6 pt-0">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full hover:border-red-200 hover:bg-red-50"
                                onClick={() => addToWishlist(product)}
                            >
                                <Heart className="h-4 w-4" />
                                <span className="sr-only">Add to wishlist</span>
                            </Button>
                            <Button
                                className="flex-1 bg-[#8B5A2B] shadow-md hover:bg-[#6d472a]"
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                        </CardFooter>
                    ) : (
                        <CardFooter className="p-6 pt-0">
                            <Button className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200" asChild>
                                <Link href="/auth/login">Login to Purchase</Link>
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            ))}
        </div>
    );
}
