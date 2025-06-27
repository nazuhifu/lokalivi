import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Link, router, usePage } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface Category {
    id?: number;
    name?: string;
    slug?: string;
    image_url?: string;
}

interface PageProps {
    category?: Category;
}

export default function AdminCategoryForm() {
    const { category } = usePage().props as PageProps;
    const isEdit = !!category;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState({
        name: category?.name || '',
    });

    const [image, setImage] = useState<{
        file?: File;
        url: string;
    } | null>(category?.image_url ? { url: category.image_url } : null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);

        if (image?.file) {
            formData.append('image', image.file);
        }

        if (isEdit && category?.id) {
            formData.append('_method', 'PUT');
            router.post(`/admin/categories/${category.id}`, formData, {
                onError: (err) => setErrors(err),
            });
        } else {
            router.post('/admin/categories', formData, {
                onError: (err) => setErrors(err),
            });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage({
                file,
                url: URL.createObjectURL(file),
            });
        }
    };

    const removeImage = () => {
        if (image?.url && image.url.startsWith('blob:')) {
            URL.revokeObjectURL(image.url);
        }
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <AppLayout>
            <div className="container mx-auto max-w-2xl px-4 py-10 md:px-6 lg:px-20">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{isEdit ? 'Edit Category' : 'Add Category'}</h1>
                    <Button asChild variant="outline">
                        <Link href="/admin/categories">Back</Link>
                    </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border bg-white p-6 shadow">
                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
                        <Input 
                            id="name" 
                            value={form.name} 
                            onChange={(e) => setForm({ ...form, name: e.target.value })} 
                            placeholder="Enter category name..."
                        />
                        {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-2">
                        <Label>Category Image</Label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Image
                                </Button>
                                {image && (
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={removeImage}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <input 
                                ref={fileInputRef} 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="hidden" 
                            />

                            {image && (
                                <div className="relative">
                                    <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg border">
                                        <img 
                                            src={image.url} 
                                            alt="Category preview" 
                                            className="h-full w-full object-cover" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {errors.image && <div className="text-sm text-red-500">{errors.image}</div>}
                    </div>

                    <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6d472a]">
                        {isEdit ? 'Update Category' : 'Create Category'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
} 