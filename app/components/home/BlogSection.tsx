import {Link} from "react-router";

export default function Pricing(){
    return(
           <section className="py-20 bg-white dark:bg-background-dark/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-extrabold text-accent-purple dark:text-white mb-2">
                  Latest from Owambe Life
                </h3>
                <p className="text-gray-500">
                  Tips, trends, and stories from the heart of Nigerian
                  celebrations.
                </p>
              </div>
              <Link
                className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                to="#"
              >
                Read All Articles{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Article 1 */}
              <article className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Traditional Nigerian wedding party scene"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD22d9qdkyA_z_Y3jDr7ZSWijHkQAdNUk-4avHkKp6zUfdSaGtluZzCocS_tlZX55eNUJU1zXiKC9gWpL4noPLT4ePcGPaSF1bIpFu4Fq2b-2poZ1Yv1Gy7a1-8lNDS3h6KFhB_V5RUzBmQWMAaLHxbSSibM6XOoXv8WqD7BiKyPXHhJ8eNQHNR9WHr9wNzT2kVxiFaib2xtuHvdCOCx1H7C7eOIxplex9FK_TPyq0g0Tuq0O03WfPWxPFwXUAGWzxnddNCCBvwPcA"
                  />
                  <div className="absolute top-4 left-4 bg-accent-gold text-accent-purple font-bold px-3 py-1 rounded text-xs">
                    Planning
                  </div>
                </div>
                <h4 className="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                  10 Essential Tips for Planning a Stress-Free Wedding
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  From guest lists to catering, discover the secrets to a smooth
                  celebration that everyone will talk about...
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400">
                    By Admin • 5 min read
                  </span>
                </div>
              </article>
              {/* Article 2 */}
               <article className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Professional DJ turntable setup"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmFHBg_LOw_JmgEeZSLYOYfwD_kaCDJY10Dch_1LbKEdUUeEadT8cdAMgx1CPnekAq-lnN4jrVqi7Hzuqit4lphsgSpBV_Pb-wJPc8rCwwjl5MeH1LUjfKbjGUgbd-xRghmZv3rFkrCEPlxyJVHhjZ_ctAX6j2Q4gDlbYl2-c0br1fEmmFi7gy8LQfwItOTWWupjS87i_16XRTDoJ1tNWCH3cSVySnWlRhNZR-Q7bC5QagUjEpEcRR7iWe5Kt1v5Un0U88PM49Ufg"
                  />
                  <div className="absolute top-4 left-4 bg-accent-gold text-accent-purple font-bold px-3 py-1 rounded text-xs">
                    Culture
                  </div>
                </div>
                <h4 className="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                  The Evolution of Music in Modern Owambes
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  How Afrobeats and fusion sounds are changing the way we party
                  and celebrate our culture today...
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400">
                    By DJ Spin • 8 min read
                  </span>
                </div>
              </article>
              {/* Article 3 */}
               <article className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Elegant floral decoration"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7_Rg_2sPHgOVNYGiDg08JwF2nkfm9JSsWLzxaMp5Fr7c2LYjweFCDlgP2BWfK4KzjViUbmOKaqtXzEhwW8fBEPe4Grc9rZw5MZ0hiW7bukMA6qrDzU9Wx9ltXbKoYv6kdqvoJBX92Mg2RGiXdwzDxCRwfYaLoJTlHR0qtE-eevToQ1uiPas9atjrnDioizHUSXgCUxBXlkUxrSYxIPMksCLFjc5r4r4btJjZgBkAcxere2rw_6bljhX5Rs5Gy_lW1bpaB4kLFDmQ"
                  />
                  <div className="absolute top-4 left-4 bg-accent-gold text-accent-purple font-bold px-3 py-1 rounded text-xs">
                    Decor
                  </div>
                </div>
                <h4 className="text-xl font-extrabold mb-3 group-hover:text-primary transition-colors">
                  Trending Color Palettes for the 2024 Party Season
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Move over traditional tones! This year is all about bold
                  contrasts and vibrant textures in event styling...
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400">
                    By Royal Decor • 4 min read
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>
    )
}