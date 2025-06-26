import { Head, router } from '@inertiajs/react';
import { Filter, Grid, List } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { ProductList } from '@/components/product-list';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import AppLayout from '@/layouts/app-layout';
import { Products } from '@/types/product';

export default function ProductsPage({ 
    products, 
    categories, 
    selectedCategories: initialSelectedCategories 
}: { 
    products: Products[]; 
    categories: { id: number; name: string }[]; 
    selectedCategories?: string[];
}) {
    // Get min/max price from products
    const prices = products.map((p) => Number(p.price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Sync selectedCategories with prop from server
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialSelectedCategories || []);
    useEffect(() => {
        setSelectedCategories(initialSelectedCategories || []);
    }, [initialSelectedCategories]);

    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // When category filter changes, update the URL and reload from server
    const handleCategoryChange = (newCategories: string[]) => {
        setSelectedCategories(newCategories);
        const params: Record<string, string> = {};
        if (newCategories.length > 0) {
            params.categories = newCategories.join(',');
        }
        router.get('/products', params, { preserveState: true });
    };

    // When clearing category filter
    const handleClearCategory = () => {
        setSelectedCategories([]);
        router.get('/products', {}, { preserveState: true });
    };

    // Filter and sort products client-side (except for category, which is now server-side)
    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const inPrice = Number(product.price) >= priceRange[0] && Number(product.price) <= priceRange[1];
            const inSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return inPrice && inSearch;
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
    }, [products, priceRange, searchTerm, sortBy]);

    // For title/description
    const title = selectedCategories && selectedCategories.length === 1
        ? `${selectedCategories[0]} Products`
        : 'All Products';
    const description = selectedCategories && selectedCategories.length === 1
        ? `Browse our collection of ${selectedCategories[0].toLowerCase()} furniture`
        : 'Browse our collection of handcrafted furniture';

    return (
        <AppLayout>
            <Head title={title} />
            <div className="container mx-auto px-4 py-16 md:px-6 lg:px-20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-muted-foreground">
                            {description}
                        </p>
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
                        {selectedCategories && selectedCategories.length > 0 && (
                            <Button 
                                variant="outline" 
                                onClick={handleClearCategory}
                            >
                                Clear Category Filter
                            </Button>
                        )}
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
                            onCategoryChange={handleCategoryChange}
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
