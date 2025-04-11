import NewsList from "@/components/News_list";

export const dynamic = "force-dynamic";

interface Article {
  id: number;
  category: string;
  title: string;
  description: string;
}

async function getArticles(): Promise<Article[]> {
  try{
    const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/news_today`, { next: { revalidate: 3600 } }); // Replace with your API
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

export default async function Home() {
  const articles = await getArticles();
  return <>
    <NewsList  articles={articles} date={null}/>
  </>;
}