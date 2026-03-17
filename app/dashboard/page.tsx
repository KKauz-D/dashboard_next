import { BitcoinChart } from "@/components/charts/BitcoinChart";
import { DashboardDataResponse } from "@/types";
import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import { CryptoCard } from "@/components/ui/CryptoCard";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { TrendingUp, TrendingDown } from "lucide-react";

function getBaseUrl() {
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:3000`
}

async function getDashboardData(coin: string, currency: string): Promise<DashboardDataResponse | null> {
    try {        
        const res = await fetch(`${getBaseUrl()}/api/dashboard-data?coin=${coin}&currency=${currency}`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("erro ao buscar dados do dashboard");

        return res.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

function formatCurrency(value: number, currency: string) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency.toUpperCase(),
        maximumFractionDigits: 2
    }).format(value);
}

function formatCompactNumber(value: number, currency: string) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency.toUpperCase(),
        notation: "compact",
        maximumFractionDigits: 2
    }).format(value);
}

export default async function DashboardPage(props: {
    searchParams: Promise<{ coin?: string; currency?: string }>; 
}) {
    
  const searchParams = await props.searchParams;
  const selectedCoin = searchParams.coin || 'bitcoin';
  const selectedCurrency = searchParams.currency || 'usd'; // Padrão é USD
  
  const data = await getDashboardData(selectedCoin, selectedCurrency);

  const currentPrice = data?.currentPrice || 0;
  const chartData = data?.bitcoinData || [];
  const priceChange24h = data?.priceChange24h || 0;
  const volume24h = data?.volume24h || 0;
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Visão Geral do Mercado
        </h1>
        {/* Aqui entra o nosso novo componente! */}
        <CurrencySelector />
      </div>
      
      {/* Cards de Estatísticas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Preço Atual ({selectedCoin.toUpperCase()})</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {formatCurrency(currentPrice, selectedCurrency)}  
            </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Variação (24h)</h3>
          <div className="flex items-center mt-2 gap-2">
            <p className={`text-3xl font-bold ${priceChange24h >= 0 ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
              {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
            </p>
            <span className={`flex items-center gap-1 text-sm font-medium px-2.5 py-1 rounded-full ${
                priceChange24h >= 0 
                    ? 'text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-400' 
                    : 'text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-400'
            }`}>
              {priceChange24h >= 0 ? (
                  <>
                    <TrendingUp size={16} strokeWidth={2.5} /> 
                    <span>Alta</span>
                  </>
              ) : (
                  <>
                    <TrendingDown size={16} strokeWidth={2.5} /> 
                    <span>Baixa</span>
                  </>
              )}
            </span>
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Volume (24h)</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {formatCompactNumber(volume24h, selectedCurrency)}
          </p>
        </div>
      </div>

      {/* Grid de Escolha de Moedas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <CryptoCard
          id="bitcoin"
          title="Bitcoin"
          symbol="BTC"
          description="A principal criptomoeda do mercado, conhecida pela sua segurança e descentralização."
          icon={<SiBitcoin color="#F7931A" size={32} />}
          isActive={selectedCoin === 'bitcoin'}
        />
        <CryptoCard
          id="ethereum"
          title="Ethereum"
          symbol="ETH"
          description="Plataforma líder para contratos inteligentes e aplicações descentralizadas (dApps)."
          icon={<SiEthereum color="#627EEA" size={32} />}
          isActive={selectedCoin === 'ethereum'}
        />
        <CryptoCard
          id="solana"
          title="Solana"
          symbol="SOL"
          description="Blockchain de alta performance, conhecida por suas transações ultra-rápidas e baixas taxas."
          icon={<SiSolana color="#9945FF" size={32} />}
          isActive={selectedCoin === 'solana'}
        />
      </div>
      
      {/* Área do Gráfico */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                Histórico de 7 dias ({selectedCoin})
            </h2>
            <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                Em {selectedCurrency.toUpperCase()}
            </span>
        </div>
        <div className="h-80 w-full">
            <BitcoinChart data={chartData} currency={selectedCurrency} /> 
        </div>
      </div>
    </div>
  );
}