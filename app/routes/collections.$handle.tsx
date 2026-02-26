import { Link } from "react-router";
import type { Route } from "./+types/collections.$handle";
import { shopifyFetch, COLLECTION_PAGE_QUERY } from "~/shopify.server";

// LOADER app/routes/collections.$handle.tsx

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  const data = await shopifyFetch(COLLECTION_PAGE_QUERY, { handle });

  if (!data.collection) {
    throw new Response("Collection Not Found", { status: 404 });
  }

  return {
    collection: data.collection,
    // Pass the currency code to the frontend
    currencyCode: data.shop.paymentSettings.currencyCode, 
  };
}

// 2. META: Dynamic Page Title
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.collection.title} | Owambe Market` },
    { name: "description", content: data?.collection.description || "Browse our services" },
  ];
}

export default function CollectionPage({ loaderData }: Route.ComponentProps) {
  const { collection, currencyCode } = loaderData; // Destructure currencyCode
  const products = collection.products.nodes;
  

  // 1. Get the Symbol (e.g., "₦" or "$")
  // We format "0" and extract the symbol part
  const currencySymbol = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currencyCode,
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value || currencyCode;

  // 2. Helper to format full prices (e.g., ₦250,000)
  const formatMoney = (amount: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currencyCode, // Use dynamic currency
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  return (
    <>
      {/* Sticky Search Strip */}
      <section className="sticky top-[73px] z-40 bg-white dark:bg-background-dark border-b border-primary/10 shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap items-center gap-3">
          {/* Category Dropdown (Visual Only for now) */}
          <div className="flex-1 min-w-[200px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              category
            </span>
            <select 
              defaultValue={collection.title}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary/10 bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium outline-none"
            >
              <option value={collection.title}>{collection.title}</option>
              <option>All Services</option>
            </select>
          </div>

          {/* Location Input */}
          <div className="flex-1 min-w-[200px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              location_on
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary/10 bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium outline-none placeholder:text-slate-400"
              placeholder="Lagos, Nigeria"
              type="text"
            />
          </div>

          {/* Date Input */}
          <div className="flex-1 min-w-[200px] relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              calendar_month
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-primary/10 bg-primary/5 dark:bg-primary/10 focus:ring-2 focus:ring-primary focus:border-primary text-sm font-medium outline-none text-slate-500"
              type="date"
            />
          </div>

          {/* Search Button */}
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer">
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Left Sidebar Filters */}
        <aside className="w-64 shrink-0 hidden lg:block">
          <div className="sticky top-40 space-y-8">
            
               {/* PRICE FILTER SECTION */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                {/* Dynamic Label */}
                Price Range ({currencySymbol}) 
              </h3>
              <div className="px-2">
                <input
                  className="w-full accent-primary cursor-pointer"
                  max="1000000"
                  min="50000"
                  step="10000"
                  type="range"
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                  {/* Dynamic Values */}
                  <span>{currencySymbol}100</span>
                  <span>{currencySymbol}10k</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                Vendor Rating
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="rounded border-primary/30 text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <div className="flex text-accent-gold">
                    {[1, 2, 3, 4, 5].map((i) => (
                       <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary">
                    4.5 & up
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    className="rounded border-primary/30 text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <div className="flex text-accent-gold">
                    {[1, 2, 3, 4].map((i) => (
                       <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                    <span className="material-symbols-outlined text-sm">star</span>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-primary">
                    4.0 & up
                  </span>
                </label>
              </div>
            </div>

            {/* Service Type Filter (Visual Only) */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                Service Type
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      defaultChecked
                      className="rounded border-primary/30 text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {collection.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">({products.length})</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/10">
              <button className="w-full border border-primary text-primary hover:bg-primary/5 font-bold py-2 rounded-lg text-sm transition-colors cursor-pointer">
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {collection.title}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {products.length} professional vendors found for your Owambe
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                Sort by:
              </label>
              <select className="border-primary/10 bg-white dark:bg-background-dark rounded-lg text-sm font-bold focus:ring-primary outline-none py-2 px-3 cursor-pointer">
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>
          </div>

          {/* Vendor Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product: any) => {
                const image = product.images.nodes[0];
                const price = product.priceRange.minVariantPrice;
                  const productVendor = product.vendor
                  const productVendorHandle = productVendor.toLowerCase().replace(/ /g, "-");

                return (
                  <div
                    key={product.id}
                    className="group bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-primary/5 flex flex-col h-full"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {image ? (
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={image.altText || product.title}
                          src={image.url}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl text-gray-400">image</span>
                        </div>
                      )}
                      
                      <div className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm">
                        Verified
                      </div>
                      <button className="absolute top-3 right-3 p-1.5 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-full text-red-500 hover:bg-white transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-sm font-bold">
                          favorite
                        </span>
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/products/${product.handle}`} className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors hover:underline line-clamp-1">
                          {product.title}
                        </Link>
                        <div className="flex items-center gap-1 text-accent-gold shrink-0">
                          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                            star
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            5.0
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-xs font-bold text-primary mb-3 uppercase tracking-tighter line-clamp-1">
                         {product.vendor}
                      </p>
                      
                      <div className="flex items-center gap-1 text-slate-500 mb-4">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        <span className="text-xs font-medium">Lagos, Nigeria</span>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-primary/5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Starting from
                          </p>
                          <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                            {formatMoney(price.amount)}
                          </p>
                        </div>
                        <Link to={`/vendors/${productVendorHandle}`} className="bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-xl">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <h3 className="text-xl font-bold">No services found</h3>
                <p className="text-gray-500">Try checking back later or browse other categories.</p>
            </div>
          )}

          {/* Pagination (Visual UI for now) */}
          {products.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                className="p-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                disabled
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm cursor-pointer">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg bg-white dark:bg-background-dark border border-primary/10 hover:border-primary text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg bg-white dark:bg-background-dark border border-primary/10 hover:border-primary text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer">
                  3
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">
                  ...
                </span>
                <button className="w-10 h-10 rounded-lg bg-white dark:bg-background-dark border border-primary/10 hover:border-primary text-slate-600 dark:text-slate-300 font-bold text-sm transition-colors cursor-pointer">
                  12
                </button>
              </div>
              <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors text-primary cursor-pointer">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}