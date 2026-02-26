import { Form } from "react-router";

export default function Hero() {
  return (
    <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover"
              alt="Vibrant Nigerian party crowd dancing in colorful attire"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD22d9qdkyA_z_Y3jDr7ZSWijHkQAdNUk-4avHkKp6zUfdSaGtluZzCocS_tlZX55eNUJU1zXiKC9gWpL4noPLT4ePcGPaSF1bIpFu4Fq2b-2poZ1Yv1Gy7a1-8lNDS3h6KFhB_V5RUzBmQWMAaLHxbSSibM6XOoXv8WqD7BiKyPXHhJ8eNQHNR9WHr9wNzT2kVxiFaib2xtuHvdCOCx1H7C7eOIxplex9FK_TPyq0g0Tuq0O03WfPWxPFwXUAGWzxnddNCCBvwPcA"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/60 to-black/40"></div>
          </div>
          <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
              Make Your{" "}
              <span className="text-accent-gold underline decoration-accent-gold/40">
                Owambe
              </span>{" "}
              Unforgettable
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 font-medium">
              Connect with the best DJs, MCs, Decorators, and Rentals for your
              next celebration.
            </p>
               {/* --- SEARCH FORM START --- */}
            <Form action="/search" method="get" className="bg-white p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100">
                <span className="material-symbols-outlined text-gray-400">search</span>
                <input
                  name="q" // This name="q" is crucial
                  className="w-full border-none focus:ring-0 text-sm py-4 outline-none"
                  placeholder="What are you looking for?"
                  type="text"
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="material-symbols-outlined text-gray-400">location_on</span>
                {/* We aren't using location in global search yet, but we keep the UI */}
                <input
                  className="w-full border-none focus:ring-0 text-sm py-4 outline-none"
                  placeholder="Location (e.g. Ikeja, Lagos)"
                  type="text"
                />
              </div>
              <button type="submit" className="bg-primary text-white font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all cursor-pointer">
                Search Services
              </button>
            </Form>
            {/* --- SEARCH FORM END --- */}
          </div>
        </section>
  );
}