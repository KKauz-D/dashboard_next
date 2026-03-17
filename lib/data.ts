import { ChartDataPoint, DashboardDataResponse } from "@/types";

export async function getCryptoData(coin: string, currency: string): Promise<DashboardDataResponse> {
    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=7`,
            { next: { revalidate: 120 } }
        );

        if (!res.ok) throw new Error(`Falha API CoinGecko. Status: ${res.status}`);

        const rawData = await res.json();

        if (!rawData || !rawData.prices || rawData.prices.length === 0) {
            throw new Error('Formato de dados inválido');
        }

        const formattedData: ChartDataPoint[] = rawData.prices.map((item: [number, number]) => {
            const date = new Date(item[0]);
            return {
                date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit'}),
                price: Math.round(item[1]),
            }
        });

        const dailyData = formattedData.filter((_, index) => index % 24 === 0);

        const lastIndex = rawData.prices.length - 1;
        const currentPrice = rawData.prices[lastIndex][1];
        const volume24h = rawData.total_volumes[rawData.total_volumes.length - 1][1];
        
        const index24hAgo = Math.max(0, rawData.prices.length - 25);
        const price24hAgo = rawData.prices[index24hAgo][1];
        const priceChange24h = ((currentPrice - price24hAgo) / price24hAgo) * 100;

        return {
            bitcoinData: dailyData,
            currentPrice: Math.round(currentPrice),
            priceChange24h: priceChange24h,
            volume24h: volume24h
        };

    } catch (error) {
        console.error("Erro ao buscar dados (Rate Limit Vercel):", error);
        
        // Retorna os dados de Fallback para o portfólio não quebrar!
        return {
            bitcoinData: [
                { date: "10/03", price: 61500 },
                { date: "11/03", price: 62800 },
                { date: "12/03", price: 61200 },
                { date: "13/03", price: 64100 },
                { date: "14/03", price: 65500 },
                { date: "15/03", price: 64900 },
                { date: "16/03", price: 67200 },
            ],
            currentPrice: 67200,
            priceChange24h: 3.54,
            volume24h: 42000000000
        };
    }
}