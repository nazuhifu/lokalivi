import { Link } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

export default function CartPage() {
    //
    const cartItems = [
        {
            id: 1,
            name: 'Oakwood Dining Table',
            price: 1299,
            quantity: 1,
            image: '/placeholder.svg?height=100&width=100',
        },
        {
            id: 7,
            name: 'Velvet Armchair',
            price: 799,
            quantity: 2,
            image: '/placeholder.svg?height=100&width=100',
        },
    ];

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    return (
        <AppLayout>
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground">Review and modify your items before checkout</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {cartItems.length > 0 ? (
                            <div className="overflow-hidden rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Product</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                                                        <img src={item.image || '/placeholder.svg'} alt={item.name} className="object-cover" />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{item.name}</div>
                                                        <div className="text-sm text-muted-foreground">${item.price.toLocaleString()} each</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                                                            <Minus className="h-3 w-3" />
                                                            <span className="sr-only">Decrease</span>
                                                        </Button>
                                                        <div className="flex h-8 w-12 items-center justify-center border-y">{item.quantity}</div>
                                                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                                                            <Plus className="h-3 w-3" />
                                                            <span className="sr-only">Increase</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="font-medium">${(item.price * item.quantity).toLocaleString()}</div>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Trash className="h-4 w-4" />
                                                            <span className="sr-only">Remove</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-10">
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium">Your cart is empty</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                                    </div>
                                    <Button className="mt-6 bg-[#8B5A2B] hover:bg-[#6d472a]" asChild>
                                        <Link href="/products">Start Shopping</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        <div className="mt-6">
                            <Button variant="outline" asChild>
                                <Link href="/products" className="inline-flex items-center">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `$${Number(shipping).toLocaleString()}`}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Discount code" />
                                    <Button variant="outline">Apply</Button>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]" asChild>
                                    <Link href="/checkout">Proceed to Checkout</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
