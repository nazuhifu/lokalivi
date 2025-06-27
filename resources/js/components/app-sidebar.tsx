import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, Package2, User } from 'lucide-react';

interface PageProps {
    auth?: {
        user?: {
            is_admin?: boolean;
        };
    };
}

export default function AppSidebar() {
    const { auth } = usePage().props as PageProps;
    const user = auth?.user;
    const isAdmin = !!user?.is_admin;

    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Manage Products',
            href: '/admin/products',
            icon: Package2,
        },
        {
            title: 'Manage User',
            href: '/admin/users',
            icon: User,
        },
    ];

    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className="top-16 h-[calc(100vh-4rem)]">
            <SidebarContent>
                <NavMain items={isAdmin ? adminNavItems : userNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
