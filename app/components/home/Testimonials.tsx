export default function Testimonials(){
    return(
               <section className="py-20 bg-accent-purple text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full -ml-32 -mb-32"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                What Our Community Says
              </h3>
              <p className="text-white/70 max-w-2xl mx-auto">
                Real experiences from event organizers and hosts who found their
                perfect matches on OwambeHub.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-accent-gold"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-lg italic mb-6">
                  "Finding a reliable MC used to be a headache. Through
                  OwambeHub, I booked MC Gbolahan and he made my parents' 50th
                  anniversary legendary!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Customer portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJFFXG6PFTqdRDk884ZrHY-b-aicsdLdWgMLPWxKt885ykf0Meg3X8l2HcQKdZmsGBW1Z3I_mI4D_Trqq8XGWfpnOr5TxIRDP20GGAMpiH2sN-AC3hIcLA_t1VHZnYhmZbSTaG40hjIDNod52ghaQU4-QHR0Fz4UyV4qC7DSCH4wpJZbMKTFJawg9zrZmkXuEWLQOcg3ZvdgXTurXHZeZbFmpWml5LmSEj5fFg10CMuXQLKBXO0UCLqtpnO1fyqsHatkxn37FCZT4"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold">Adebayo T.</h5>
                    <p className="text-xs text-white/60">
                      Anniversary Organizer
                    </p>
                  </div>
                </div>
              </div>

               {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <div className="flex gap-1 mb-4">
                   {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-accent-gold"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-lg italic mb-6">
                  "The best platform for any event professional. I doubled my
                  bookings in just 3 months after joining the Pro plan. Secure
                  payments are a game changer."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Vendor portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBicnok0-02__D3hju0WYmUTPcUzFIHKYdEY6_g_ZuDYRBqY3Aj7ArfU-pBq7dCN9fnJxOuz2u8_hvbEQhaiQdTROrIxZUvdlmQPGPXNWk9aSnBICQbe8UFLtNC_GQBjQ55Zew-KyhivUPLz352U0cqeuZNspwwa3YqCP-KyypGkitD4fLyQ8IZkXagakeOG2p6rgnV3ustRIkXpuR9GDhJAemVftLp54G03v78R2uYBLsjR8r2_YOF3zT7B3aemUJLVeSk84lcqy8"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold">DJ Spin Master</h5>
                    <p className="text-xs text-white/60">Professional Vendor</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <div className="flex gap-1 mb-4">
                   {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined text-accent-gold"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="text-lg italic mb-6">
                  "I planned my entire wedding from the UK using OwambeHub. The
                  vendor ratings helped me trust people I couldn't meet in
                  person."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-gold overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Customer portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7_Rg_2sPHgOVNYGiDg08JwF2nkfm9JSsWLzxaMp5Fr7c2LYjweFCDlgP2BWfK4KzjViUbmOKaqtXzEhwW8fBEPe4Grc9rZw5MZ0hiW7bukMA6qrDzU9Wx9ltXbKoYv6kdqvoJBX92Mg2RGiXdwzDxCRwfYaLoJTlHR0qtE-eevToQ1uiPas9atjrnDioizHUSXgCUxBXlkUxrSYxIPMksCLFjc5r4r4btJjZgBkAcxere2rw_6bljhX5Rs5Gy_lW1bpaB4kLFDmQ"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold">Chioma O.</h5>
                    <p className="text-xs text-white/60">Newlywed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}