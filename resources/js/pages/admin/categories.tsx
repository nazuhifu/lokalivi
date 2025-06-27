import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DashboardSidebarLayout from '@/layouts/app/dashboard-sidebar-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { Pencil, Plus, Trash } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    image_url: string;
    products_count: number;
    created_at: string;
}

interface PageProps {
    categories?: Category[];
}

export default function AdminCategories() {
    const { categories } = usePage().props as PageProps;

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <DashboardSidebarLayout>
            <div className="container mx-auto px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Category Management</h1>
                    <Button asChild className="bg-[#8B5A2B] hover:bg-[#6d472a]">
                        <Link href="/admin/categories/create">
                            <Plus className="mr-2 h-4 w-4" /> New Category
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(categories || []).map((category: Category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <img
                                                src={`/${category.image_url}`}
                                                alt={category.name}
                                                className="h-14 w-14 rounded border object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/placeholder.svg';
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                        <TableCell>{category.products_count}</TableCell>
                                        <TableCell>{category.created_at}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/admin/categories/${category.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="destructive" 
                                                onClick={() => handleDelete(category.id)}
                                                disabled={category.products_count > 0}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardSidebarLayout>
    );
} 