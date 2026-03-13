import Link from 'next/link';
import { Store, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-teal-900/20 via-transparent to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        
        {/* Logo Ikon */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/30 transform hover:scale-105 transition-transform duration-300">
          <Store className="w-12 h-12 text-white" strokeWidth={1.5} />
        </div>

        {/* Judul */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          CNY Enterprise
        </h1>

        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full mb-6" />

        <p className="text-lg md:text-xl text-slate-400 font-medium mb-10 max-w-md">
          Sistem Manajemen Sarapan 10 Ribu
        </p>

        <Link 
          href="/login" 
          className="group flex items-center gap-3 px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-lg rounded-xl shadow-xl shadow-teal-900/30 transition-all duration-300 hover:shadow-teal-500/40 active:scale-95"
        >
          Masuk ke Sistem
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
