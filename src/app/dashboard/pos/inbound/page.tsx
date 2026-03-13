'use client';

import { useState } from 'react';
import { Save, Search, Trash2 } from 'lucide-react';

const dummyProducts = [
  { id: 1, name: 'Bakso Sapi', supplier: 'Pak Budi' },
  { id: 2, name: 'Mie Ayam', supplier: 'Bu Siti' },
];

export default function InboundPage() {
  const [items, setItems] = useState<{ id: number; name: string; qty: number }[]>([]);
  
  const handleAddItem = (product: typeof dummyProducts[0]) => {
    if (items.find(i => i.id === product.id)) return;
    setItems([...items, { id: product.id, name: product.name, qty: 0 }]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white">Inbound Pagi</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Produk */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-4 bg-slate-800 p-2 rounded-lg">
            <Search className="w-4 h-4 text-slate-400" />
            <input placeholder="Cari..." className="bg-transparent text-sm outline-none text-white w-full" />
          </div>
          {dummyProducts.map(p => (
            <button 
              key={p.id} 
              onClick={() => handleAddItem(p)}
              className="w-full text-left p-3 mb-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Keranjang Input */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-white">Stok Masuk</h3>
          {items.length === 0 ? (
            <div className="text-center text-slate-500 py-10 border-dashed border-2 border-slate-800 rounded-lg">
              Pilih produk di sebelah kiri
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-lg mb-2">
                <span className="text-white flex-1">{item.name}</span>
                <input type="number" className="w-20 bg-slate-900 text-center text-white rounded p-2" value={item.qty} onChange={(e) => setItems(items.map(i => i.id === item.id ? {...i, qty: +e.target.value} : i))} />
                <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-red-400"><Trash2 className="w-5 h-5"/></button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
