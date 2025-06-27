import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from 'sonner';

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
            <Toaster position="top-center" richColors />
        </>
    );
}
