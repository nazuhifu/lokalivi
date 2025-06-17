'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';

export function ProductFilters() {
    const [priceRange, setPriceRange] = useState([0, 5000]);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="mb-4 text-lg font-medium">Filters</h3>
                <Button variant="outline" className="w-full justify-between">
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
                        {['Living Room', 'Dining', 'Bedroom', 'Office', 'Outdoor'].map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                                <Checkbox id={`category-${category}`} />
                                <label
                                    htmlFor={`category-${category}`}
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {category}
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
                        <Slider defaultValue={[0, 5000]} max={5000} step={100} onValueChange={(value) => setPriceRange(value as [number, number])} />
                        <div className="flex items-center justify-between">
                            <span className="text-sm">${priceRange[0]}</span>
                            <span className="text-sm">${priceRange[1]}</span>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>

            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                    <span>Materials</span>
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                    <div className="space-y-2">
                        {['Wood', 'Fabric', 'Leather', 'Metal', 'Glass', 'Rattan'].map((material) => (
                            <div key={material} className="flex items-center space-x-2">
                                <Checkbox id={`material-${material}`} />
                                <label
                                    htmlFor={`material-${material}`}
                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {material}
                                </label>
                            </div>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
