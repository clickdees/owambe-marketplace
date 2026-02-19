export default function Pricing(){
    return(
            <section className="py-20 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold text-accent-purple dark:text-white mb-4">
                Simple, Transparent Pricing
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                Choose the right plan to showcase your talent and grow your
                event service business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10 flex flex-col hover:shadow-xl transition-all">
                <h4 className="font-extrabold text-xl text-accent-purple dark:text-white mb-2">
                  Basic
                </h4>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-accent-purple dark:text-white">
                    Free
                  </span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "1 Service Listing",
                    "Basic Analytics",
                    "Standard Support",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="material-symbols-outlined text-green-500 text-lg">
                        check_circle
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 border-2 border-accent-purple text-accent-purple font-bold rounded-xl hover:bg-accent-purple hover:text-white transition-all cursor-pointer">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border-2 border-accent-gold flex flex-col shadow-2xl relative scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-gold text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <h4 className="font-extrabold text-xl text-accent-purple dark:text-white mb-2">
                  Pro
                </h4>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-accent-purple dark:text-white">
                    ₦15,000
                  </span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "5 Service Listings",
                    "Featured Badge",
                    "Direct Messaging",
                    "Advanced Analytics",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="material-symbols-outlined text-green-500 text-lg">
                        check_circle
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-accent-purple text-white font-bold rounded-xl shadow-lg shadow-accent-purple/20 hover:scale-105 transition-transform cursor-pointer">
                  Choose Pro
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10 flex flex-col hover:shadow-xl transition-all">
                <h4 className="font-extrabold text-xl text-accent-purple dark:text-white mb-2">
                  Premium
                </h4>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-accent-purple dark:text-white">
                    ₦35,000
                  </span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    "Unlimited Listings",
                    "Front-page Spotlight",
                    "Priority 24/7 Support",
                    "Verified Seller Badge",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="material-symbols-outlined text-green-500 text-lg">
                        check_circle
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 border-2 border-accent-purple text-accent-purple font-bold rounded-xl hover:bg-accent-purple hover:text-white transition-all cursor-pointer">
                  Go Premium
                </button>
              </div>
            </div>
          </div>
        </section>
    )
}