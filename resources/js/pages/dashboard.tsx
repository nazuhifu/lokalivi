import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/dashboard-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const { props } = usePage<{ user: User }>();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        {/* Informasi User */}
        <div className="relative rounded-xl border p-4 shadow space-y-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p>
            <span className="font-medium mr-2">Name:</span>
            {props.user.name}
          </p>
          <p>
            <span className="font-medium mr-2">Email:</span>
            {props.user.email}
          </p>
          <div className="absolute bottom-4 right-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.visit('/settings/profile')}
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Placeholder layout bawah */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            </div>
          ))}
        </div>
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>
    </AppLayout>
  );
}
