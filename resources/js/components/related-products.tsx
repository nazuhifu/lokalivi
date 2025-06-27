import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

interface RelatedProductsProps {
    products: Array<{
        id: number;
        name: string;
        price: number;
        image_url: string;
        rating: number;
        main_image?: string;
    }>;
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    if (products.length === 0) {
        return (
            <div className="py-8 text-center">
                <p className="text-muted-foreground">No related products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
                <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group block overflow-hidden rounded-lg border transition-colors hover:border-primary"
                >
                    <div className="aspect-square overflow-hidden">
                        <img
                            src={product.main_image || product.image_url || '/placeholder.svg'}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="line-clamp-2 text-sm font-medium group-hover:text-primary">{product.name}</h3>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold">{formatPrice(product.price)}</span>
                            <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-xs text-muted-foreground">{product.rating}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
