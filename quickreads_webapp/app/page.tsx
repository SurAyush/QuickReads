"use server";
import NewsList from "@/components/news_list";

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
}

async function getArticles(): Promise<Article[]> {
  const res = await fetch("http://localhost:3000/api/all_news", { next: { revalidate: 3600 } }); // Replace with your API
  return res.json();
}
export default async function Home() {
  const articles = await getArticles();
  return <NewsList  articles={articles} />;
}