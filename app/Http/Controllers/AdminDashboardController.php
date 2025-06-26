<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
  public function index(): Response
  {
    $totalUsers = User::count();
    $totalProducts = Product::count();
    $totalOrders = Order::count();
    $totalRevenue = Order::sum('total');

    $recentOrders = Order::with('user')
      ->orderByDesc('created_at')
      ->take(5)
      ->get()
      ->map(function ($order) {
        return [
          'id' => $order->id,
          'customer' => $order->user ? $order->user->name : 'Unknown',
          'total' => $order->total,
          'status' => $order->status,
          'date' => $order->created_at->toDateString(),
        ];
      });

    $topProducts = Product::select('products.id', 'products.name')
      ->join('order_items', 'products.id', '=', 'order_items.product_id')
      ->selectRaw('SUM(order_items.quantity) as sales, SUM(order_items.price * order_items.quantity) as revenue')
      ->groupBy('products.id', 'products.name')
      ->orderByDesc('sales')
      ->take(3)
      ->get()
      ->map(function ($product) {
        return [
          'name' => $product->name,
          'sales' => $product->sales,
          'revenue' => $product->revenue,
        ];
      });

    return Inertia::render('admin/dashboard', [
      'stats' => [
        'totalUsers' => $totalUsers,
        'totalProducts' => $totalProducts,
        'totalOrders' => $totalOrders,
        'totalRevenue' => $totalRevenue,
        'recentOrders' => $recentOrders,
        'topProducts' => $topProducts,
      ],
    ]);
  }
}
