'use client';

import { Link } from '@inertiajs/react';
import { Heart, ShoppingCart, Trash } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { toast } from 'sonner';

type WishlistItem = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    inStock: boolean;
};

export default function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
        {
            id: 1,
            name: 'Oakwood Dining Table',
            category: 'Dining',
            price: 1299,
            image: '/placeholder.svg?height=300&width=400',
            inStock: true,
        },
        {
            id: 3,
            name: 'Walnut Bedframe',
            category: 'Bedroom',
            price: 1499,
            image: '/placeholder.svg?height=300&width=400',
            inStock: true,
        },
        {
            id: 7,
            name: 'Velvet Armchair',
            category: 'Living Room',
            price: 799,
            image: '/placeholder.svg?height=300&width=400',
            inStock: false,
        },
        {
            id: 9,
            name: 'Leather Office Chair',
            category: 'Office',
            price: 899,
            image: '/placeholder.svg?height=300&width=400',
            inStock: true,
        },
    ]);

    const removeFromWishlist = (itemId: number) => {
        setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
        toast.message('Removed from wishlist', {
            description: `The item has been removed from your wishlist.`,
        });
    };

    const addToCart = (item: WishlistItem) => {
        toast.message('Added to cart', {
            description: `${item.name} has been added to your cart.`,
        });
    };

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">My Wishlist</h1>
                    <p className="text-muted-foreground">Items you've saved for later</p>
                </div>

                {wishlistItems.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {wishlistItems.map((item) => (
                            <Card key={item.id} className="pt-0 overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                                <div className="relative">
                                    <div className="absolute top-2 right-2 z-10">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full bg-white"
                                            onClick={() => removeFromWishlist(item.id)}
                                        >
                                            <Trash className="h-4 w-4 text-gray-500" />
                                            <span className="sr-only">Remove from wishlist</span>
                                        </Button>
                                    </div>
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={item.image || '/placeholder.svg'}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="text-sm text-muted-foreground">{item.category}</div>
                                    <Link href={`/products/${item.id}`} className="mt-1 block text-lg font-medium hover:underline">
                                        {item.name}
                                    </Link>
                                    <div className="mt-2 font-semibold">${item.price.toLocaleString()}</div>
                                    <div className={`mt-1 text-sm ${item.inStock ? 'text-green-600' : 'text-red-500'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button
                                        className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]"
                                        onClick={() => addToCart(item)}
                                        disabled={!item.inStock}
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle className="flex justify-center">
                                <Heart className="h-12 w-12 text-muted-foreground" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Browse our collection and add items you love to your wishlist.</p>
                        </CardContent>
                        <CardFooter className="flex justify-center pb-6">
                            <Button className="bg-[#8B5A2B] hover:bg-[#6d472a]" asChild>
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                )}

                {wishlistItems.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Button className="bg-[#8B5A2B] hover:bg-[#6d472a]" asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
