import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Products } from '@/types/product';
import { Link, router } from '@inertiajs/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

export function ProductList({ products }: { products: Products[] }) {
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
            },
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
            },
        );
    };
    return (
        <div className="space-y-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="animate-fadeIn flex transform items-center gap-4 rounded-lg border bg-white p-4 opacity-0 shadow-sm transition duration-300 ease-in-out hover:scale-[1.01]"
                    style={{ animation: 'fadeIn 0.4s forwards' }}
                >
                    <img src={product.image_url || '/placeholder.svg'} alt={product.name} className="h-24 w-24 flex-shrink-0 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                        <Link href={`/products/${product.id}`} className="block truncate text-lg font-medium hover:underline">
                            {product.name}
                        </Link>
                        <div className="mt-1 font-semibold text-[#8B5A2B]">{formatPrice(product.price)}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => addToWishlist(product)}>
                            <Heart className="h-4 w-4" />
                            <span className="sr-only">Add to wishlist</span>
                        </Button>
                        <Button className="bg-[#8B5A2B] hover:bg-[#6d472a]" onClick={() => addToCart(product)}>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
