'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Delete, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  // PIN yang benar (dummy, nanti cek ke Supabase)
  const CORRECT_PIN = '123456';

  // Handle input PIN
  const handleInput = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      // Auto-submit jika sudah 6 digit
      if (newPin.length === 6) {
        verifyPin(newPin);
      }
    }
  };

  // Handle hapus digit
  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  // Verifikasi PIN
  const verifyPin = (currentPin: string) => {
    setLoading(true);
    
    // Simulasi delay network
    setTimeout(() => {
      if (currentPin === CORRECT_PIN) {
        router.push('/pos/inbound');
      } else {
        setError(true);
        // Shake animation & reset
        setTimeout(() => {
          setPin('');
          setLoading(false);
        }, 500);
      }
    }, 300);
  };

  // Render tombol Numpad
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden px-4">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-3xl opacity-50" />

      {/* Container Utama */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-teal-400 mb-2">CNY Enterprise</h1>
          <p className="text-slate-400 text-sm">Masukkan PIN untuk melanjutkan</p>
        </div>

        {/* Display PIN (6 Dots) */}
        <div className={`flex gap-4 mb-12 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div 
              key={index} 
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                pin.length > index 
                  ? 'bg-teal-400 border-teal-400 scale-110 shadow-[0_0_10px_rgba(45,212,191,0.6)]' 
                  : 'border-slate-600 bg-transparent'
              } ${error ? 'border-red-500 bg-red-500' : ''}`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 animate-pulse">PIN salah, coba lagi.</p>
        )}

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          {buttons.map((btn) => {
            if (btn === 'del') {
              return (
                <button 
                  key={btn}
                  onClick={handleDelete}
                  disabled={loading || pin.length === 0}
                  className="h-16 flex items-center justify-center text-slate-400 hover:text-white active:bg-slate-800/50 rounded-xl transition-all duration-150 disabled:opacity-30"
                >
                  <Delete className="w-6 h-6" />
                </button>
              );
            }
            
            if (btn === '.') {
              // Tombol kosong atau fitur lain (biarkan kosong untuk estetika)
              return <div key={btn} className="h-16" />;
            }

            return (
              <button 
                key={btn}
                onClick={() => handleInput(btn)}
                disabled={loading}
                className="h-16 flex items-center justify-center text-2xl font-semibold bg-slate-800/40 hover:bg-slate-700/50 active:bg-teal-600 rounded-xl transition-all duration-150 backdrop-blur-sm border border-slate-700/50 shadow-lg disabled:opacity-50"
              >
                {btn}
              </button>
            );
          })}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="mt-8 flex items-center gap-2 text-teal-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Memverifikasi...</span>
          </div>
        )}

        {/* Footer Hint */}
        <p className="mt-10 text-xs text-slate-600 select-none">
          Hint: PIN Default adalah 123456
        </p>
      </div>

      {/* Custom Styles untuk Animasi Shake */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </main>
  );
}
