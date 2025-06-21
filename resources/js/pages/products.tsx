import { Head } from '@inertiajs/react';
import { Filter, Grid, List } from 'lucide-react';

import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AppLayout from '@/layouts/app-layout';
import { Products } from '@/types/product';

export default function ProductsPage({ products, categories }: { products: Products[]; categories: { id: number; name: string }[] }) {
    return (
        <AppLayout>
            <Head title="Products" />
            <div className="container mx-auto px-4 py-16 md:px-6 lg:px-20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
                        <p className="text-muted-foreground">Browse our collection of handcrafted furniture</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search products..." className="w-full md:w-[200px] lg:w-[300px]" />
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                        <Button variant="outline" size="icon">
                            <Grid className="h-4 w-4" />
                            <span className="sr-only">Grid view</span>
                        </Button>
                        <Button variant="outline" size="icon">
                            <List className="h-4 w-4" />
                            <span className="sr-only">List view</span>
                        </Button>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
                    <div className="hidden lg:block">
                        <ProductFilters />
                    </div>
                    <div>
                        <ProductGrid products={products} categories={categories} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
