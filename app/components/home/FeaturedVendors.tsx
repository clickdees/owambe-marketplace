import { Link } from "react-router";

// Define the structure of the Vendor data we expect
interface Vendor {
  id: string;
  handle: string;
  displayName: {
    value: string;
  };
  logo?: { // Logo is optional
    reference: {
      image: {
        url: string;
        altText?: string;
      };
    };
  };
}

export default function FeaturedVendors({ vendors }: { vendors: Vendor[] }) {
  return (
    <section className="py-16 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-extrabold text-accent-purple dark:text-white mb-2">
              Featured Vendors
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Hand-picked professionals for premium party experiences.
            </p>
          </div>
          {/* <Link
            to="/vendors"
            className="text-primary font-bold hover:underline whitespace-nowrap"
          >
            View All Vendors
          </Link> */}
           <a className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="/vendors" data-discover="true">View All Vendors <span className="material-symbols-outlined">arrow_forward</span></a>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {vendors.map((vendor) => {
            const logoImage = vendor.logo?.reference.image;

            return (
              <Link
                key={vendor.id}
                // The link now goes to a future vendor profile page
                to={`/vendors/${vendor.handle}`}
                className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20 flex flex-col"
              >
                <div className="relative h-48 w-full flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-white/5">
                  {logoImage? (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      alt={logoImage.altText || vendor.displayName.value}
                      src={logoImage.url}
                    />
                  ) : (
                    // Fallback icon if no logo is set
                    <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">
                      storefront
                    </span>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors truncate">
                      {vendor.displayName.value}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Verified Professional
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                    <span className="text-primary font-bold text-sm">
                      View Profile
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}