import { NextRequest, NextResponse } from "next/server";
import {query} from "@/lib/db";

export async function GET(request: NextRequest) {
    try{
        const body = await request.json();
        const date = body.date;
        const q = `SELECT id, heading AS title, tag AS category, summary AS description
                    FROM news_with_summary
                    WHERE DATE(timestamp) = $1;
        `;
        const articles = await query(q,[date]);
        return NextResponse.json(articles, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}