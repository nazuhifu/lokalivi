import AppLayout from '@/layouts/dashboard-layout';
import { Head, router, usePage } from '@inertiajs/react';
import type { User } from '@/types';
import type { BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
  const { props } = usePage<{ user: User; cart?: any[] }>();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(props.user.name);
  const cart = props.cart ?? [];
  
  const handleSave = () => {
    router.post(
        '/profile/update',
        { name },
        {
        onSuccess: () => {
            setEditing(false);
            router.reload({ only: ['user'] }); // ini akan reload data user dari backend
        },
        }
    );
    };


  const handleCancel = () => {
    setName(props.user.name);
    setEditing(false);
  };

  useEffect(() => {
    setName(props.user.name);
    setEditing(false);
  }, [props.user.name]);

  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex flex-col gap-6 p-4">
        {/* Informasi Pengguna */}
        <div className="relative rounded-xl border p-4 shadow space-y-3">
          <h2 className="text-xl font-semibold">User Information</h2>

          <p>
            <span className="font-medium mr-2">Name:</span>
            {editing ? (
              <Input
                className="inline w-auto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              name
            )}
          </p>

          <p>
            <span className="font-medium mr-2">Email:</span>
            {props.user.email}
          </p>

          <div className="absolute bottom-4 right-4 flex gap-2">
            {editing ? (
              <>
                <Button size="sm" onClick={handleSave}>Save</Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>Cancel</Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setEditing(true)}>Edit</Button>
            )}
          </div>
        </div>

        {/* Daftar Cart */}
        <div className="relative rounded-xl border p-4 shadow pb-12">
          <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
          {cart.length > 0 ? (
            <>
              <ul className="list-disc list-inside space-y-2">
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.product?.name ?? 'Unnamed Product'} — Qty: {item.quantity} — Price: ${item.product?.price.toLocaleString()}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-4 right-4 font-semibold">
                Total: ${totalPrice.toLocaleString()}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
