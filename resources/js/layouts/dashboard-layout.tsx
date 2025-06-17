import DashboardLayoutTemplate from '@/layouts/app/dashboard-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <DashboardLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </DashboardLayoutTemplate>
);
