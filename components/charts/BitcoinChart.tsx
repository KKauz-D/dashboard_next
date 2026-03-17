"use client"

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ChartDataPoint } from "@/types"

// Adicionamos a 'currency' nas props
interface BitcoinChartProps {
    data: ChartDataPoint[];
    currency: string; 
}

export function BitcoinChart({ data, currency }: BitcoinChartProps) {
    const { resolvedTheme } = useTheme(); // Pega o tema real ('light' ou 'dark')
    const [mounted, setMounted] = useState(false);

    // Evita erro de hidratação (o servidor não sabe qual é o tema, só o navegador sabe)
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-full text-gray-500">Nenhum dado disponível.</div>;
    }

    // Se o componente ainda não montou no cliente, renderiza um espaço vazio para evitar piscar tela
    if (!mounted) {
        return <div className="h-full w-full"></div>;
    }

    // Variável simples para checar se é modo escuro
    const isDark = resolvedTheme === "dark";

    // Função local para formatar o dinheiro dentro do gráfico
    const formatChartCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency.toUpperCase(),
            maximumFractionDigits: 0 // No gráfico, geralmente tiramos os centavos para ficar mais limpo
        }).format(value);
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0}}>

                    {/* Linhas de grade */}
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        vertical={false} 
                        stroke={isDark ? "#374151" : "#b2b5b9ff"} 
                    />

                    {/* Eixo X (Datas) */}
                    <XAxis 
                        dataKey="date"
                        stroke={isDark ? "#9CA3AF" : "#42464eff"}
                        fontSize={12}
                        fontWeight="bolder"
                        tickLine={false}
                        axisLine={false} 
                    />

                    {/* Eixo Y (Preços) */}
                    <YAxis 
                        stroke={isDark ? "#9CA3AF" : "#42464eff"}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        fontWeight="bolder"
                        tickFormatter={(value) => formatChartCurrency(value)} 
                    />

                    <Tooltip 
                        contentStyle={{
                            backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                            border: isDark ? "1px solid #374151" : "1px solid #E5E7EB",
                            borderRadius: '8px',
                            color: isDark ? "#F3F4F6" : "#111827"
                        }}
                        itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }} 
                        
                        // 👇 Apenas altere a assinatura desta função
                        formatter={(value: any) => [
                            formatChartCurrency(Number(value) || 0),
                            'Preço'
                        ]}
                    />

                    {/* Linha Principal do gráfico */}
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: isDark ? "#1F2937" : "#FFFFFF" }}
                        activeDot={{ r: 6, fill: "#3B82F6", stroke: isDark ? "#FFFFFF" : "#111827" }}
                    />
            </LineChart>
        </ResponsiveContainer>
    )
}