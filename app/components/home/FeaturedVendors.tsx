import { Link } from "react-router";

export default function FeaturedVendors(){
    return(
              <section className="py-16 bg-white dark:bg-background-dark/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h3 className="text-3xl font-extrabold text-accent-purple dark:text-white mb-2">
                  Featured Vendors
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Hand-picked professionals for premium party experiences.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Vendor Card 1 */}
              <div className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="Event setup with luxury lighting and decor"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoAolkj_ukUpsw_RKqFAWcZUW46SIdHfTLFsmdcvi1xKHstoafwjOV5wwDudsOn0WPOdG-x4r4_H_ES-YaKRls50LpyAu-YSuANVq5cwLdRCwiPBY1fVU8wT4hCs2i_r2p6nby8rq-051VFy2cBmz6azKAn__ZULd1gN6Dedqkri_p1c7GGPo519rOG5eEYx5l3kem_lgiO9EBB_LpR5To0Yig-oOvL7X6k0aN0RPH_gWNXf85LaXuje64MjtUHgW8Hn82TQfLaGY"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span
                      className="material-symbols-outlined text-accent-gold text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-bold text-black">
                      4.9 (120+)
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                      Verified
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-purple px-2 py-0.5 bg-accent-purple/10 rounded">
                      Top Rated
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors">
                    Royal Decor Lagos
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Victoria Island, Lagos
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        Starting at
                      </p>
                      <p className="font-extrabold text-accent-purple dark:text-white">
                        ₦250,000
                      </p>
                    </div>
                    <button className="text-primary font-bold text-sm hover:underline cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

               {/* Vendor Card 2 */}
              <div className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="DJ at a turntable during a high-energy party"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBicnok0-02__D3hju0WYmUTPcUzFIHKYdEY6_g_ZuDYRBqY3Aj7ArfU-pBq7dCN9fnJxOuz2u8_hvbEQhaiQdTROrIxZUvdlmQPGPXNWk9aSnBICQbe8UFLtNC_GQBjQ55Zew-KyhivUPLz352U0cqeuZNspwwa3YqCP-KyypGkitD4fLyQ8IZkXagakeOG2p6rgnV3ustRIkXpuR9GDhJAemVftLp54G03v78R2uYBLsjR8r2_YOF3zT7B3aemUJLVeSk84lcqy8"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span
                      className="material-symbols-outlined text-accent-gold text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-bold text-black">
                      4.8 (85+)
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                      Verified
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors">
                    DJ Spin-Master
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Ikeja, Lagos
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        Starting at
                      </p>
                      <p className="font-extrabold text-accent-purple dark:text-white">
                        ₦150,000
                      </p>
                    </div>
                    <button className="text-primary font-bold text-sm hover:underline cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Vendor Card 3 */}
              <div className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="Large outdoor event canopy with chairs"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnrH4kwR6y1kDcSKFE8EXl99drHg_700R2M9RnMMuA80gl2YqHllO0J6tlpkhUXfUvWDjGAledr0rdvM8tsBkmk8S7FxgbaqlSXQ8ylRk_-xjJFmAxfa37KjPBvWIFFNQCCxEp1RQrlSI_5DcTFGLIpavVOKARoDvJuDbDMOAZVaDl5vgqAFrdPhQm-UsPv33gGJEtuswoZFEcqJoXeVPX5FoQUs6XEntzoxqOWngFP-9ny2JZ4cVR9SPDeESaxNoH7GRMUWg93t8"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span
                      className="material-symbols-outlined text-accent-gold text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-bold text-black">
                      4.7 (50+)
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                      Verified
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors">
                    Grand Marquee Rentals
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Surulere, Lagos
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        Starting at
                      </p>
                      <p className="font-extrabold text-accent-purple dark:text-white">
                        ₦400,000
                      </p>
                    </div>
                    <button className="text-primary font-bold text-sm hover:underline cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

               {/* Vendor Card 4 */}
               <div className="group bg-background-light dark:bg-white/5 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt="MC engaging a laughing wedding audience"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJFFXG6PFTqdRDk884ZrHY-b-aicsdLdWgMLPWxKt885ykf0Meg3X8l2HcQKdZmsGBW1Z3I_mI4D_Trqq8XGWfpnOr5TxIRDP20GGAMpiH2sN-AC3hIcLA_t1VHZnYhmZbSTaG40hjIDNod52ghaQU4-QHR0Fz4UyV4qC7DSCH4wpJZbMKTFJawg9zrZmkXuEWLQOcg3ZvdgXTurXHZeZbFmpWml5LmSEj5fFg10CMuXQLKBXO0UCLqtpnO1fyqsHatkxn37FCZT4"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <span
                      className="material-symbols-outlined text-accent-gold text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-xs font-bold text-black">
                      5.0 (200+)
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                      Verified
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent-purple px-2 py-0.5 bg-accent-purple/10 rounded">
                      Top Rated
                    </span>
                  </div>
                  <h4 className="font-extrabold text-lg mb-1 group-hover:text-primary transition-colors">
                    MC Gbolahan Lively
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 mb-4">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>{" "}
                    Lagos Island, Lagos
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">
                        Starting at
                      </p>
                      <p className="font-extrabold text-accent-purple dark:text-white">
                        ₦200,000
                      </p>
                    </div>
                    <button className="text-primary font-bold text-sm hover:underline cursor-pointer">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}