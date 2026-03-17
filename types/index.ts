export interface ChartDataPoint {
    date: string;
    price: number;
}

export interface DashboardDataResponse {
    bitcoinData: ChartDataPoint[];
    currentPrice: number;
    priceChange24h: number;
    volume24h: number;
}