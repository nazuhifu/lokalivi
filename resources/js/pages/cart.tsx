import { router } from '@inertiajs/react';
import type { PageProps } from '@/types';
import type { CartItem } from '@/types/cart';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

export default function CartPage({ cart = [] }: PageProps<{ cart: CartItem[] }>) {
  const subtotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping: number = 0;
  const total = subtotal + shipping;

  const updateQty = (id: number, qty: number) => {
    router.patch(route('cart.update', id), { quantity: qty });
  };

  const remove = (id: number) => {
    router.delete(route('cart.destroy', id));
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        {cart.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead><TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead><TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map(i => (
                <TableRow key={i.id}>
                  <TableCell><img src={i.image} alt="" className="h-20 w-20 object-cover" /></TableCell>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button size="icon" onClick={() => updateQty(i.id, i.quantity - 1)} disabled={i.quantity <= 1}><Minus /></Button>
                      <span className="mx-2">{i.quantity}</span>
                      <Button size="icon" onClick={() => updateQty(i.id, i.quantity + 1)}><Plus /></Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    Rp{(i.price * i.quantity).toLocaleString()}
                    <Button variant="ghost" size="icon" onClick={() => remove(i.id)}><Trash /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <h3>Your cart is empty</h3>
              <Link href="/products"><Button>Start Shopping</Button></Link>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent>
            <div className="flex justify-between"><span>Subtotal</span><span>Rp{subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `Rp${shipping.toLocaleString()}`}</span></div>
            <Separator />
            <div className="flex justify-between"><span>Total</span><span>Rp{total.toLocaleString()}</span></div>
          </CardContent>
          <CardFooter><Link href="/checkout"><Button className="w-full">Proceed to Checkout</Button></Link></CardFooter>
        </Card>

        <div className="mt-4">
          <Link href="/products"><Button variant="outline"><ArrowLeft /> Continue Shopping</Button></Link>
        </div>
      </div>
    </AppLayout>
  );
}
