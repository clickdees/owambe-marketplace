import { useOutletContext, Link } from "react-router";
import type { BookingContextType } from "./book.$handle";

export default function BookingStep1() {
  // 1. Get Shared State
  const { bookingData, setBookingData, product } = useOutletContext<BookingContextType>();
  
  const image = product.images.nodes[0];
  const variant = product.variants.nodes[0];
  const price = parseFloat(variant.price.amount);
  const fee = price * 0.05;
  const total = price + fee;
  
  // Formatters
  const formatMoney = (val: number) => new Intl.NumberFormat("en-NG", { style: "currency", currency: variant.price.currencyCode, minimumFractionDigits: 0 }).format(val);

  // Helper to update specific fields
  const updateField = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* LEFT COLUMN: FORM */}
      <div className="lg:col-span-8 space-y-10">
        
        {/* ... Product Header (Same as before) ... */}

        {/* 1. Date Selection */}
        <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</span>
            <h3 className="text-xl font-bold">Choose Your Event Date</h3>
          </div>
          <div className="max-w-md mx-auto">
             <label className="block text-sm font-bold mb-2">Select Date</label>
             <input 
                type="date" 
                required
                className="w-full p-4 rounded-xl border-slate-200 focus:ring-primary focus:border-primary"
                value={bookingData.date}
                onChange={(e) => updateField("date", e.target.value)}
             />
          </div>
        </section>

        {/* 2. Event Context */}
        <section className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</span>
            <h3 className="text-xl font-bold">Event Context</h3>
          </div>
          
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">What type of Owambe is this?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Wedding", "Birthday", "Burial", "Other Party"].map((type) => (
                    <button
                        key={type}
                        onClick={() => updateField("eventType", type)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                            bookingData.eventType === type 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-slate-100 dark:border-slate-800 hover:border-primary/30"
                        }`}
                    >
                        <span className="material-symbols-outlined mb-2">
                            {type === "Wedding" ? "favorite" : type === "Birthday" ? "cake" : type === "Burial" ? "church" : "celebration"}
                        </span>
                        <span className="text-xs font-bold">{type}</span>
                    </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Event Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-primary focus:border-primary transition-all"
                  placeholder="Venue name or full address"
                  type="text"
                  value={bookingData.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-4">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Notes</label>
               <textarea 
                  className="w-full p-4 rounded-xl border-slate-200 bg-slate-50" 
                  rows={3}
                  value={bookingData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                />
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN: SUMMARY */}
      <div className="lg:col-span-4">
        <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
           {/* ... Summary UI same as before ... */}
           
           <div className="space-y-3 py-4 border-y border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Event Date</span>
                <span className="font-bold">{bookingData.date || "Select Date"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Location</span>
                <span className="font-bold truncate max-w-[150px]">{bookingData.location || "Enter Location"}</span>
              </div>
           </div>

           <div className="mt-6">
            <Link
                to="review"
                // Disable if data missing
                className={`w-full text-white font-black py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                    bookingData.date && bookingData.location 
                    ? "bg-primary hover:bg-primary/90 shadow-primary/20" 
                    : "bg-slate-300 cursor-not-allowed"
                }`}
                onClick={(e) => {
                    if(!bookingData.date || !bookingData.location) e.preventDefault();
                }}
            >
              Review Booking
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
           </div>
        </div>
      </div>
    </div>
  );
}