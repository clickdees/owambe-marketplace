import { Link } from "react-router";
import type { Route } from "./+types/blog";
import { shopifyFetch, BLOG_QUERY } from "~/shopify.server";

// 1. LOADER: Fetch Articles
export async function loader() {
  const data = await shopifyFetch(BLOG_QUERY);
  return { articles: data.articles.nodes };
}

// 2. META
export function meta({}: Route.MetaArgs) {
  return [
    { title: "OwambeMarket Blog | Cultural Insights & Planning" },
    { name: "description", content: "Discover the secrets behind Nigeria's most spectacular celebrations." },
  ];
}

// 3. COMPONENT
export default function Blog({ loaderData }: Route.ComponentProps) {
  const { articles } = loaderData;

  // Split articles: First one is "Featured", rest are "Grid"
  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <div className="layout-container flex h-full grow flex-col">

        <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-10">
          
          {/* Featured Section */}
          {featuredArticle && (
            <section className="mb-16">
              <Link 
                to={`/blog/${featuredArticle.blog.handle}/${featuredArticle.handle}`}
                className="group relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-[21/9] flex flex-col justify-end block"
              >
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ 
                        backgroundImage: `linear-gradient(0deg, rgba(25, 16, 34, 0.9) 0%, rgba(25, 16, 34, 0.3) 50%, rgba(25, 16, 34, 0) 100%), url("${featuredArticle.image?.url}")` 
                    }}
                ></div>
                <div className="relative p-8 md:p-12 lg:w-2/3">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest">
                    Featured Story
                  </span>
                  <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-sm">
                    {featuredArticle.title}
                  </h1>
                  <p className="text-slate-200 text-lg md:text-xl font-normal leading-relaxed mb-6 line-clamp-2">
                    {featuredArticle.excerpt || "Read the latest insights from our expert team."}
                  </p>
                  <button className="flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-lg font-bold text-base hover:bg-slate-100 transition-colors shadow-xl cursor-pointer">
                    Read Full Article
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </Link>
            </section>
          )}

          {/* Filter & Category Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-primary/10 pb-6 mb-10 gap-6">
            <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar pb-2 md:pb-0">
              <button className="px-6 py-2 rounded-full bg-primary text-white text-sm font-semibold whitespace-nowrap cursor-pointer">All Topics</button>
              {["Planning Tips", "Fashion", "Music & Sound", "Cuisine", "Culture"].map((tag) => (
                <button 
                    key={tag}
                    className="px-6 py-2 rounded-full bg-primary/5 dark:bg-primary/20 text-primary dark:text-primary hover:bg-primary/10 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer"
                >
                    {tag}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
              <select className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-900 dark:text-slate-100 cursor-pointer">
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Trending</option>
              </select>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            
            {gridArticles.map((article: any) => (
              <Link 
                key={article.id} 
                to={`/blog/${article.blog.handle}/${article.handle}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-slate-200 dark:bg-slate-800">
                  {article.image ? (
                      <div 
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                        style={{ backgroundImage: `url("${article.image.url}")` }}
                      ></div>
                  ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
                          <span className="material-symbols-outlined text-4xl">article</span>
                      </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest">
                    {article.tags[0] || "Blog"}
                  </span>
                  <h3 className="text-2xl font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base line-clamp-2">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <div className="size-8 rounded-full bg-primary/20 overflow-hidden flex items-center justify-center text-primary font-bold text-xs">
                        {/* If author has no image, use initials */}
                        {article.authorV2?.name ? article.authorV2.name.substring(0,2).toUpperCase() : "OW"}
                    </div>
                    <div className="text-xs">
                      <p className="font-bold">{article.authorV2?.name || "Owambe Team"}</p>
                      <p className="text-slate-500">{formatDate(article.publishedAt)}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>

          {/* Pagination (Visual) */}
          <div className="mt-20 flex justify-center items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-lg border border-primary/20 text-primary hover:bg-primary/5 cursor-pointer">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold cursor-pointer">1</button>
              <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/5 text-slate-600 cursor-pointer">2</button>
              <button className="size-10 flex items-center justify-center rounded-lg hover:bg-primary/5 text-slate-600 cursor-pointer">3</button>
              <span className="px-2 text-slate-400">...</span>
            </div>
            <button className="size-10 flex items-center justify-center rounded-lg border border-primary/20 text-primary hover:bg-primary/5 cursor-pointer">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

        </main>

        {/* Newsletter Section */}
        <section className="bg-primary/5 dark:bg-primary/10 py-16 px-6 mt-20">
          <div className="max-w-[800px] mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Get Owambe Inspiration Delivered</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Join 15,000+ planners and event lovers. We send the best tips and culture stories once a week.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                className="flex-1 rounded-lg border-primary/20 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3" 
                placeholder="Enter your email" 
                type="email" 
              />
              <button className="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}