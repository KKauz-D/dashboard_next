import { NextResponse } from "next/server";
import { ChartDataPoint } from "@/types";
import { Bitcoin } from "lucide-react";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const coin = searchParams.get('coin') || 'bitcoin';

        const currency = searchParams.get('currency') || 'usd'; 

        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=7`,
            { 
                next: { revalidate: 120 } 
            }
        );

        if (!res.ok) {
            throw new Error('Falha ao buscar dados da CoinGecko');
        }

        const rawData = await res.json();

        // Simplificar Dados
        const formattedData: ChartDataPoint[] = rawData.prices.map((item: [number, number]) => {
            const date = new Date(item[0]);
            return {
                // "DD/MM"
                date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit'}),
                // Arredonda o preço
                price: Math.round(item[1]),
            }
        });

        // 1 ponto a cada 24 horas (aproximadamente a cada 24 índices).
        const dailyData = formattedData.filter((_, index) => index % 24 == 0);

        // Preço mais recente
        const currentPrice = Math.round(rawData.prices[rawData.prices.length - 1][1]);

        const volume24h = rawData.total_volumes[rawData.total_volumes.length - 1][1];
        const priceNow = rawData.prices[rawData.prices.length - 1][1];
        const price24hAgo = rawData.prices[rawData.prices.length - 25][1];
        const priceChange24h = ((priceNow - price24hAgo) / price24hAgo) * 100;

        // Retorna o JSON limpo e tipado para o front
        return NextResponse.json({
            bitcoinData: dailyData,
            currentPrice: currentPrice,
            priceChange24h: priceChange24h,
            volume24h: volume24h
        });
    } catch (error) {
        console.error("Erro na API Route:", error);

        return NextResponse.json({
            bitcoinData: [],
            currentPrice: 0,
            priceChange24h: 0,
            volume24h: 0
        }, { status: 500 });
    }
}