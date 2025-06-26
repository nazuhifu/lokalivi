'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardSidebarLayout from '@/layouts/app/dashboard-sidebar-layout';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/react';
import { BarChart3, DollarSign, Eye, LogOut, Package, Settings, ShoppingBag, TrendingDown, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
    const { stats, auth } = usePage().props as any;
    const user = auth?.user;

    const handleLogout = () => {
        Inertia.post('/logout');
    };

    if (!user) return null;

    return (
        <DashboardSidebarLayout>
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-20">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-gray-700">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-muted-foreground">Welcome back, {user.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Settings className="h-4 w-4" />
                            Settings
                        </Button>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${Number(stats.totalRevenue).toLocaleString()}</div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                {/* You can add a real percentage if you want */}
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                +8% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                +15% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalProducts}</div>
                            <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                <TrendingDown className="h-3 w-3 text-red-500" />
                                -2% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Recent Orders */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                                <CardDescription>Latest customer orders requiring attention</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {stats.recentOrders.map((order: any) => (
                                        <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <p className="font-medium">Order #{order.id}</p>
                                                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <p className="font-medium">${Number(order.total).toLocaleString()}</p>
                                                    <p className="text-sm text-muted-foreground">{order.date}</p>
                                                </div>
                                                <Badge
                                                    variant={
                                                        order.status === 'Delivered'
                                                            ? 'default'
                                                            : order.status === 'Shipped'
                                                              ? 'secondary'
                                                              : 'outline'
                                                    }
                                                >
                                                    {order.status}
                                                </Badge>
                                                <Button size="sm" variant="ghost">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Top Products & Quick Actions */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Top Products
                                </CardTitle>
                                <CardDescription>Best performing products this month</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {stats.topProducts.map((product: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                                        </div>
                                        <p className="font-medium">${Number(product.revenue).toLocaleString()}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full justify-start gap-3" variant="outline">
                                    <Package className="h-4 w-4" />
                                    Manage Products
                                </Button>

                                <Button className="w-full justify-start gap-3" variant="outline" asChild>
                                    <Link href="/admin/orders">
                                        <ShoppingBag className="h-4 w-4" />
                                        View All Orders
                                    </Link>
                                </Button>

                                <Button className="w-full justify-start gap-3" variant="outline">
                                    <Users className="h-4 w-4" />
                                    Customer Management
                                </Button>

                                <Button className="w-full justify-start gap-3" variant="outline">
                                    <BarChart3 className="h-4 w-4" />
                                    Analytics
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardSidebarLayout>
    );
}
