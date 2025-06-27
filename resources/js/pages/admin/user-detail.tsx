import { Button } from '@/components/ui/button';
import DashboardSidebarLayout from '@/layouts/app/dashboard-sidebar-layout';
import { Link, usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

export default function AdminUserDetail() {
    const user = (usePage().props as any).user;

    return (
        <DashboardSidebarLayout>
            <div className="container mx-auto max-w-xl px-4 py-8 md:px-6 lg:px-20">
                <h1 className="mb-8 text-3xl font-bold">User Detail</h1>
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-700">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">{user.name}</h2>
                            <p className="text-muted-foreground">ID: {user.id}</p>
                        </div>
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Email:</span> {user.email}
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Role:</span>{' '}
                        {user.is_admin ? (
                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">Admin</span>
                        ) : (
                            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">User</span>
                        )}
                    </div>
                    <div className="mb-2">
                        <span className="font-medium">Joined:</span> {new Date(user.created_at).toLocaleDateString()}
                    </div>
                </div>
                <div className="mt-6">
                    <Button asChild variant="outline">
                        <Link href="/admin/users">Back to User List</Link>
                    </Button>
                </div>
            </div>
        </DashboardSidebarLayout>
    );
}
