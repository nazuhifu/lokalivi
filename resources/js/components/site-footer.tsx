import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Package2, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SiteFooter() {
    return (
        <footer className="bg-[#2c2418] text-white">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-12">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-4 flex items-center gap-2">
                            <Package2 className="h-6 w-6" />
                            <span className="text-xl font-bold">LokaLivi</span>
                        </Link>
                        <p className="mb-4 text-gray-300">Handcrafted furniture that blends traditional craftsmanship with modern design.</p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-medium">Shop</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/products" className="text-gray-300 hover:text-white">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/living-room" className="text-gray-300 hover:text-white">
                                    Living Room
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/dining" className="text-gray-300 hover:text-white">
                                    Dining
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/bedroom" className="text-gray-300 hover:text-white">
                                    Bedroom
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/office" className="text-gray-300 hover:text-white">
                                    Office
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-medium">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-gray-300 hover:text-white">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-300 hover:text-white">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/showroom" className="text-gray-300 hover:text-white">
                                    Showroom
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-[#5c5142] pt-8 text-sm text-gray-300">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                        <p>&copy; 2025 LokaLivi. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy-policy" className="hover:text-white">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className="hover:text-white">
                                Terms of Service
                            </Link>
                            <Link href="/shipping-policy" className="hover:text-white">
                                Shipping Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
