'use client';

import { ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';

export function ProductFilters({
    categories,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
}: {
    categories: { id: number; name: string }[];
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    priceRange: [number, number];
    setPriceRange: Dispatch<SetStateAction<[number, number]>>;
    minPrice: number;
    maxPrice: number;
}) {
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
    };
    const handleClear = () => {
        setSelectedCategories([]);
        setPriceRange([minPrice, maxPrice]);
    };
    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-medium">Filters</h3>
                <Button variant="outline" className="w-full justify-between" onClick={handleClear}>
                    Clear All
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.name} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${category.name}`}
                                    checked={selectedCategories.includes(category.name)}
                                    onCheckedChange={() => handleCategoryChange(category.name)}
                                />
                                <label
                                    htmlFor={`category-${category.name}`}
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                    <span>Price Range</span>
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                    <div className="space-y-4">
                        <Slider
                            value={priceRange}
                            min={minPrice}
                            max={maxPrice}
                            step={100}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Rp{priceRange[0].toLocaleString('id-ID')}</span>
                            <span className="text-sm">Rp{priceRange[1].toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
