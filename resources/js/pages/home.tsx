import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { CategoryShowcase } from '@/components/category-showcase';
import { FeaturedProducts } from '@/components/featured-products';
import { TestimonialSection } from '@/components/testimonial-section';
import { Button } from '@/components/ui/button';

import { Products } from '@/types/product';

type Category = {
    id: number;
    name: string;
    products_count: number;
    image: string;
};

export default function Home({ featuredProducts, categories }: { featuredProducts: Products[], categories: Category[] }) {
    return (
        <AppLayout>
            <Head title="Home" />
            <div className="flex min-h-screen flex-col">
                <section className="relative h-[90vh] w-full overflow-hidden">
                    {/* Background Image */}
                    <div
                        className="animate-fade-in absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
                        style={{ backgroundImage: 'url(/hero-img.jpg)', animationFillMode: 'forwards', animationDuration: '1.5s' }}
                    ></div>
                    <style>{`
                    @keyframes fade-in {
                        to {
                            opacity: 1;
                        }
                    }
                    .animate-fade-in {
                        animation-name: fade-in;
                    }
                `}</style>
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50" />

                    {/* Content */}
                    <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 py-16 md:px-6 lg:flex-row lg:items-center">
                        <div className="flex flex-col items-center space-y-8 text-center text-white lg:max-w-[60%]">
                            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                Timeless Furniture for Modern Living
                            </h1>
                            <p className="max-w-[600px] text-center leading-relaxed text-white/90 md:text-xl">
                                Discover handcrafted furniture that blends traditional craftsmanship with contemporary design at LokaLivi. Each piece
                                tells a story of quality and elegance.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href="/products">
                                    <Button size="lg" className="border-0 bg-[#8B5A2B] px-8 py-4 text-lg text-white hover:bg-[#6d472a]">
                                        Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/about">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white bg-white px-8 py-4 text-lg text-black hover:border-black hover:bg-black hover:text-white"
                                    >
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4 md:px-6 lg:px-20">
                        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
                            <div className="text-center md:text-left">
                                <h2 className="text-4xl font-bold tracking-tight">Featured Collection</h2>
                                <p className="mt-2 text-lg text-muted-foreground">Discover our most popular handcrafted pieces</p>
                            </div>
                            <Link href="/products">
                                <Button variant="ghost" className="gap-2 text-lg">
                                    View All <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <FeaturedProducts products={featuredProducts} />
                    </div>
                </section>

                {/* Category Showcase */}
                <section className="bg-[#f8f5f0] py-20">
                    <div className="container mx-auto px-4 md:px-6 lg:px-20">
                        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">Shop by Category</h2>
                        <CategoryShowcase categories={categories} />
                    </div>
                </section>

                {/* Testimonials */}
                <section className="bg-white py-20">
                    <div className="container mx-auto px-4 md:px-6 lg:px-20">
                        <h2 className="mb-12 text-center text-4xl font-bold tracking-tight">What Our Customers Say</h2>
                        <TestimonialSection />
                    </div>
                </section>

                {/* About Section */}
                <section className="bg-[#f8f5f0] py-20">
                    <div className="container mx-auto px-4 md:px-6 lg:px-20">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            <div className="flex flex-col justify-center space-y-6">
                                <h2 className="text-4xl font-bold tracking-tight">Our Craftsmanship</h2>
                                <p className="text-lg leading-relaxed text-muted-foreground">
                                    At LokaLivi, we believe in the perfect blend of traditional craftsmanship and modern design. Each piece is
                                    carefully handcrafted by our skilled artisans using sustainable materials and time-honored techniques.
                                </p>
                                <p className="text-lg leading-relaxed text-muted-foreground">
                                    Our furniture is not just functional; it tells a story, brings warmth to your home, and is built to last for
                                    generations.
                                </p>
                                <Link href="/about">
                                    <Button className="w-fit bg-[#8B5A2B] px-8 py-4 text-lg hover:bg-[#6d472a]">Learn More About Us</Button>
                                </Link>
                            </div>
                            <div className="relative h-[500px] overflow-hidden rounded-lg shadow-2xl">
                                <div className="absolute inset-0 bg-[url('/images/home/1.jpg?height=500&width=600')] bg-cover bg-center"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
