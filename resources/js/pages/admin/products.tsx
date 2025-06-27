import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardSidebarLayout from '@/layouts/app/dashboard-sidebar-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    image_url?: string;
    price: number;
    stock_quantity: number;
    category?: {
        name: string;
    };
}

interface PageProps {
    products?: Product[];
}

export default function AdminProducts() {
    const { products } = usePage().props as PageProps;

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            router.delete(`/admin/products/${id}`);
        }
    };

    return (
        <DashboardSidebarLayout>
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Product Management</h1>
                    <Button asChild className="bg-[#8B5A2B] hover:bg-[#6d472a]">
                        <Link href="/admin/products/create">
                            <Plus className="mr-2 h-4 w-4" /> New Product
                        </Link>
                    </Button>
                </div>
                <Card className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {(products || []).map((product: Product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2">
                                        <img
                                            src={product.image_url || '/placeholder.svg'}
                                            alt={product.name}
                                            className="h-14 w-14 rounded border object-cover"
                                        />
                                    </td>
                                    <td className="px-4 py-2 font-medium">{product.name}</td>
                                    <td className="px-4 py-2">{product.category?.name || '-'}</td>
                                    <td className="px-4 py-2 font-semibold text-[#8B5A2B]">Rp{Number(product.price).toLocaleString('id-ID')}</td>
                                    <td className="px-4 py-2">{product.stock_quantity}</td>
                                    <td className="flex gap-2 px-4 py-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </DashboardSidebarLayout>
    );
}
