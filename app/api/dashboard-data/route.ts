import { NextResponse } from "next/server";
import { getCryptoData } from "@/lib/data";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coin = searchParams.get('coin') || 'bitcoin';
    const currency = searchParams.get('currency') || 'usd'; 

    const data = await getCryptoData(coin, currency);

    return NextResponse.json(data);
}