import { Link } from "react-router";
import type { Route } from "./+types/vendors";
import { shopifyFetch, ALL_VENDORS_QUERY } from "~/shopify.server";

// 1. LOADER
export async function loader() {
  const data = await shopifyFetch(ALL_VENDORS_QUERY);
  return { vendors: data.metaobjects.nodes };
}

// 2. META
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Our Vendors | Owambe Market" },
    { name: "description", content: "Meet the best event professionals in Nigeria." },
  ];
}

// 3. COMPONENT
export default function VendorsPage({ loaderData }: Route.ComponentProps) {
  const { vendors } = loaderData;

  return (
    <main className="bg-background-light dark:bg-background-dark min-h-screen">
      
      {/* Header Section */}
      <section className="bg-primary/5 dark:bg-primary/10 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Meet Our <span className="text-primary">Professionals</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From award-winning DJs to luxury decorators, browse the full list of verified vendors ready to make your Owambe unforgettable.
          </p>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        
        {vendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {vendors.map((vendor: any) => {
              // Extract Image safely
              const imageUrl = vendor.logo?.reference?.image?.url;
              const altText = vendor.logo?.reference?.image?.altText || vendor.displayName?.value;
              const name = vendor.displayName?.value || "Vendor";

              return (
                <Link 
                  key={vendor.id}
                  // If you haven't built the detail page yet, you can link to search filter
                  // to={`/search?q=${encodeURIComponent(name)}`} 
                  // OR link to the future detail page:
                   to={`/vendors/${vendor.handle}`}
                  className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all flex flex-col items-center text-center"
                >
                  <div className="relative w-32 h-32 mb-6 rounded-full p-1 border-2 border-dashed border-gray-300 group-hover:border-primary transition-colors">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={altText}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary font-bold text-3xl bg-primary/10">
                          {name.substring(0, 1)}
                        </div>
                      )}
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full shadow-lg" title="Verified Vendor">
                      <span className="material-symbols-outlined text-sm block">verified</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    {name}
                  </h3>

                  {/* Placeholder for Bio/Location if you add them later */}
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                     {vendor.location?.value || "Lagos, Nigeria"}
                  </p>

                  <button className="mt-auto text-primary font-bold text-sm bg-primary/5 hover:bg-primary hover:text-white px-6 py-2 rounded-full transition-all">
                    View Profile
                  </button>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">groups</span>
            <h3 className="text-xl font-bold text-slate-500">No vendors found.</h3>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 text-center">
         <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-4">Are you an event professional?</h2>
            <p className="text-slate-500 mb-8">Join our network and start getting booked for premium events today.</p>
            <Link to="/become-vendor" className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors">
                List Your Business
            </Link>
         </div>
      </section>
    </main>
  );
}