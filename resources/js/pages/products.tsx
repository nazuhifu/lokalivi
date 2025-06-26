import { Head } from '@inertiajs/react';
import { Filter, Grid, List } from 'lucide-react';
import { useMemo, useState } from 'react';

import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ProductList } from '@/components/product-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AppLayout from '@/layouts/app-layout';
import { Products } from '@/types/product';

export default function ProductsPage({ products, categories }: { products: Products[]; categories: { id: number; name: string }[] }) {
    // Get min/max price from products
    const prices = products.map((p) => Number(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Filter and sort products client-side
    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const inPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
            const inSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return inCategory && inPrice && inSearch;
        });
        // Sorting
        switch (sortBy) {
            case 'price-asc':
                result = result.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price-desc':
                result = result.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'name-asc':
                result = result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result = result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'newest':
            default:
                result = result.sort((a, b) => b.id - a.id);
                break;
        }
        return result;
    }, [products, selectedCategories, priceRange, searchTerm, sortBy]);

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
                        <Input
                            placeholder="Search products..."
                            className="w-full md:w-[200px] lg:w-[300px]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <select
                            className="rounded-md border px-2 py-1 text-sm text-gray-700"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                            <option value="name-desc">Name: Z-A</option>
                        </select>
                        <Button variant="outline" size="icon" onClick={() => setShowSidebar((v) => !v)}>
                            <Filter className="h-4 w-4" />
                            <span className="sr-only">Filter</span>
                        </Button>
                        <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
                            <Grid className="h-4 w-4" />
                            <span className="sr-only">Grid view</span>
                        </Button>
                        <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
                            <List className="h-4 w-4" />
                            <span className="sr-only">List view</span>
                        </Button>
                    </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
                    <div className={`${showSidebar ? 'block' : 'hidden'} lg:block`}>
                        <ProductFilters
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    </div>
                    <div>{viewMode === 'grid' ? <ProductGrid products={filteredProducts} /> : <ProductList products={filteredProducts} />}</div>
                </div>
            </div>
        </AppLayout>
    );
}
