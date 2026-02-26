import { Link } from "react-router";

interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    nodes: {
      url: string;
      altText?: string;
    }[];
  };
}

export default function FeaturedVendors({ products }: { products: Product[] }) {
  // Helper to format currency
  const formatMoney = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  return (
    <section className="py-16 bg-white dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h3 className="text-3xl font-extrabold text-accent-purple dark:text-white mb-2">
              Featured Services
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Hand-picked professionals for premium party experiences.
            </p>
           </div>
          <a className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" href="/services" data-discover="true">Find More Services <span className="material-symbols-outlined">arrow_forward</span></a>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => {
            const image = product.images.nodes[0];
            const price = product.priceRange.minVariantPrice;

            return (
              <Link
                key={product.id}
                to={`/products/${product.handle}`}
                className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20 block"
              >
                <div className="relative h-48 overflow-hidden">
                  {image && (
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      alt={image.altText || product.title}
                      src={image.url}
                    />
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span
                      className="material-symbols-outlined text-accent-gold text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-bold text-black">
                      New
                    </span>
                  </div>
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
                    <span className="material-symbols-outlined text-sm">
                      storefront
                    </span>{" "}
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
      </div>
    </section>
  );
}