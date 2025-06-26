import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
    return (
        <AppLayout>
            <Head title="Order Successful" />
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 md:px-6 lg:px-20">
                <CheckCircle className="mb-6 h-20 w-20 text-green-500" />
                <h1 className="mb-2 text-center text-3xl font-bold">Thank you for your order!</h1>
                <p className="mb-8 max-w-md text-center text-muted-foreground">
                    Your order has been placed successfully. We've sent a confirmation email with your order details. You can track your order status
                    from your account.
                </p>
                <div className="flex gap-4">
                    <Button asChild className="bg-[#8B5A2B] hover:bg-[#6d472a]">
                        <Link href="/">Back to Home</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/dashboard">View My Orders</Link>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
