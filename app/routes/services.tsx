import { Link } from "react-router";
import type { Route } from "./+types/services";
import { shopifyFetch, ALL_SERVICES_QUERY } from "~/shopify.server";

// 1. LOADER
export async function loader() {
  const data = await shopifyFetch(ALL_SERVICES_QUERY);
  return { services: data.collections.nodes };
}

// 2. META
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Browse Categories | Owambe Market" },
    { name: "description", content: "Discover top-rated vendors for your next celebration." },
  ];
}

// 3. COMPONENT
export default function ServicesPage({ loaderData }: Route.ComponentProps) {
  const { services } = loaderData;

  // Placeholder niche categories (You can fetch these from tags/collections later)
  const nicheCategories = [
    "Cocktail Bars", "Small Chops", "Security & Bouncers", 
    "Souvenir Packaging", "Ushers & Servers", "360 Photo Booth", 
    "Catering Services", "Traditional Drummers"
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
      
      {/* Hero Section */}
      <div className="mb-12">
        <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-slate-900 dark:text-white">
          Browse Service Categories
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Discover top-rated vendors for your next celebration. Everything you need for the perfect Owambe event in one curated marketplace.
        </p>
      </div>

      {/* Categories Grid (Dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {services.length > 0 ? (
          services.map((service: any) => (
            <Link 
              key={service.id}
              to={`/collections/${service.handle}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 block"
            >
              {/* Background Image */}
              {service.image ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url('${service.image.url}')` }}
                  aria-label={service.image.altText || service.title}
                ></div>
              ) : (
                <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                   <span className="material-symbols-outlined text-6xl text-slate-400">category</span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {service.title}
                </h3>
                {/* Fallback description if meta description is empty */}
                <p className="text-white/80 text-sm line-clamp-1">
                  {service.description || "Professional Services"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          // Empty State
          <div className="col-span-full py-20 text-center bg-slate-50 dark:bg-white/5 rounded-xl border border-dashed border-slate-200">
             <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">search_off</span>
             <p className="text-slate-500">No categories found right now.</p>
          </div>
        )}
      </div>

      {/* Explore More Niche Categories (Hardcoded Chips for now) */}
      <div className="border-t border-primary/10 pt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          Explore More Niche Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {nicheCategories.map((cat, index) => (
            <Link 
              key={index}
              to={`/search?q=${encodeURIComponent(cat)}`} // Link to search
              className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full text-sm font-semibold text-primary transition-all cursor-pointer"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}