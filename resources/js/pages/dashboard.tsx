import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/dashboard-layout';
import { formatPrice } from '@/lib/utils';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Order {
    id: number;
    created_at: string;
    total: number;
    status: string;
    items: OrderItem[];
    shipping?: {
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
    payment?: {
        method: string;
        bank_name?: string;
        ewallet_type?: string;
        ewallet_number?: string;
    };
}

interface OrderItem {
    id: number;
    product?: { name?: string };
    quantity: number;
    price: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

// Helper for formatting IDR currency
function formatCurrency(amount: number) {
    return formatPrice(amount);
}

function renderPaymentMethod(method?: string) {
    switch (method) {
        case 'bank-transfer':
            return '🏦 Bank Transfer';
        case 'e-wallet':
            return '📱 E-Wallet';
        case 'qris':
            return '🔳 QRIS';
        case 'virtual-account':
            return '🧾 Virtual Account';
        default:
            return method || '-';
    }
}

export default function Dashboard() {
    const { props } = usePage<{ user: User; orders: Order[] }>();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const openOrderModal = (order: Order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };
    const closeOrderModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleDeleteClick = (orderId: number) => {
        setDeleteOrderId(orderId);
        setShowDeleteDialog(true);
    };
    const handleDeleteConfirm = () => {
        if (deleteOrderId) {
            router.delete(`/orders/${deleteOrderId}`, {
                onSuccess: () => router.reload(),
            });
        }
        setShowDeleteDialog(false);
        setDeleteOrderId(null);
    };
    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
        setDeleteOrderId(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Informasi User */}
                <div className="relative space-y-4 rounded-xl border p-4 shadow">
                    <h2 className="text-xl font-semibold">User Information</h2>
                    <p>
                        <span className="mr-2 font-medium">Name:</span>
                        {props.user.name}
                    </p>
                    <p>
                        <span className="mr-2 font-medium">Email:</span>
                        {props.user.email}
                    </p>
                    <div className="absolute right-4 bottom-4">
                        <Button size="sm" variant="outline" onClick={() => router.visit('/settings/profile')}>
                            Edit
                        </Button>
                    </div>
                </div>

                {/* User Orders */}
                <div className="mt-1 space-y-4 rounded-xl border p-4 shadow">
                    <h2 className="text-xl font-semibold">My Orders</h2>
                    {props.orders && props.orders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {props.orders.map((order: Order) => (
                                        <tr key={order.id}>
                                            <td className="px-4 py-2 font-medium">#{order.id}</td>
                                            <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{formatCurrency(order.total)}</td>
                                            <td className="px-4 py-2">{order.status}</td>
                                            <td className="px-4 py-2">
                                                <Button size="sm" variant="secondary" className="mr-2" onClick={() => openOrderModal(order)}>
                                                    View Details
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDeleteClick(order.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-muted-foreground">You have no orders yet.</p>
                    )}
                </div>

                {/* Placeholder layout bawah */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                        >
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    ))}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>

            {/* Order Details Modal */}
            <Dialog open={showModal} onOpenChange={closeOrderModal}>
                <DialogContent className="flex max-h-[90vh] max-w-lg flex-col">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            {selectedOrder && (
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Order #</span>
                                        <span>#{selectedOrder.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Date</span>
                                        <span>{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Status</span>
                                        <span>{selectedOrder.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total</span>
                                        <span className="text-lg font-bold text-[#8B5A2B]">{formatCurrency(selectedOrder.total)}</span>
                                    </div>
                                </div>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="mt-4 flex-1 space-y-6 overflow-auto">
                            {/* Contact & Shipping Info */}
                            <div className="rounded-lg border bg-gray-50 p-4">
                                <h3 className="mb-2 text-lg font-semibold">Contact & Shipping Information</h3>
                                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                    <div>
                                        <div>
                                            <span className="font-medium">First Name:</span> {selectedOrder.shipping?.first_name}
                                        </div>
                                        <div>
                                            <span className="font-medium">Last Name:</span> {selectedOrder.shipping?.last_name}
                                        </div>
                                        <div>
                                            <span className="font-medium">Email:</span> {selectedOrder.shipping?.email}
                                        </div>
                                        <div>
                                            <span className="font-medium">Phone:</span> {selectedOrder.shipping?.phone}
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <span className="font-medium">Street Address:</span> {selectedOrder.shipping?.address}
                                        </div>
                                        <div>
                                            <span className="font-medium">City:</span> {selectedOrder.shipping?.city}
                                        </div>
                                        <div>
                                            <span className="font-medium">State/Province:</span> {selectedOrder.shipping?.state}
                                        </div>
                                        <div>
                                            <span className="font-medium">ZIP Code:</span> {selectedOrder.shipping?.zip}
                                        </div>
                                        <div>
                                            <span className="font-medium">Country:</span> {selectedOrder.shipping?.country}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Payment Info */}
                            <div className="rounded-lg border bg-gray-50 p-4">
                                <h3 className="mb-2 text-lg font-semibold">Payment Information</h3>
                                {selectedOrder.payment ? (
                                    <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                        <div>
                                            <div>
                                                <span className="font-medium">Method:</span> {renderPaymentMethod(selectedOrder.payment.method)}
                                            </div>
                                            {selectedOrder.payment.method === 'bank-transfer' && (
                                                <div>
                                                    <span className="font-medium">Bank:</span> {selectedOrder.payment.bank_name}
                                                </div>
                                            )}
                                            {selectedOrder.payment.method === 'e-wallet' && (
                                                <>
                                                    <div>
                                                        <span className="font-medium">E-Wallet:</span> {selectedOrder.payment.ewallet_type}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Number:</span> {selectedOrder.payment.ewallet_number}
                                                    </div>
                                                </>
                                            )}
                                            {selectedOrder.payment.method === 'virtual-account' && (
                                                <div>
                                                    <span className="font-medium">Virtual Account:</span> 8808123456789012
                                                </div>
                                            )}
                                            {selectedOrder.payment.method === 'qris' && (
                                                <div>
                                                    <span className="font-medium">QRIS:</span> (Paid via QRIS)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-muted-foreground">No payment info available.</div>
                                )}
                            </div>
                            {/* Items Table */}
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">Items</h3>
                                <div className="max-h-64 overflow-x-auto overflow-y-auto rounded-lg border bg-white shadow-inner">
                                    <table className="min-w-full text-sm">
                                        <thead className="sticky top-0 z-10 bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left font-medium">Product</th>
                                                <th className="px-4 py-2 text-left font-medium">Quantity</th>
                                                <th className="px-4 py-2 text-left font-medium">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.items &&
                                                selectedOrder.items.map((item: OrderItem) => (
                                                    <tr key={item.id}>
                                                        <td className="px-4 py-2">{item.product?.name || 'Product'}</td>
                                                        <td className="px-4 py-2">{item.quantity}</td>
                                                        <td className="px-4 py-2">{formatCurrency(item.price)}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={closeOrderModal}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={showDeleteDialog} onOpenChange={handleDeleteCancel}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Order</DialogTitle>
                        <DialogDescription>Are you sure you want to delete this order?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleDeleteCancel}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
