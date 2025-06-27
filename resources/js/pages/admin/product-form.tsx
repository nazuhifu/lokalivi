import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { Plus, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ImageFile {
    file?: File;
    url: string;
    id: string;
}

interface Category {
    id: number;
    name: string;
}

interface Product {
    id?: number;
    name?: string;
    description?: string;
    category_id?: number;
    price?: number;
    stock_quantity?: number;
    features?: string[];
    specifications?: Record<string, string>;
    product_images?: Array<{
        id: number;
        image_url: string;
    }>;
}

interface PageProps {
    categories?: Category[];
    product?: Product;
}

export default function AdminProductForm() {
    const { categories, product } = usePage().props as PageProps;
    const isEdit = !!product;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: product?.name || '',
        description: product?.description || '',
        category_id: product?.category_id?.toString() || (categories?.[0]?.id?.toString() ?? ''),
        price: product?.price?.toString() || '',
        stock_quantity: product?.stock_quantity?.toString() || '',
        features: product?.features || [''],
        specifications: product?.specifications || { Material: '', Finish: '', Dimensions: '' },
    });

    const [images, setImages] = useState<ImageFile[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Initialize images from existing product
    useEffect(() => {
        if (product?.product_images && product.product_images.length > 0) {
            const existingImages = product.product_images.map((img) => ({
                id: `existing-${img.id}`,
                url: img.image_url,
                isExisting: true,
                imageId: img.id,
            }));
            setImages(existingImages);
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('category_id', form.category_id);
        formData.append('price', form.price.replace(',', '.'));
        formData.append('stock_quantity', form.stock_quantity);
        formData.append('features', JSON.stringify(form.features.filter((f: string) => f.trim() !== '')));
        formData.append('specifications', JSON.stringify(form.specifications));

        // Add new images to form data
        const newImages = images.filter((img) => img.file);
        newImages.forEach((image, index) => {
            if (image.file) {
                formData.append(`images[${index}]`, image.file);
            }
        });

        if (isEdit && product?.id) {
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            id: `new-${Date.now()}-${Math.random()}`,
        }));
        setImages((prev) => [...prev, ...newImages]);
    };

    const removeImage = (id: string) => {
        setImages((prev) => {
            const image = prev.find((img) => img.id === id);
            if (image?.url && image.url.startsWith('blob:')) {
                URL.revokeObjectURL(image.url);
            }
            return prev.filter((img) => img.id !== id);
        });
    };

    // const moveImage = (fromIndex: number, toIndex: number) => {
    //     setImages((prev) => {
    //         const newImages = [...prev];
    //         const [movedImage] = newImages.splice(fromIndex, 1);
    //         newImages.splice(toIndex, 0, movedImage);
    //         return newImages;
    //     });
    // };

    const addFeature = () => {
        setForm({ ...form, features: [...form.features, ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = form.features.filter((_: string, i: number) => i !== index);
        setForm({ ...form, features: newFeatures });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...form.features];
        newFeatures[index] = value;
        setForm({ ...form, features: newFeatures });
    };

    const updateSpecification = (key: string, value: string) => {
        setForm({
            ...form,
            specifications: { ...form.specifications, [key]: value },
        });
    };

    return (
        <AppLayout>
            <div className="container mx-auto max-w-2xl px-4 py-10 md:px-6 lg:px-20">
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
                        <Textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={4}
                        />
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
                            {(categories || []).map((cat: Category) => (
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

                    {/* Multiple Images Section */}
                    <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Images
                                </Button>
                                <span className="text-sm text-muted-foreground">{images.length} image(s) selected</span>
                            </div>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />

                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {images.map((image, index) => (
                                        <div key={image.id} className="group relative">
                                            <div className="aspect-square overflow-hidden rounded-lg border">
                                                <img src={image.url} alt={`Product image ${index + 1}`} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="bg-opacity-0 group-hover:bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black transition-all duration-200">
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                                                    <Button type="button" variant="destructive" size="sm" onClick={() => removeImage(image.id)}>
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {index === 0 && (
                                                <div className="absolute top-2 left-2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
                                                    Primary
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.images && <div className="text-sm text-red-500">{errors.images}</div>}
                    </div>

                    {/* Features Section */}
                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                            {form.features.map((feature: string, index: number) => (
                                <div key={index} className="flex gap-2">
                                    <Input value={feature} onChange={(e) => updateFeature(index, e.target.value)} placeholder="Enter a feature..." />
                                    {form.features.length > 1 && (
                                        <Button type="button" variant="outline" size="icon" onClick={() => removeFeature(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Feature
                            </Button>
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="space-y-2">
                        <Label>Specifications</Label>
                        <div className="space-y-2">
                            {Object.entries(form.specifications).map(([key, value]) => (
                                <div key={key} className="flex gap-2">
                                    <Input
                                        value={key}
                                        onChange={(e) => {
                                            const newSpecs = { ...form.specifications };
                                            delete newSpecs[key];
                                            newSpecs[e.target.value] = value;
                                            setForm({ ...form, specifications: newSpecs });
                                        }}
                                        className="w-1/3"
                                        placeholder="Specification name"
                                    />
                                    <Input
                                        value={value as string}
                                        onChange={(e) => updateSpecification(key, e.target.value)}
                                        className="w-2/3"
                                        placeholder="Specification value"
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => updateSpecification(`Specification ${Object.keys(form.specifications).length + 1}`, '')}
                                className="w-full"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Specification
                            </Button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]">
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
