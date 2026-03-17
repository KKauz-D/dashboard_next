"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

type CryptoCardProps = {
    id: string; // Ex: 'bitcoin', 'ethereum', 'tether'
    title: string;
    symbol: string;
    description: string;
    icon: React.ReactNode;
    isActive: boolean;
};

export function CryptoCard({ id, title, symbol, description, icon, isActive }: CryptoCardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('coin', id);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div
            onClick={handleClick}
            className={`group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                isActive ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-200 dark:border-gray-700'
            }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{symbol}</p>
                </div>
            </div>

            <div className="mt-0 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    )
}