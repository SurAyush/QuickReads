import { NextRequest, NextResponse } from "next/server";
import {query} from "@/lib/db";

export async function GET(request: NextRequest) {
    try{
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");

        if (!date) {
            return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
        }

        if (date === "favicon.ico") {
            return NextResponse.json({ error: "Invalid date" }, { status: 400 });
        }
        
        if (!date || isNaN(Date.parse(date))) {
            return NextResponse.json({ error: "Invalid date" }, { status: 400 });
        }

        console.log("Fetching articles for date:", date);

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