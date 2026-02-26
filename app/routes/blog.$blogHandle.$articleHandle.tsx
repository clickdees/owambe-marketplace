import { Link } from "react-router";
import type { Route } from "./+types/blog.$blogHandle.$articleHandle";
import { shopifyFetch, ARTICLE_QUERY } from "~/shopify.server";

// 1. LOADER: Fetch the specific article
export async function loader({ params }: Route.LoaderArgs) {
  const { blogHandle, articleHandle } = params;
  
  const data = await shopifyFetch(ARTICLE_QUERY, { blogHandle, articleHandle });
  
  if (!data.blog?.articleByHandle) {
    throw new Response("Article Not Found", { status: 404 });
  }

  return { article: data.blog.articleByHandle };
}

// 2. META: SEO Title
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.article.title} | Owambe Market Blog` },
  ];
}

// 3. COMPONENT
export default function ArticlePage({ loaderData }: Route.ComponentProps) {
  const { article } = loaderData;

  // Format Date
  const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate generic read time based on word count
  const wordCount = article.contentHtml.split(" ").length;
  const readTime = Math.ceil(wordCount / 200); // 200 words per minute

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 font-display">
      
      {/* Minimalist Sticky Header (In-page navigation) */}
      <header className="sticky top-0 z-50 border-b border-primary/10 px-6 py-3 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary">
               <span className="material-symbols-outlined text-3xl">celebration</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden md:block">Owambe Marketplace</h1>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium">
              <Link to="/collections" className="hover:text-primary transition-colors">Marketplace</Link>
              <Link to="/search" className="hover:text-primary transition-colors">Find Vendors</Link>
              <Link to="/blog" className="hover:text-primary transition-colors text-primary font-bold">Inspiration</Link>
            </div>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 hidden md:block"></div>
            <Link to="/search" className="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-primary">search</Link>
          </div>
        </div>
        {/* Reading Progress Bar (Visual Only for now) */}
        {/* <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-[35%] transition-all duration-300"></div> */}
      </header>

      <main className="w-full">
        {/* Hero Image */}
        <div className="w-full max-w-6xl mx-auto mt-8 px-4">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-2xl bg-slate-200">
            {article.image ? (
                <img 
                    src={article.image.url} 
                    alt={article.image.altText || article.title} 
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-6xl">article</span>
                </div>
            )}
          </div>
          {article.image?.altText && (
             <p className="text-center text-sm italic text-slate-500 mt-4 font-display">
                {article.image.altText}
             </p>
          )}
        </div>

        {/* Article Content */}
        <article className="max-w-[720px] mx-auto px-6 py-12">
          
          {/* Title Section */}
          <header className="mb-12">
            <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-8 font-display">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between py-6 border-y border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden border-2 border-primary/20 bg-slate-100 flex items-center justify-center text-primary font-bold text-xl">
                  {/* Avatar or Initials */}
                  {article.authorV2?.name ? article.authorV2.name.substring(0,2).toUpperCase() : "OW"}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{article.authorV2?.name || "Owambe Team"}</span>
                    <button className="text-primary text-sm font-bold hover:underline cursor-pointer">Follow</button>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    <span>{date}</span>
                    <span className="mx-1">•</span>
                    <span>{readTime} min read</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 text-slate-400">
                <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">share</button>
                <button className="material-symbols-outlined hover:text-primary transition-colors cursor-pointer">bookmark</button>
              </div>
            </div>
          </header>

          {/* Body Text (Rendered from HTML) */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200"
            // This renders the HTML content from Shopify
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Author Footer */}
          <footer className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="bg-primary/5 rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="size-24 rounded-full overflow-hidden flex-shrink-0 bg-white border border-slate-200 flex items-center justify-center text-primary text-3xl font-bold">
                 {article.authorV2?.name ? article.authorV2.name.substring(0,2).toUpperCase() : "OW"}
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl font-bold mb-2">Written by {article.authorV2?.name || "Owambe Team"}</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Event architect and cultural consultant bringing you the best insights from the Nigerian hospitality industry.
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition-all cursor-pointer">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </footer>

        </article>
      </main>

      {/* Floating Action Bar (Mobile/Tablets) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 shadow-2xl border border-primary/10 rounded-full px-6 py-3 flex items-center gap-8 z-50">
        <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-sm font-bold">1.2k</span>
        </button>
        <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span className="text-sm font-bold">84</span>
        </button>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
        <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer">bookmark</button>
        <button className="material-symbols-outlined text-slate-600 dark:text-slate-400 hover:text-primary cursor-pointer">share</button>
      </div>

    </div>
  );
}