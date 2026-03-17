"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function CurrencySelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // Pega a moeda atual da URL ou usa 'usd' como padrão
    const currentCurrency = searchParams.get('currency') || 'usd';

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('currency', e.target.value);
        
        // Atualiza a URL sem rolar a página para o topo
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="currency" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Moeda:
            </label>
            <select
                id="currency"
                value={currentCurrency}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 transition-colors cursor-pointer outline-none"
            >
                <option value="usd">Dólar (USD)</option>
                <option value="brl">Real (BRL)</option>
                <option value="eur">Euro (EUR)</option>
            </select>
        </div>
    );
}