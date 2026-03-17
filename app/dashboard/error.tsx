"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Erro capturado na rota do dashboard:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
        <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Ops! Algo deu errado.
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Não conseguimos carregar os dados do mercado no momento. Pode ser uma instabilidade temporária na nossa API.
      </p>
      
      <button
        // tenta renderizar o componente (page.tsx) novamente
        onClick={() => reset()}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        <RefreshCcw size={20} />
        Tentar Novamente
      </button>
    </div>
  );
}