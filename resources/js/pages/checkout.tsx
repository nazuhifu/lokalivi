import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-white p-8 shadow-lg">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h2 className="mb-2 text-center text-2xl font-bold">Thank you for your order!</h2>
                <p className="mb-6 text-center text-muted-foreground">
                    Your order has been placed successfully. You can track your order or return to the homepage.
                </p>
                <div className="flex gap-3">
                    <Button asChild className="bg-[#8B5A2B] hover:bg-[#6d472a]">
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard">Go to Dashboard</Link>
                    </Button>
                </div>
                <Button variant="ghost" className="mt-4" onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    );
}

type CheckoutForm = {
    shipping: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    payment: {
        card_number: string;
        expiry_month: string;
        expiry_year: string;
        cvc: string;
    };
    items: { product_id: number; quantity: number }[];
};

export default function CheckoutPage() {
    const props = usePage().props as any;
    const cart = props.cart || [];
    const orderSuccess = props.orderSuccess || false;
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm<CheckoutForm>({
        shipping: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        },
        payment: {
            card_number: '',
            expiry_month: '',
            expiry_year: '',
            cvc: '',
        },
        items: [],
    });

    useEffect(() => {
        setData(
            'items',
            cart.map((item: any) => ({ product_id: item.product_id, quantity: item.quantity })),
        );
    }, [cart, setData]);

    useEffect(() => {
        if (orderSuccess) setShowModal(true);
    }, [orderSuccess]);

    const subtotal = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('shipping', {
            ...data.shipping,
            [e.target.id]: e.target.value,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('payment', {
            ...data.payment,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout', {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Checkout" />
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6">
                    <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Cart
                    </Link>
                </div>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-muted-foreground">Complete your order by providing your shipping and payment details</p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Contact Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        value={data.shipping.first_name}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your first name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        value={data.shipping.last_name}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your last name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.shipping.email}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.shipping.phone}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Shipping Address</h2>
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input
                                        id="address"
                                        value={data.shipping.address}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your street address"
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" value={data.shipping.city} onChange={handleShippingChange} placeholder="Enter your city" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State / Province</Label>
                                        <Input
                                            id="state"
                                            value={data.shipping.state}
                                            onChange={handleShippingChange}
                                            placeholder="Enter your state or province"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                                        <Input id="zip" value={data.shipping.zip} onChange={handleShippingChange} placeholder="Enter your ZIP code" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={data.shipping.country}
                                            onChange={handleShippingChange}
                                            placeholder="Enter your country"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Payment Method</h2>
                            <RadioGroup defaultValue="credit-card">
                                <div className="flex items-center space-x-2 rounded-md border p-4">
                                    <RadioGroupItem value="credit-card" id="credit-card" />
                                    <Label htmlFor="credit-card" className="flex items-center gap-2 font-normal">
                                        <CreditCard className="h-4 w-4" />
                                        Credit / Debit Card
                                    </Label>
                                </div>
                                <div className="grid gap-4 p-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="card_number">Card Number</Label>
                                        <Input
                                            id="card_number"
                                            value={data.payment.card_number}
                                            onChange={handlePaymentChange}
                                            placeholder="0000 0000 0000 0000"
                                        />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry_month">Expiry Month</Label>
                                            <Input
                                                id="expiry_month"
                                                value={data.payment.expiry_month}
                                                onChange={handlePaymentChange}
                                                placeholder="MM"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry_year">Expiry Year</Label>
                                            <Input
                                                id="expiry_year"
                                                value={data.payment.expiry_year}
                                                onChange={handlePaymentChange}
                                                placeholder="YY"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvc">CVC</Label>
                                            <Input id="cvc" value={data.payment.cvc} onChange={handlePaymentChange} placeholder="CVC" />
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {cart.map((item: any) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span>
                                                {item.name}
                                                {item.quantity > 1 ? ` (x${item.quantity})` : ''}
                                            </span>
                                            <span>${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${subtotal.toLocaleString()}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-4">
                                <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]" disabled={processing}>
                                    Place Order
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Secure checkout. Your data is protected.</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
            <SuccessModal open={showModal} onClose={() => setShowModal(false)} />
        </AppLayout>
    );
}
