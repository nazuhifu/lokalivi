import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import AppLayout from '@/layouts/app-layout';

export default function AboutPage() {
    return (
        <AppLayout>
            <Head title="About" />
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About LokaLivi</h1>
                    <p className="mt-4 text-muted-foreground">
                        Crafting timeless furniture that blends traditional craftsmanship with modern design.
                    </p>
                </div>

                <div className="grid gap-12">
                    {/* Our Story */}
                    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[400px] lg:h-full">
                            <img src="/images/about/about-1.jpg?height=600&width=800" alt="Craftsman working on furniture" className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center space-y-4">
                            <h2 className="text-2xl font-bold">Our Story</h2>
                            <p className="text-muted-foreground">
                                LokaLivi was founded in 2014 by master craftsman Mulyono Sololo with a simple mission: to create beautiful, functional
                                furniture that stands the test of time. What began as a small workshop has grown into a respected brand known for its
                                commitment to quality and sustainable practices.
                            </p>
                            <p className="text-muted-foreground">
                                Our name, LokaLivi, reflects our belief that furniture should bring warmth and comfort to your living spaces, just
                                like the sun brings light and life to our world. We believe that a home filled with thoughtfully crafted pieces
                                creates a sanctuary where life's most precious moments unfold.
                            </p>
                        </div>
                    </section>

                    <Separator />

                    {/* Our Craftsmanship */}
                    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="order-2 flex flex-col justify-center space-y-4 lg:order-1">
                            <h2 className="text-2xl font-bold">Our Craftsmanship</h2>
                            <p className="text-muted-foreground">
                                At LokaLivi, we believe in the perfect blend of traditional craftsmanship and modern design. Each piece is carefully
                                handcrafted by our skilled artisans using sustainable materials and time-honored techniques.
                            </p>
                            <p className="text-muted-foreground">
                                We source the finest hardwoods from responsibly managed forests, and our finishing processes use low-VOC,
                                environmentally friendly materials. Our commitment to quality means that every joint is precision-cut, every surface
                                is meticulously sanded, and every finish is carefully applied by hand.
                            </p>
                            <p className="text-muted-foreground">
                                The result is furniture that not only looks beautiful but is built to last for generations, becoming more beautiful
                                with age and use.
                            </p>
                        </div>
                        <div className="relative order-1 h-[300px] overflow-hidden rounded-lg sm:h-[400px] lg:order-2 lg:h-full">
                            <img
                                src="/images/about/about-2.jpg?height=600&width=800"
                                alt="Furniture craftsmanship details"
                                className="object-cover"
                            />
                        </div>
                    </section>

                    <Separator />

                    {/* Our Values */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Our Values</h2>
                            <p className="mt-4 text-muted-foreground">These core principles guide everything we do at LokaLivi.</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
                                    <p className="text-muted-foreground">
                                        We're committed to responsible sourcing, minimal waste, and environmentally friendly practices throughout our
                                        production process.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Quality</h3>
                                    <p className="text-muted-foreground">
                                        We never compromise on materials or craftsmanship, ensuring that every piece meets our exacting standards.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Timelessness</h3>
                                    <p className="text-muted-foreground">
                                        We design furniture that transcends trends, creating pieces that will be cherished for generations.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Craftsmanship</h3>
                                    <p className="text-muted-foreground">
                                        We honor traditional woodworking techniques while embracing innovation where it enhances quality.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Community</h3>
                                    <p className="text-muted-foreground">
                                        We support local artisans and contribute to our community through education and outreach programs.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <h3 className="mb-2 text-xl font-semibold">Customer Focus</h3>
                                    <p className="text-muted-foreground">
                                        We build lasting relationships with our customers, providing exceptional service before, during, and after
                                        purchase.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <Separator />

                    {/* Our Team */}
                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">Meet Our Team</h2>
                            <p className="mt-4 text-muted-foreground">The talented individuals who bring LokaLivi furniture to life.</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    name: 'Mulyono Sololo',
                                    role: 'Founder & Master Craftsman',
                                    image: '/images/about/about-3.png?height=300&width=300',
                                },
                                {
                                    name: 'Mohammad Nazhiif',
                                    role: 'Lead Designer',
                                    image: '/images/about/about-4.jpg?height=300&width=300',
                                },
                                {
                                    name: 'Lidya Khairunisa',
                                    role: 'Workshop Manager',
                                    image: '/images/about/about-6.jpg?height=300&width=300',
                                },
                                {
                                    name: 'Muhammad Irfan Dhiya',
                                    role: 'Customer Experience Director',
                                    image: '/images/about/about-5.jpeg?height=300&width=300',
                                },
                            ].map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                                        <img src={member.image || '/placeholder.svg'} alt={member.name} className="object-cover" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="rounded-lg bg-[#f8f5f0] p-8 text-center">
                        <h2 className="text-2xl font-bold">Visit Our Showroom</h2>
                        <p className="mt-4 text-muted-foreground">
                            Experience the quality and craftsmanship of LokaLivi furniture in person. Our showroom features our full collection and
                            our team is available to help you find the perfect pieces for your home.
                        </p>
                        <Button className="mt-6 bg-[#8B5A2B] hover:bg-[#6d472a]" asChild>
                            <Link href="/contact">
                                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
