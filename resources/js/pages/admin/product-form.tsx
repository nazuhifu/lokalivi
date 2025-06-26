import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function AdminProductForm() {
    const { categories, product } = usePage().props as any;
    const isEdit = !!product;
    const [imagePreview, setImagePreview] = useState<string | null>(
        product?.image_url ? (product.image_url.startsWith('/') ? product.image_url : '/' + product.image_url) : null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        category_id: product?.category_id?.toString() || (categories[0]?.id?.toString() ?? ''),
        price: product?.price?.toString() || '',
        stock_quantity: product?.stock_quantity?.toString() || '',
        image: null as File | null,
    });

    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        if (form.image) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(form.image);
        }
    }, [form.image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category_id', form.category_id);
        formData.append('price', form.price.replace(',', '.'));
        formData.append('stock_quantity', form.stock_quantity);
        if (form.image) {
            formData.append('image', form.image);
        }

        if (isEdit) {
            formData.append('_method', 'PUT');
            router.post(`/admin/products/${product.id}`, formData, {
                onError: (err) => setErrors(err),
            });
        } else {
            router.post('/admin/products', formData, {
                onError: (err) => setErrors(err),
            });
        }
    };

    return (
        <AppLayout>
            <div className="container mx-auto max-w-xl px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
                    <Button asChild variant="outline">
                        <Link href="/admin/products">Back</Link>
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-white p-6 shadow">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category_id">Category</Label>
                        <select
                            id="category_id"
                            value={form.category_id}
                            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            className="w-full rounded-md border px-3 py-2"
                        >
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <div className="text-sm text-red-500">{errors.category_id}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="text" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                        {errors.price && <div className="text-sm text-red-500">{errors.price}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock_quantity">Stock Quantity</Label>
                        <Input
                            id="stock_quantity"
                            type="text"
                            value={form.stock_quantity}
                            onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                        />
                        {errors.stock_quantity && <div className="text-sm text-red-500">{errors.stock_quantity}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image">Product Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                        />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded border object-cover" />}
                        {errors.image && <div className="text-sm text-red-500">{errors.image}</div>}
                    </div>
                    <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]">
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
