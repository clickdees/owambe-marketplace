export default function CTASection(){
    return(
             <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto bg-accent-purple rounded-3xl overflow-hidden relative shadow-2xl">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            ></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center text-white px-8 md:px-20 py-16 gap-12">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                  Are you an event professional?
                </h3>
                <p className="text-lg text-white/80 mb-10 max-w-lg">
                  Join thousands of vendors growing their business on OwambeHub.
                  List your services, get booked, and receive secure payments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="bg-accent-gold text-accent-purple font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform shadow-lg shadow-black/20 cursor-pointer">
                    Register your Business
                  </button>
                  <button className="border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    See Pricing
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md">
                    <span className="material-symbols-outlined text-accent-gold text-4xl mb-4">
                      groups
                    </span>
                    <h5 className="font-bold text-xl">10k+</h5>
                    <p className="text-sm text-white/60">Monthly Clients</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md mt-8">
                    <span className="material-symbols-outlined text-accent-gold text-4xl mb-4">
                      payments
                    </span>
                    <h5 className="font-bold text-xl">₦50M+</h5>
                    <p className="text-sm text-white/60">Vendor Earnings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}