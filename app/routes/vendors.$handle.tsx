import { Link } from "react-router";
import type { Route } from "./+types/vendors.$handle";
import { shopifyFetch, VENDOR_PROFILE_QUERY, VENDOR_PRODUCTS_QUERY } from "~/shopify.server";

// 1. LOADER
export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;

  // A. Fetch Vendor Profile (Metaobject)
  const profileData = await shopifyFetch(VENDOR_PROFILE_QUERY, { handle });
  
  if (!profileData.metaobject) {
    throw new Response("Vendor Not Found", { status: 404 });
  }

  const vendor = profileData.metaobject;
  const vendorName = vendor.displayName?.value;

  // B. Fetch Products belonging to this Vendor
  // We use the 'vendor:' filter in the search query
  const productData = await shopifyFetch(VENDOR_PRODUCTS_QUERY, { 
    query: `vendor:'${vendorName}'` 
  });

  return { 
    vendor, 
    services: productData.products.nodes 
  };
}

// 2. META
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.vendor.displayName?.value} | Owambe Market` },
    { name: "description", content: data?.vendor.bio?.value || "Book this professional vendor." },
  ];
}

// 3. COMPONENT
export default function VendorProfile({ loaderData }: Route.ComponentProps) {
  const { vendor, services } = loaderData;

  // Extract fields
  const name = vendor.displayName?.value;
  const bio = vendor.bio?.value || "Professional event vendor delivering excellence for your Owambe.";
  const location = vendor.location?.value || "Lagos, Nigeria";
  const logoUrl = vendor.logo?.reference?.image?.url;

  // Collect all images from products to create a "Portfolio"
  const portfolioImages = services.flatMap((p: any) => p.images.nodes).slice(0, 6);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-primary/10 p-8 mb-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
          <div className="relative">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-gray-100">
              {logoUrl ? (
                <img alt={name} className="w-full h-full object-cover" src={logoUrl} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 border-4 border-white dark:border-background-dark">
              <span className="material-symbols-outlined text-sm font-bold">verified</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <h2 className="text-4xl font-bold">{name}</h2>
              <span className="px-3 py-1 bg-primary text-white text-xs font-black rounded-full uppercase tracking-widest shadow-sm">Top Rated</span>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold">{services[0]?.productType || "Event Professional"} • {location}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-slate-800 dark:text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-accent-gold text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-bold text-base">4.9</span>
                <span className="text-gray-500">(120 reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                <span className="font-medium">Identity Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
                <span className="font-medium">10+ Years Experience</span>
              </div>
            </div>
            
            <p className="text-slate-700 dark:text-white/70 text-lg leading-relaxed max-w-3xl">
              {bio}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/30 hover:bg-primary-light hover:-translate-y-0.5 transition-all cursor-pointer">
                <span className="material-symbols-outlined">mail</span>
                Inquire for Bookings
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white dark:bg-white/10 border-2 border-gray-100 dark:border-primary/20 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="material-symbols-outlined">share</span>
                Share Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY NAV */}
      <nav className="flex justify-center border-b-2 border-gray-100 dark:border-primary/10 mb-12 sticky top-16 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md z-40">
        <a className="px-8 py-4 text-sm font-bold border-b-4 border-primary text-primary dark:text-white" href="#about">About</a>
        <a className="px-8 py-4 text-sm font-bold border-b-4 border-transparent text-gray-500 hover:text-primary transition-all" href="#services">Services</a>
        <a className="px-8 py-4 text-sm font-bold border-b-4 border-transparent text-gray-500 hover:text-primary transition-all" href="#portfolio">Portfolio</a>
        <a className="px-8 py-4 text-sm font-bold border-b-4 border-transparent text-gray-500 hover:text-primary transition-all" href="#reviews">Reviews</a>
      </nav>

      <div className="space-y-20">
        
        {/* 3. ABOUT SECTION */}
        <section id="about" className="scroll-mt-32">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Vendor Story
          </h3>
          <div className="prose prose-purple dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-lg leading-relaxed space-y-4">
            <p>{bio}</p>
            <p>What sets us apart is our commitment to excellence. We don't just provide a service; we create an experience tailored to your venue and vision.</p>
          </div>
        </section>

        {/* 4. SERVICES SECTION (Products) */}
        <section id="services" className="scroll-mt-32">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Professional Services
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {services.map((service: any) => (
              <div key={service.id} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-primary/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  {service.images.nodes[0] ? (
                    <img 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        src={service.images.nodes[0].url} 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400">category</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold uppercase">{service.productType}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-bold text-lg mb-2 line-clamp-1">{service.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{service.description || "Premium service for your event."}</p>
                  <Link 
                    to={`/products/${service.handle}`}
                    className="mt-auto w-full py-3 bg-primary/10 text-primary hover:bg-primary hover:text-white text-sm font-bold rounded-xl transition-all text-center block"
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* 5. PORTFOLIO SECTION (Aggregated Images) */}
        {portfolioImages.length > 0 && (
            <section id="portfolio" className="scroll-mt-32">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Portfolio Highlights
                </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {portfolioImages.map((img: any, idx: number) => (
                    <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 dark:border-white/5 relative group cursor-zoom-in shadow-md">
                        <img 
                            alt={img.altText || "Portfolio"} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                            src={img.url} 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-3xl">fullscreen</span>
                        </div>
                    </div>
                ))}
            </div>
            </section>
        )}

        {/* 6. REVIEWS SECTION (Static for now) */}
        <section id="reviews" className="scroll-mt-32">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Client Satisfaction
          </h3>
          {/* ... (Keep the reviews HTML you provided, it's mostly static/visual) ... */}
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-primary/10 p-10 mb-10 shadow-sm">
                {/* Visual Summary */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-4 text-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/10 pb-8 md:pb-0">
                        <div className="text-7xl font-black text-primary dark:text-white mb-3 tracking-tighter">4.9</div>
                        <div className="flex justify-center text-accent-gold mb-3">
                            {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                        </div>
                        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">120 Verified Reviews</p>
                    </div>
                    {/* Bars */}
                    <div className="md:col-span-8 space-y-4">
                        {[5,4,3,2,1].map((rating) => (
                            <div key={rating} className="flex items-center gap-6">
                                <span className="text-sm font-bold w-14 text-slate-900 dark:text-white">{rating} Star</span>
                                <div className="flex-1 h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: rating === 5 ? '85%' : rating === 4 ? '10%' : '2%' }}></div>
                                </div>
                                <span className="text-sm text-gray-500 w-10 text-right font-bold">{rating === 5 ? 102 : rating === 4 ? 12 : 2}</span>
                            </div>
                        ))}
                    </div>
                </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5 cursor-pointer">
              View All 120 Client Reviews
            </button>
          </div>
        </section>

        {/* 7. BOTTOM CTA */}
        <section className="bg-primary rounded-3xl p-12 text-center text-white shadow-2xl shadow-primary/20">
          <h3 className="text-3xl font-bold mb-4">Ready to elevate your event?</h3>
          <p className="text-primary-light/20 text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contact {name} today to discuss your vision and see how we can make your special day truly legendary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-primary font-black rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined">send</span>
              Send an Inquiry
            </button>
            <button className="px-10 py-4 border-2 border-white/30 text-white font-black rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined">download</span>
              Download Media Kit
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}