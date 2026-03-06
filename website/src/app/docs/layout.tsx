import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/docs/Sidebar';
import { MobileDocNav } from '@/components/docs/MobileDocNav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MobileDocNav />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-8 pt-6 md:pt-8 min-h-[calc(100vh-3.5rem)]">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-24">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
