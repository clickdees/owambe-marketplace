import { Form, Link, useNavigation, useSubmit } from "react-router";
import type { Route } from "./+types/search";
import { shopifyFetch, SEARCH_QUERY } from "~/shopify.server";

// 1. LOADER: Runs on server, fetches results
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || ""; // Get search term

  // If empty query, return empty list
  if (!q) return { products: [], q };

  // Search logic: Append '*' for fuzzy matching if needed, 
  // but usually passing the raw string works best with Shopify's relevance engine.
  const data = await shopifyFetch(SEARCH_QUERY, { query: q });

  return { products: data.products.nodes, q };
}

// 2. META
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `Search: ${data?.q || "Services"} | Owambe Market` },
  ];
}

// 3. COMPONENT
export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { products, q } = loaderData;
  const navigation = useNavigation();
  const submit = useSubmit();
  
  const isSearching = navigation.state === "loading" && navigation.location.pathname === "/search";

  // Currency helper
  const formatMoney = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark py-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* SEARCH HEADER */}
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-3xl font-black text-accent-purple dark:text-white mb-6">
            Find Your Service
          </h1>
          
          {/* Main Search Bar */}
          <Form 
            action="/search" 
            className="w-full max-w-2xl relative flex items-center shadow-xl shadow-primary/10 rounded-2xl overflow-hidden bg-white dark:bg-slate-800"
          >
            <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
            <input 
                name="q"
                defaultValue={q}
                placeholder="Search for DJs, MCs, Halls..." 
                className="w-full py-4 pl-12 pr-4 bg-transparent border-none focus:ring-0 text-lg outline-none"
                // Auto-submit on clear or typing (optional debouncing could be added)
                type="search"
            />
            <button type="submit" className="bg-primary text-white font-bold px-8 py-4 hover:bg-primary/90 transition-all cursor-pointer">
                {isSearching ? "..." : "Search"}
            </button>
          </Form>
        </div>

        {/* RESULTS STATUS */}
        <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                {products.length > 0 ? (
                    `Found ${products.length} results for "${q}"`
                ) : q ? (
                    `No results found for "${q}"`
                ) : (
                    "Enter a term to start searching"
                )}
            </h2>
        </div>

        {/* RESULTS GRID */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => {
              const image = product.images.nodes[0];
              const price = product.priceRange.minVariantPrice;

              return (
                <Link
                  key={product.id}
                  to={`/products/${product.handle}`}
                  className="group bg-white dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20 block"
                >
                  <div className="relative h-48 overflow-hidden">
                    {image ? (
                        <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        alt={image.altText || product.title}
                        src={image.url}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                             <span className="material-symbols-outlined text-4xl">image</span>
                        </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                        Verified
                      </span>
                    </div>
                    <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                      {product.title}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                      <span className="material-symbols-outlined text-sm">storefront</span>
                      {product.vendor}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">
                          Starting at
                        </p>
                        <p className="font-extrabold text-accent-purple dark:text-white">
                          {formatMoney(price.amount, price.currencyCode)}
                        </p>
                      </div>
                      <span className="text-primary font-bold text-sm hover:underline">
                        Book Now
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
             // EMPTY STATE
             q && (
                <div className="text-center py-20 opacity-60">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">manage_search</span>
                    <p className="text-xl font-bold text-slate-500">We couldn't find matches for "{q}"</p>
                    <p className="text-sm">Try searching for "DJ", "Catering", or "Lagos"</p>
                </div>
             )
        )}
      </div>
    </main>
  );
}