import { useState } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router"; // Added useLocation
import type { Route } from "./+types/book.$handle";
import { shopifyFetch, PRODUCT_PAGE_QUERY } from "~/shopify.server";

// Define the shape of our booking data
export type BookingContextType = {
  bookingData: {
    date: string;
    location: string;
    eventType: string;
    notes: string;
  };
  setBookingData: React.Dispatch<React.SetStateAction<{
    date: string;
    location: string;
    eventType: string;
    notes: string;
  }>>;
  product: any; // The Shopify product
};

export async function loader({ params }: Route.LoaderArgs) {
  const { handle } = params;
  const data = await shopifyFetch(PRODUCT_PAGE_QUERY, { handle });
  if (!data.product) throw new Response("Not Found", { status: 404 });
  return { product: data.product };
}

export default function BookingLayout({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData;
  const location = useLocation();

  // 1. Shared State for the Booking Flow
  const [bookingData, setBookingData] = useState({
    date: "",
    location: "",
    eventType: "Wedding",
    notes: ""
  });

  // Determine active step based on URL
  const isReviewStep = location.pathname.includes("/review");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Progress Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-center max-w-2xl mx-auto mb-4">
          
          {/* Step 1 Indicator */}
          <div className={`flex flex-col items-center gap-2 ${!isReviewStep ? 'group' : 'opacity-50'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-lg ${!isReviewStep ? 'bg-primary text-white shadow-primary/20' : 'bg-green-500 text-white'}`}>
              <span className="material-symbols-outlined text-xl">{isReviewStep ? "check" : "1"}</span>
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Details</span>
          </div>
          
          <div className={`h-[2px] flex-1 mx-4 ${isReviewStep ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
          
          {/* Step 2 Indicator */}
          <div className={`flex flex-col items-center gap-2 ${isReviewStep ? 'group' : 'opacity-50'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${isReviewStep ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
              2
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${isReviewStep ? 'text-primary' : 'text-slate-500'}`}>Review</span>
          </div>
          
          <div className="h-[2px] flex-1 bg-slate-200 dark:bg-slate-700 mx-4"></div>
          
          {/* Step 3 Indicator */}
          <div className="flex flex-col items-center gap-2 opacity-50">
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">lock</span>
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Checkout</span>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isReviewStep ? "Review Booking" : "Event Details"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
             {isReviewStep ? "Confirm your details before proceeding to payment." : "Tell us when and where the party is happening."}
          </p>
        </div>
      </div>

      {/* Pass state down to Step 1 and Review */}
      <Outlet context={{ bookingData, setBookingData, product }} />
      
    </main>
  );
}