import { Link } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';

import { Head } from '@inertiajs/react';

const categories = [
    {
        name: 'Living Room',
        slug: 'living-room',
        description: 'Sofas, coffee tables, accent chairs, and more for your living space.',
        image: '/placeholder.svg?height=400&width=600',
        count: 24,
    },
    {
        name: 'Dining',
        slug: 'dining',
        description: 'Dining tables, chairs, sideboards, and everything for elegant dining.',
        image: '/placeholder.svg?height=400&width=600',
        count: 18,
    },
    {
        name: 'Bedroom',
        slug: 'bedroom',
        description: 'Beds, nightstands, dressers, and more for peaceful rest.',
        image: '/placeholder.svg?height=400&width=600',
        count: 16,
    },
    {
        name: 'Office',
        slug: 'office',
        description: 'Desks, office chairs, bookshelves, and more for productive work.',
        image: '/placeholder.svg?height=400&width=600',
        count: 12,
    },
    {
        name: 'Outdoor',
        slug: 'outdoor',
        description: 'Patio furniture, outdoor dining sets, and more for your outdoor space.',
        image: '/placeholder.svg?height=400&width=600',
        count: 10,
    },
    {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Lighting, rugs, decor, and finishing touches for your home.',
        image: '/placeholder.svg?height=400&width=600',
        count: 30,
    },
];

export default function CategoriesPage() {
    return (
        <AppLayout>
            <Head title="Categories" />
            <div className="container mx-auto px-4 py-16 md:px-6 lg:px-20">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop by Category</h1>
                    <p className="mt-4 text-muted-foreground">
                        Browse our furniture collections by category to find exactly what you're looking for.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/categories/${category.slug}`}
                            className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:scale-105 hover:shadow-md"
                        >
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                <img
                                    src={category.image || '/placeholder.svg'}
                                    alt={category.name}
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-semibold">{category.name}</h2>
                                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm font-medium">{category.count} Products</span>
                                    <span className="text-sm font-medium text-[#8B5A2B] group-hover:underline">Shop Now</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
