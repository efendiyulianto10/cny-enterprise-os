'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Calculator, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Inbound', href: '/pos/inbound', icon: Package },
  { name: 'Kasir', href: '/pos/cashier', icon: Calculator },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 font-bold text-teal-400">
          CNY OS
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${pathname.startsWith(item.href) ? 'bg-teal-500/10 text-teal-400' : 'text-slate-400 hover:bg-slate-800'}`}>
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <Link href="/login" className="p-4 border-t border-slate-800 text-red-400 flex items-center gap-2">
          <LogOut className="w-5 h-5" /> Keluar
        </Link>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
