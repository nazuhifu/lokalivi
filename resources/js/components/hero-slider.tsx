import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const heroImages = [
    '/images/hero/hero-1.jpg',
    '/images/hero/hero-2.jpg',
    '/images/hero/hero-3.jpg',
    '/images/hero/hero-4.jpg',
    '/images/hero/hero-5.jpg',
];

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    return (
        <section className="relative h-[90vh] w-full overflow-hidden">
            {/* Background Images */}
            {heroImages.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Content */}
            <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4 py-16 md:px-6 lg:flex-row lg:items-center">
                <div className="flex flex-col items-center space-y-8 text-center text-white lg:max-w-[60%]">
                    <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        Timeless Furniture for Modern Living
                    </h1>
                    <p className="max-w-[600px] text-center leading-relaxed text-white/90 md:text-xl">
                        Discover handcrafted furniture that blends traditional craftsmanship with contemporary design at LokaLivi. Each piece tells a
                        story of quality and elegance.
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

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'scale-125 bg-white' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Slide Counter */}
            <div className="absolute right-8 bottom-8 z-20 text-sm font-medium text-white/80">
                {currentSlide + 1} / {heroImages.length}
            </div>
        </section>
    );
}
