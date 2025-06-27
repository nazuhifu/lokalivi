import { ProductFilters } from '@/components/product-filters';
import { ProductGrid } from '@/components/product-grid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import { Products } from '@/types/product';
import { Filter, Grid, List } from 'lucide-react';
import { useMemo, useState } from 'react';

type CategoryPageProps = PageProps<{
    category: {
        name: string;
        slug: string;
    };
    products: Array<{
        id: number;
        name: string;
        price: number;
        image_url: string;
        category?: string;
        stock_quantity?: number;
    }>;
}>;

export default function CategoryPage({ category, products }: CategoryPageProps) {
    // Derive categories from products (for demo, just use the current category)
    const categories = useMemo(() => [{ id: 1, name: category.name }], [category.name]);

    // Derive min/max price from products
    const prices = products.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Filter state
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const inCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category || category.name);
            const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            return inCategory && inPrice;
        });
    }, [products, selectedCategories, priceRange, category.name]);

    // Map to Products type for ProductGrid
    const mappedProducts: Products[] = filteredProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image_url: p.image_url,
        category: p.category || category.name,
        stock_quantity: p.stock_quantity ?? 10, // default value
    }));

    return (
        <div className="container mx-auto px-4 py-16 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
                    <p className="text-muted-foreground">Browse our collection of {category.name.toLowerCase()} furniture</p>
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
                    <ProductFilters
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onCategoryChange={setSelectedCategories}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
                </div>
                <div>
                    <ProductGrid products={mappedProducts} />
                </div>
            </div>
        </div>
    );
}
