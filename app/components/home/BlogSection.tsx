import { Link } from "react-router";

interface Article {
  id: string;
  title: string;
  handle: string;
  publishedAt: string;
  excerpt?: string;
  tags: string[];
  blog: {
    handle: string;
  };
  authorV2?: {
    name: string;
  };
  image?: {
    url: string;
    altText?: string;
  };
}

export default function BlogSection({ articles }: { articles: Article[] }) {
  // If no articles exist in Shopify, hide the section
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 bg-white dark:bg-background-dark/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-3xl font-extrabold text-accent-purple dark:text-white mb-2">
              Latest from Owambe Life
            </h3>
            <p className="text-gray-500">
              Tips, trends, and stories from the heart of Nigerian celebrations.
            </p>
          </div>
          <Link
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
            to="/blog"
          >
            Read All Articles{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => {
            // Format the date (e.g., Oct 24, 2023)
            const date = new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric", 
                year: "numeric"
            });

            return (
              <Link
                key={article.id}
                to={`/blog/${article.blog.handle}/${article.handle}`}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 bg-gray-100">
                  {article.image ? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={article.image.altText || article.title}
                      src={article.image.url}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl">article</span>
                    </div>
                  )}
                  
                  {/* Show the first tag as the category badge */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="absolute top-4 left-4 bg-accent-gold text-accent-purple font-bold px-3 py-1 rounded text-xs">
                      {article.tags[0]}
                    </div>
                  )}
                </div>

                <h4 className="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                  {article.excerpt || "Click to read more about this topic..."}
                </p>
                
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {article.authorV2?.name ? article.authorV2.name.substring(0,2).toUpperCase() : "OW"}
                  </div>
                  <span className="text-xs font-bold text-gray-400">
                    By {article.authorV2?.name || "Team"} • {date}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}