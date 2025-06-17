'use client';

import { Link, usePage } from '@inertiajs/react';

import { Heart, LogOut, Menu, Package2, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

type User = {
    id: number;
    name: string;
    email: string;
};

export function SiteHeader() {
    const { auth, cart } = usePage().props as {
        auth?: { user?: User };
        cart?: { count: number };
    };

    const user = auth?.user;
    const isLoggedIn = !!user;
    const cartCount = cart?.count ?? 0;
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-20">
                <div className="flex h-16 items-center justify-between">
                    {/* Left side - Mobile menu + Logo */}
                    <div className="flex items-center gap-4">
                        {/* Mobile menu button */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    onClick={() => console.log('Clicked')}
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 p-0 lg:hidden"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 p-0">
                                <div className="flex h-full flex-col">
                                    {/* Mobile menu header */}
                                    <div className="flex items-center border-b p-6">
                                        <Link href="/" className="flex items-center gap-2">
                                            <Package2 className="h-6 w-6 text-[#8B5A2B]" />
                                            <span className="text-xl font-bold text-gray-900">LokaLivi</span>
                                        </Link>
                                    </div>

                                    {/* Mobile search */}
                                    <div className="border-b p-6">
                                        <div className="relative">
                                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                            <Input placeholder="Search products..." className="h-10 pl-10 text-sm" />
                                        </div>
                                    </div>

                                    {/* Mobile menu navigation */}
                                    <nav className="flex flex-1 flex-col space-y-1 p-6">
                                        <SheetClose asChild>
                                            <Link
                                                href="/"
                                                className="-mx-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-[#8B5A2B]"
                                            >
                                                Home
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                href="/products"
                                                className="-mx-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-[#8B5A2B]"
                                            >
                                                Shop
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                href="/categories"
                                                className="-mx-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-[#8B5A2B]"
                                            >
                                                Categories
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                href="/about"
                                                className="-mx-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-[#8B5A2B]"
                                            >
                                                About
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link
                                                href="/contact"
                                                className="-mx-3 rounded-md px-3 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-[#8B5A2B]"
                                            >
                                                Contact
                                            </Link>
                                        </SheetClose>
                                    </nav>

                                    {/* Mobile menu footer */}
                                    <div className="border-t bg-gray-50 p-6">
                                        <div className="space-y-1">
                                            {isLoggedIn ? (
                                                <>
                                                    <div className="px-3 py-2 text-sm font-medium text-gray-900">Hi, {user?.name}</div>
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={'/user/dashboard'}
                                                            className="-mx-3 flex items-center gap-3 rounded-md px-3 py-3 text-gray-900 transition-colors hover:bg-white hover:text-[#8B5A2B]"
                                                        >
                                                            <User className="h-5 w-5" />
                                                            <span className="font-medium">Dashboard</span>
                                                        </Link>
                                                    </SheetClose>
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={route('logout')}
                                                            method="post"
                                                            as="button"
                                                            // Toast should be triggered after logout confirmation, not here
                                                            onClick={() => toast('You have been successfully logged out.')}
                                                        >
                                                            <LogOut className="h-5 w-5" />
                                                            <span className="font-medium">Logout</span>
                                                        </Link>
                                                    </SheetClose>
                                                </>
                                            ) : (
                                                <SheetClose asChild>
                                                    <Link
                                                        href="/login"
                                                        className="-mx-3 flex items-center gap-3 rounded-md px-3 py-3 text-gray-900 transition-colors hover:bg-white hover:text-[#8B5A2B]"
                                                    >
                                                        <User className="h-5 w-5" />
                                                        <span className="font-medium">Sign In</span>
                                                    </Link>
                                                </SheetClose>
                                            )}
                                            <SheetClose asChild>
                                                <Link
                                                    href="/wishlist"
                                                    className="-mx-3 flex items-center gap-3 rounded-md px-3 py-3 text-gray-900 transition-colors hover:bg-white hover:text-[#8B5A2B]"
                                                >
                                                    <Heart className="h-5 w-5" />
                                                    <span className="font-medium">Wishlist</span>
                                                </Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link
                                                    href="/cart"
                                                    className="-mx-3 flex items-center gap-3 rounded-md px-3 py-3 text-gray-900 transition-colors hover:bg-white hover:text-[#8B5A2B]"
                                                >
                                                    <div className="relative">
                                                        <ShoppingCart className="h-5 w-5" />
                                                        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B5A2B] text-[10px] font-medium text-white">
                                                            {cartCount}
                                                        </span>
                                                    </div>
                                                    <span className="font-medium">Cart</span>
                                                </Link>
                                            </SheetClose>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Logo */}
                        <Link href="/" className="flex flex-shrink-0 items-center gap-2">
                            <Package2 className="h-6 w-6 text-[#8B5A2B]" />
                            <span className="hidden text-xl font-bold text-gray-900 sm:block">LokaLivi</span>
                            <span className="text-lg font-bold text-gray-900 sm:hidden">LokaLivi</span>
                        </Link>
                    </div>

                    {/* Center - Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 lg:flex">
                        <Link href="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#8B5A2B]">
                            Home
                        </Link>
                        <Link href="/products" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#8B5A2B]">
                            Shop
                        </Link>
                        <Link href="/categories" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#8B5A2B]">
                            Categories
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#8B5A2B]">
                            About
                        </Link>
                        <Link href="/contact" className="text-sm font-medium text-gray-700 transition-colors hover:text-[#8B5A2B]">
                            Contact
                        </Link>
                    </nav>

                    {/* Right side - Search + Actions */}
                    <div className="flex flex-shrink-0 items-center gap-2">
                        {/* Search */}
                        {isSearchOpen ? (
                            <div className="hidden items-center gap-2 md:flex">
                                <Input placeholder="Search products..." className="h-9 w-64 text-sm" autoFocus />
                                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="h-9 w-9 flex-shrink-0">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                                className="hidden h-9 w-9 md:flex"
                                aria-label="Search"
                            >
                                <Search className="h-4 w-4" />
                            </Button>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                            {/* Wishlist - Hidden on mobile */}
                            {isLoggedIn && (
                                <>
                                    <Button variant="ghost" size="icon" asChild className="hidden h-9 w-9 sm:flex" aria-label="Wishlist">
                                        <Link href="/wishlist">
                                            <Heart className="h-4 w-4" />
                                        </Link>
                                    </Button>

                                    {/* Cart */}
                                    <Button variant="ghost" size="icon" asChild className="relative h-9 w-9" aria-label="Shopping cart">
                                        <Link href="/cart">
                                            <ShoppingCart className="h-4 w-4" />
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#8B5A2B] text-[10px] font-medium text-white">
                                                {cartCount}
                                            </span>
                                        </Link>
                                    </Button>
                                </>
                            )}

                            {/* User account - Hidden on mobile */}
                            {isLoggedIn ? (
                                <div className="hidden items-center gap-2 sm:flex">
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9" aria-label="Dashboard">
                                        <Link href={user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
                                            <User className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <span className="hidden text-sm font-medium md:block">
                                        Hi, {typeof user?.name === 'string' && user.name ? user.name.split(' ')[0] : 'User'}
                                    </span>
                                </div>
                            ) : (
                                <Button variant="ghost" size="icon" asChild className="hidden h-9 w-9 sm:flex" aria-label="Login">
                                    <Link href="/login">
                                        <User className="h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
