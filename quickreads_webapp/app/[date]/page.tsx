"use client";
import NewsList from "@/components/News_list";

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
}

async function getArticles(date: string): Promise<Article[]> {
  try{
    const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/news_dated?date=${date}`, { next: { revalidate: 3600 } }); // Replace with your API
    if(res.status === 200){
      return res.json();
    }
    else{
      return [];
    }
  }
  catch(e){
    console.log(e);
    return []; // Return an empty array in case of error
  }
}

export default async function DatedNews({ params }: { params: { date: string } }) {
  let {date} = await params;
  date = date.trim();
  
  const articles = await getArticles(date);

  return <>
    <NewsList  articles={articles} date={date} />
  </>;
}