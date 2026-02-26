import { Link } from "react-router";
import type { Route } from "./+types/become-vendor";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Become a Vendor | Owambe Market" },
    { name: "description", content: "Join thousands of event professionals growing their business on Owambe Market." },
  ];
}

export default function BecomeVendor() {
  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-32 bg-background-dark overflow-hidden">
        {/* Background Pattern/Image Overlay */}
        <div className="absolute inset-0 opacity-20">
            <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD22d9qdkyA_z_Y3jDr7ZSWijHkQAdNUk-4avHkKp6zUfdSaGtluZzCocS_tlZX55eNUJU1zXiKC9gWpL4noPLT4ePcGPaSF1bIpFu4Fq2b-2poZ1Yv1Gy7a1-8lNDS3h6KFhB_V5RUzBmQWMAaLHxbSSibM6XOoXv8WqD7BiKyPXHhJ8eNQHNR9WHr9wNzT2kVxiFaib2xtuHvdCOCx1H7C7eOIxplex9FK_TPyq0g0Tuq0O03WfPWxPFwXUAGWzxnddNCCBvwPcA" 
                alt="Background" 
                className="w-full h-full object-cover grayscale"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
            For Event Professionals
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Grow Your Business on <br />
            <span className="text-primary">Nigeria's #1</span> Event Marketplace
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop chasing clients. Let them find you. Join thousands of DJs, MCs, Decorators, and Caterers who trust Owambe Market to fill their calendar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105">
              Start Selling Today
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all">
              View Vendor Guidelines
            </button>
          </div>
        </div>
      </section>

      {/* 2. STATS / SOCIAL PROOF */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
          <div>
            <h3 className="text-3xl font-black text-slate-900">5k+</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Active Vendors</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">₦500M+</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Payouts Processed</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">12k+</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Monthly Events</p>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-900">4.9/5</h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-wide">Vendor Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS GRID */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Why Partner With Us?</h2>
            <p className="text-slate-500">We handle the marketing, payments, and booking logistics so you can focus on delivering an unforgettable experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">public</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Massive Exposure</h3>
              <p className="text-slate-500 leading-relaxed">
                Get seen by thousands of couples and event planners searching specifically for services in your area every day.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">payments</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Guaranteed Payments</h3>
              <p className="text-slate-500 leading-relaxed">
                No more chasing clients for balances. Clients pay upfront, and funds are held securely until you deliver the service.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">calendar_month</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Smart Scheduling</h3>
              <p className="text-slate-500 leading-relaxed">
                Manage your availability, block out dates, and accept bookings that fit your schedule—all from one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-white dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmFHBg_LOw_JmgEeZSLYOYfwD_kaCDJY10Dch_1LbKEdUUeEadT8cdAMgx1CPnekAq-lnN4jrVqi7Hzuqit4lphsgSpBV_Pb-wJPc8rCwwjl5MeH1LUjfKbjGUgbd-xRghmZv3rFkrCEPlxyJVHhjZ_ctAX6j2Q4gDlbYl2-c0br1fEmmFi7gy8LQfwItOTWWupjS87i_16XRTDoJ1tNWCH3cSVySnWlRhNZR-Q7bC5QagUjEpEcRR7iWe5Kt1v5Un0U88PM49Ufg" 
                        alt="Vendor Dashboard" 
                        className="rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
                    />
                </div>
                <div className="lg:w-1/2 space-y-10">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">How It Works</h2>
                    
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-primary/30">1</div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 dark:text-white">Create Your Profile</h4>
                            <p className="text-slate-500">Sign up for free, upload your best photos, set your pricing, and describe your services to stand out.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-xl flex items-center justify-center">2</div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 dark:text-white">Get Verified</h4>
                            <p className="text-slate-500">Our team reviews your portfolio to ensure quality. Once verified, you get a "Trusted Pro" badge.</p>
                        </div>
                    </div>
                    
                    <div className="flex gap-6">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-900 text-white font-bold text-xl flex items-center justify-center">3</div>
                        <div>
                            <h4 className="text-xl font-bold mb-2 dark:text-white">Start Earning</h4>
                            <p className="text-slate-500">Receive booking requests, chat with clients, and get paid directly to your bank account.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL */}
      <section className="py-20 bg-accent-purple text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="material-symbols-outlined text-6xl opacity-30 mb-6">format_quote</span>
            <p className="text-2xl md:text-4xl font-bold italic mb-8 leading-relaxed">
                "Since joining Owambe Market, my catering business has doubled. I used to rely on word-of-mouth, but now I have a steady stream of bookings every weekend."
            </p>
            <div className="flex items-center justify-center gap-4">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJFFXG6PFTqdRDk884ZrHY-b-aicsdLdWgMLPWxKt885ykf0Meg3X8l2HcQKdZmsGBW1Z3I_mI4D_Trqq8XGWfpnOr5TxIRDP20GGAMpiH2sN-AC3hIcLA_t1VHZnYhmZbSTaG40hjIDNod52ghaQU4-QHR0Fz4UyV4qC7DSCH4wpJZbMKTFJawg9zrZmkXuEWLQOcg3ZvdgXTurXHZeZbFmpWml5LmSEj5fFg10CMuXQLKBXO0UCLqtpnO1fyqsHatkxn37FCZT4" 
                    className="w-16 h-16 rounded-full border-2 border-white object-cover"
                    alt="Vendor"
                />
                <div className="text-left">
                    <h5 className="font-bold text-lg">Mama T's Kitchen</h5>
                    <p className="text-white/70 text-sm">Premium Caterer, Lagos</p>
                </div>
            </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-white dark:bg-background-dark text-center px-6">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Ready to Scale Your Business?</h2>
            <p className="text-lg text-slate-500 mb-10">Join the fastest growing community of event professionals in Nigeria.</p>
            <button className="bg-primary text-white font-bold px-10 py-5 rounded-xl text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105">
                Join Now - It's Free
            </button>
            <p className="mt-4 text-xs text-slate-400 font-bold uppercase tracking-widest">No credit card required</p>
        </div>
      </section>
    </main>
  );
}