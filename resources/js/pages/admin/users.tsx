import { Button } from '@/components/ui/button';
import DashboardSidebarLayout from '@/layouts/app/dashboard-sidebar-layout';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

export default function AdminUsers() {
    const { users = [] } = usePage().props as { users?: User[] };
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setDeletingId(id);
            Inertia.delete(`/admin/users/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <DashboardSidebarLayout>
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-20">
                <h1 className="mb-8 text-3xl font-bold">User Management</h1>
                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.is_admin ? (
                                            <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">Admin</span>
                                        ) : (
                                            <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">User</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="space-x-2 px-6 py-4 text-right whitespace-nowrap">
                                        <Button asChild size="sm" variant="outline">
                                            <a href={`/admin/users/${user.id}`}>View</a>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleDelete(user.id)}
                                            disabled={deletingId === user.id}
                                        >
                                            {deletingId === user.id ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardSidebarLayout>
    );
}
