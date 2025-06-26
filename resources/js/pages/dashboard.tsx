import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/dashboard-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage<{ user: User; orders: any[] }>();

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
                                    {props.orders.map((order: any) => (
                                        <tr key={order.id}>
                                            <td className="px-4 py-2 font-medium">#{order.id}</td>
                                            <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">${order.total.toLocaleString()}</td>
                                            <td className="px-4 py-2">{order.status}</td>
                                            <td className="px-4 py-2">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this order?')) {
                                                            router.delete(`/orders/${order.id}`, {
                                                                onSuccess: () => router.reload(),
                                                            });
                                                        }
                                                    }}
                                                >
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
        </AppLayout>
    );
}
