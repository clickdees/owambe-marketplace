import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/products.$handle";
import { shopifyFetch, PRODUCT_PAGE_QUERY } from "~/shopify.server";

// 1. LOADER
export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  const data = await shopifyFetch(PRODUCT_PAGE_QUERY, { handle });

  if (!data.product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  return { product: data.product };
}

// 2. META
export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.product.title} | Owambe Market` },
    { name: "description", content: data?.product.descriptionHtml.substring(0, 160) },
  ];
}

// 3. COMPONENT
export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const images = product.images.nodes;
  const variants = product.variants.nodes;
  const productVendor = product.vendor
  const productVendorHandle = productVendor.toLowerCase().replace(/ /g, "-");
  // console.log("productVendorHandle: ", productVendorHandle);
  // State for selected package (Variant)
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  // Helper for currency
  const formatMoney = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  // Calculate totals
  const basePrice = parseFloat(selectedVariant.price.amount);
  const serviceFee = basePrice * 0.05; // 5% fee
  const total = basePrice + serviceFee;
  const currency = selectedVariant.price.currencyCode;

  return (
    <>
      <main className="max-w-[1280px] mx-auto px-6 lg:px-20 py-6 mb-20 lg:mb-0">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link to="/services" className="hover:text-primary">Services</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Hero Gallery */}
            <section className="space-y-4">
              <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[300px] md:h-[450px]">
                {/* Main Image */}
                <div className="col-span-3 row-span-2 relative rounded-xl overflow-hidden group bg-gray-100">
                  {images[0] ? (
                    <img 
                      className="w-full h-full object-cover" 
                      alt={images[0].altText || product.title} 
                      src={images[0].url} 
                    />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-6xl">image</span>
                     </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-sm filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Top Rated Pro</span>
                  </div>
                </div>

                {/* Secondary Images */}
                <div className="col-span-1 rounded-xl overflow-hidden relative group bg-gray-100">
                   {images[1] && (
                    <img className="w-full h-full object-cover" alt={images[1].altText} src={images[1].url} />
                   )}
                </div>
                <div className="col-span-1 rounded-xl overflow-hidden bg-gray-100">
                   {images[2] && (
                    <img className="w-full h-full object-cover" alt={images[2].altText} src={images[2].url} />
                   )}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-yellow-400 filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-bold">4.9</span>
                      <span className="text-slate-500">(128 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>Lagos, Nigeria</span>
                    </div>
                     <div className="flex items-center gap-1 text-slate-500">
                      <span className="material-symbols-outlined text-sm">storefront</span>
                      <Link to={`/vendors/${productVendorHandle}`}>
                        <span>{product.vendor}</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-slate-600">share</span>
                  </button>
                  <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-slate-600">favorite</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Service Description */}
            <section className="border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold mb-4">About this service</h3>
              <div 
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-4 bg-primary/5 rounded-xl text-center">
                  <span className="material-symbols-outlined text-primary mb-2">schedule</span>
                  <p className="text-xs font-bold text-slate-500 uppercase">Duration</p>
                  <p className="text-sm font-semibold">Per Event</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl text-center">
                  <span className="material-symbols-outlined text-primary mb-2">translate</span>
                  <p className="text-xs font-bold text-slate-500 uppercase">Languages</p>
                  <p className="text-sm font-semibold">English, Yoruba</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl text-center">
                  <span className="material-symbols-outlined text-primary mb-2">groups</span>
                  <p className="text-xs font-bold text-slate-500 uppercase">Capacity</p>
                  <p className="text-sm font-semibold">Flexible</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-xl text-center">
                  <span className="material-symbols-outlined text-primary mb-2">verified_user</span>
                  <p className="text-xs font-bold text-slate-500 uppercase">Verified</p>
                  <p className="text-sm font-semibold">Insurance Pro</p>
                </div>
              </div>
            </section>

            {/* Select a Package (Variants) */}
            <section className="border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold mb-6">Select a Package</h3>
              <div className="grid md:grid-cols-3 gap-6">
                
                {variants.map((variant) => {
                    const isSelected = selectedVariant.id === variant.id;
                    return (
                        <div 
                            key={variant.id}
                            onClick={() => setSelectedVariant(variant)}
                            className={`border rounded-xl p-6 transition-all flex flex-col cursor-pointer relative ${
                                isSelected 
                                ? "border-2 border-primary bg-primary/5 shadow-xl shadow-primary/10 scale-105 z-10" 
                                : "border-slate-200 hover:border-primary/50"
                            }`}
                        >
                            {isSelected && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    Selected
                                </div>
                            )}
                            
                            <div className="mb-4">
                                <h4 className="font-bold text-lg">{variant.title}</h4>
                            </div>
                            
                            <div className="text-2xl font-black mb-6 text-primary">
                                {formatMoney(variant.price.amount, variant.price.currencyCode)}
                            </div>
                            
                            <ul className="space-y-3 mb-8 flex-grow">
                                {/* Since Shopify variants don't have descriptions by default, 
                                    we use static placeholders or you could parse Metafields here */}
                                <li className="flex gap-2 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Full Service
                                </li>
                                <li className="flex gap-2 text-sm text-slate-600">
                                    <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                    Professional Setup
                                </li>
                            </ul>
                            
                            <button className={`w-full py-2 px-4 rounded-lg font-bold transition-all ${
                                isSelected 
                                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                                : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                            }`}>
                                {isSelected ? "Selected" : "Select"}
                            </button>
                        </div>
                    );
                })}

              </div>
            </section>

            {/* Reviews Section (Static for now) */}
            <section className="border-t border-slate-200 pt-8 pb-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Client Reviews</h3>
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-black text-xl">4.9</span>
                  <span className="text-slate-400 font-normal">/ 5.0</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Review Bars */}
                <div className="md:col-span-4 space-y-3">
                   {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <span className="text-xs font-bold w-4">{rating}</span>
                        <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: rating === 5 ? "90%" : rating === 4 ? "8%" : "0%" }}
                          ></div>
                        </div>
                      </div>
                   ))}
                </div>
                
                {/* Review Comments */}
                <div className="md:col-span-8 space-y-6">
                  <div className="border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">TA</div>
                        <div>
                          <h6 className="text-sm font-bold">Tunde Adebayo</h6>
                          <p className="text-[10px] text-slate-400 uppercase font-black">Wedding • Oct 2023</p>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 text-xs">
                         {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">DJ Zee made our wedding unforgettable. The energy was incredible!</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl shadow-primary/5 border border-primary/10">
                <h4 className="text-lg font-bold mb-6">Booking Summary</h4>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Selected Package</span>
                    <span className="font-bold truncate max-w-[150px]">{selectedVariant.title}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Base Price</span>
                    <span className="font-bold">{formatMoney(String(basePrice), currency)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Service Fee (5%)</span>
                    <span className="font-bold">{formatMoney(String(serviceFee), currency)}</span>
                  </div>
                  <div className="h-[1px] bg-slate-100"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total Estimate</span>
                    <span className="text-xl font-black text-primary">{formatMoney(String(total), currency)}</span>
                  </div>
                </div>
                {/* Inside the Right Column Sticky Sidebar */}
                <div className="space-y-3">
                  {/* CHANGE: Replaced <button> with <Link> */}
                  <Link
                    to={`/book/${product.handle}`}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined">calendar_today</span>
                    Book This Service
                  </Link>
                  <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    You won't be charged yet
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <span className="material-symbols-outlined text-green-600 text-sm">shield</span>
                        <p className="text-xs text-green-800">Booking protected by Owambe Secure Pay. Funds are held until service delivery.</p>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="material-symbols-outlined text-slate-600 text-sm">chat</span>
                        <div className="flex-grow">
                            <p className="text-xs font-bold">Have questions?</p>
                            <button className="text-xs text-primary font-bold hover:underline cursor-pointer">Message Vendor</button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer (Visible on small screens only) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-slate-200 p-4 z-50">
        <div className="flex items-center justify-between max-w-[1280px] mx-auto">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Total</p>
            <p className="text-xl font-black text-primary">
              {formatMoney(String(total), currency)}
            </p>
          </div>
          {/* CHANGE: Replaced <button> with <Link> */}
          <Link
            to={`/book/${product.handle}`}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}