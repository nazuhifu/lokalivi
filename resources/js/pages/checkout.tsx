import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';

function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-white p-8 shadow-lg">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />
                <h2 className="mb-2 text-center text-2xl font-bold">Thank you for your order!</h2>
                <p className="mb-6 text-center text-muted-foreground">
                    Your order was successfully placed. You can track it or return to the homepage.
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

type CartItem = {
    id: number;
    product_id: number;
    name: string;
    quantity: number;
    price: number;
};

type PageProps = {
    cart: CartItem[];
    orderSuccess: boolean;
};

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
        method: string;
        bank_name: string;
        ewallet_type: string;
        ewallet_number: string;
        card_number: string;
        expiry_month: string;
        expiry_year: string;
        cvc: string;
    };
    items: { product_id: number; quantity: number }[];
};

export default function CheckoutPage() {
    const { cart = [], orderSuccess = false } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing } = useForm<CheckoutForm>({
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
            method: 'bank-transfer',
            bank_name: '',
            ewallet_type: '',
            ewallet_number: '',
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
            cart.map((item: CartItem) => ({
                product_id: item.product_id,
                quantity: item.quantity,
            })),
        );
    }, [cart, setData]);

    useEffect(() => {
        if (orderSuccess) setShowModal(true);
    }, [orderSuccess]);

    const subtotal = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData('shipping', {
            ...data.shipping,
            [e.target.id]: e.target.value,
        });
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    <p className="text-muted-foreground">Complete your order by providing your shipping and payment details.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        {/* Contact Info */}
                        <Section title="Contact Information">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InputGroup label="First Name" id="first_name" value={data.shipping.first_name} onChange={handleShippingChange} />
                                <InputGroup label="Last Name" id="last_name" value={data.shipping.last_name} onChange={handleShippingChange} />
                                <InputGroup label="Email" id="email" value={data.shipping.email} onChange={handleShippingChange} type="email" />
                                <InputGroup label="Phone" id="phone" value={data.shipping.phone} onChange={handleShippingChange} type="tel" />
                            </div>
                        </Section>

                        <Separator />

                        {/* Shipping Address */}
                        <Section title="Shipping Address">
                            <InputGroup label="Street Address" id="address" value={data.shipping.address} onChange={handleShippingChange} />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <InputGroup label="City" id="city" value={data.shipping.city} onChange={handleShippingChange} />
                                <InputGroup label="State/Province" id="state" value={data.shipping.state} onChange={handleShippingChange} />
                                <InputGroup label="ZIP Code" id="zip" value={data.shipping.zip} onChange={handleShippingChange} />
                                <InputGroup label="Country" id="country" value={data.shipping.country} onChange={handleShippingChange} />
                            </div>
                        </Section>

                        <Separator />

                        {/* Payment Method */}
                        <Section title="Payment Method">
                            <RadioGroup value={data.payment.method} onValueChange={(value) => setData('payment', { ...data.payment, method: value })}>
                                <RadioOption id="bank-transfer" label="🏦 Bank Transfer (BCA, Mandiri, etc.)" />
                                <RadioOption id="e-wallet" label="📱 E-Wallet (GoPay, OVO, DANA, ShopeePay)" />
                                <RadioOption id="qris" label="🔳 QRIS" />
                                <RadioOption id="virtual-account" label="🧾 Virtual Account" />
                            </RadioGroup>

                            {/* Dynamic Payment Forms */}
                            {data.payment.method === 'bank-transfer' && (
                                <div className="space-y-2">
                                    <Label htmlFor="bank_name">Select Bank</Label>
                                    <select
                                        id="bank_name"
                                        value={data.payment.bank_name}
                                        onChange={handlePaymentChange}
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">-- Select Bank --</option>
                                        <option value="BCA">BCA</option>
                                        <option value="Mandiri">Mandiri</option>
                                        <option value="BNI">BNI</option>
                                        <option value="BRI">BRI</option>
                                    </select>
                                </div>
                            )}

                            {data.payment.method === 'e-wallet' && (
                                <div className="space-y-2">
                                    <Label htmlFor="ewallet_type">Select E-Wallet</Label>
                                    <select
                                        id="ewallet_type"
                                        value={data.payment.ewallet_type}
                                        onChange={handlePaymentChange}
                                        className="w-full rounded-md border px-3 py-2"
                                    >
                                        <option value="">-- Select --</option>
                                        <option value="GoPay">GoPay</option>
                                        <option value="OVO">OVO</option>
                                        <option value="DANA">DANA</option>
                                        <option value="ShopeePay">ShopeePay</option>
                                    </select>
                                    <Input
                                        id="ewallet_number"
                                        value={data.payment.ewallet_number}
                                        onChange={handlePaymentChange}
                                        placeholder="Registered phone number"
                                    />
                                </div>
                            )}

                            {data.payment.method === 'qris' && (
                                <div className="space-y-2 rounded border p-4 text-sm text-muted-foreground">
                                    <p>Scan this QR using your e-wallet app.</p>
                                    <div className="mt-2 flex h-40 w-40 items-center justify-center rounded-md border bg-gray-100">
                                        [QR CODE PLACEHOLDER]
                                    </div>
                                </div>
                            )}

                            {data.payment.method === 'virtual-account' && (
                                <div className="space-y-2 rounded border p-4 text-sm">
                                    <p>Your Virtual Account Number:</p>
                                    <div className="font-mono text-lg font-semibold">8808123456789012</div>
                                </div>
                            )}
                        </Section>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {cart.map((item: CartItem) => (
                                        <div key={item.id} className="flex justify-between">
                                            <span>
                                                {item.name}
                                                {item.quantity > 1 ? ` (x${item.quantity})` : ''}
                                            </span>
                                            <span>{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>{formatPrice(subtotal)}</span>
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

function InputGroup({
    id,
    label,
    value,
    onChange,
    type = 'text',
}: {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} value={value} onChange={onChange} placeholder={label} type={type} />
        </div>
    );
}

function RadioOption({ id, label }: { id: string; label: string }) {
    return (
        <div className="flex items-center space-x-2 rounded-md border p-4">
            <RadioGroupItem value={id} id={id} />
            <Label htmlFor={id} className="flex items-center gap-2 font-normal">
                {label}
            </Label>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            {children}
        </div>
    );
}
