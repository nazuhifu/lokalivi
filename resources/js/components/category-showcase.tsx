import { Link } from "@inertiajs/react"

const categories = [
  {
    name: "Living Room",
    image: "/placeholder.svg?height=400&width=600",
    count: 24,
  },
  {
    name: "Dining",
    image: "/placeholder.svg?height=400&width=600",
    count: 18,
  },
  {
    name: "Bedroom",
    image: "/placeholder.svg?height=400&width=600",
    count: 16,
  },
  {
    name: "Office",
    image: "/placeholder.svg?height=400&width=600",
    count: 12,
  },
]

export function CategoryShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/categories/${category.name.toLowerCase().replace(" ", "-")}`}
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
            <p className="text-sm">{category.count} Products</p>
          </div>
        </Link>
      ))}
    </div>
  )
}