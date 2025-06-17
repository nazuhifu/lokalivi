import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
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
                                <Button size="lg" className="border-0 bg-[#8B5A2B] px-8 py-4 text-lg text-white hover:bg-[#6d472a]">
                                    Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white bg-white px-8 py-4 text-lg text-black hover:border-black hover:bg-black hover:text-white"
                                >
                                    Our Story
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
