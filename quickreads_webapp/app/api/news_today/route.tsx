import { NextRequest, NextResponse } from "next/server";
import {query} from "@/lib/db";

export async function GET(request: NextRequest) {
    try{
        const q = `SELECT id, heading as title, tag as category, summary as description 
            FROM news_with_summary
            WHERE timestamp>= NOW() - INTERVAL '1 day';
        `;
        const articles = await query(q);
        return NextResponse.json(articles, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}