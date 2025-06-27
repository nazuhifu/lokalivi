import { Link } from "@inertiajs/react"

type Category = {
    id: number;
    name: string;
    products_count: number;
    image: string;
};

interface CategoryShowcaseProps {
    categories?: Category[];
}

export function CategoryShowcase({ categories = [] }: CategoryShowcaseProps) {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/products?category=${encodeURIComponent(category.name)}`}
                    className="group relative overflow-hidden rounded-lg transition-all hover:shadow-lg hover:scale-105"
                >
                    <div className="aspect-square w-full overflow-hidden">
                        <img
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4 text-center text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm">{category.products_count} Products</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}