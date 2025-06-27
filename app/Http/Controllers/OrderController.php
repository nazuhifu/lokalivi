<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
  public function store(Request $request)
  {
    $validated = $request->validate([
      'items' => 'required|array|min:1',
      'items.*.product_id' => 'required|exists:products,id',
      'items.*.quantity' => 'required|integer|min:1',
      'shipping' => 'required|array',
      'shipping.first_name' => 'required|string',
      'shipping.last_name' => 'required|string',
      'shipping.email' => 'required|email',
      'shipping.phone' => 'required|string',
      'shipping.address' => 'required|string',
      'shipping.city' => 'required|string',
      'shipping.state' => 'required|string',
      'shipping.zip' => 'required|string',
      'shipping.country' => 'required|string',
    ]);

    $userId = Auth::id();
    $orderTotal = 0;
    $orderItems = [];

    DB::beginTransaction();
    try {
      foreach ($validated['items'] as $item) {
        $product = Product::findOrFail($item['product_id']);
        $lineTotal = $product->price * $item['quantity'];
        $orderTotal += $lineTotal;
        $orderItems[] = [
          'product_id' => $product->id,
          'quantity' => $item['quantity'],
          'price' => $product->price,
        ];
      }

      $order = Order::create([
        'user_id' => $userId,
        'total' => $orderTotal,
        'status' => 'Processing',
        'shipping' => $validated['shipping'],
        'payment' => $request->input('payment', []),
      ]);

      foreach ($orderItems as $item) {
        $item['order_id'] = $order->id;
        OrderItem::create($item);
      }

      if ($userId) {
        $request->user()->carts()->delete();
      }

      DB::commit();
      return Inertia::render('checkout', [
        'cart' => [],
        'orderSuccess' => true,
      ]);
    } catch (\Exception $e) {
      DB::rollBack();
      return back()->withErrors(['checkout' => 'Order could not be processed.']);
    }
  }

  public function checkout(Request $request)
  {
    $user = $request->user();
    $cart = $user->carts()->get(['id', 'product_id', 'name', 'price', 'quantity', 'image'])->toArray();
    return Inertia::render('checkout', [
      'cart' => $cart
    ]);
  }

  public function track(Request $request)
  {
    $data = $request->validate([
      'order_number' => 'required',
      'email' => 'required|email',
    ]);

    $order = \App\Models\Order::where('id', $data['order_number'])
      ->whereHas('user', function ($q) use ($data) {
        $q->where('email', $data['email']);
      })
      ->with('user')
      ->first();

    if (!$order) {
      return response()->json(['error' => 'Order not found.'], 404);
    }

    // Example tracking steps (replace with real shipment data if available)
    $created = $order->created_at->format('M d, Y');
    $steps = [
      [
        'status' => 'Order Placed',
        'date' => $created,
        'location' => 'Online',
        'completed' => true,
        'current' => false,
      ],
      [
        'status' => 'Processing',
        'date' => $created,
        'location' => 'Warehouse',
        'completed' => $order->status !== 'Processing',
        'current' => $order->status === 'Processing',
      ],
      [
        'status' => 'Shipped',
        'date' => $order->status === 'Shipped' || $order->status === 'Delivered' ? $created : 'Pending',
        'location' => 'Distribution Center',
        'completed' => $order->status === 'Shipped' || $order->status === 'Delivered',
        'current' => $order->status === 'Shipped',
      ],
      [
        'status' => 'In Transit',
        'date' => $order->status === 'In Transit' || $order->status === 'Delivered' ? $created : 'Pending',
        'location' => 'En Route',
        'completed' => $order->status === 'Delivered',
        'current' => $order->status === 'In Transit',
      ],
      [
        'status' => 'Delivered',
        'date' => $order->status === 'Delivered' ? $created : 'Pending',
        'location' => 'Destination',
        'completed' => $order->status === 'Delivered',
        'current' => false,
      ],
    ];

    return response()->json([
      'orderNumber' => $order->id,
      'status' => $order->status,
      'estimatedDelivery' => $order->created_at->addDays(7)->format('M d, Y'),
      'trackingSteps' => $steps,
    ]);
  }

  public function index(Request $request)
  {
    $user = $request->user();
    $orders = $user->orders()->with('items.product')->orderByDesc('created_at')->get();
    return inertia('orders', [
      'orders' => $orders
    ]);
  }

  public function destroy(Request $request, $orderId)
  {
    $user = $request->user();
    $order = $user->orders()->findOrFail($orderId);
    $order->delete();
    return redirect()->route('dashboard')->with('success', 'Order deleted successfully.');
  }
}
