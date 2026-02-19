import { Link } from "react-router";

export default function Categories() {
  return (
           <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-accent-purple dark:text-white">
              Browse by Category
            </h3>
            <Link
              className="text-primary font-bold flex items-center gap-1 hover:underline"
              to="#"
            >
              View All{" "}
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { name: "MCs", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmcJYRfJp3oLZILHYQeQRnRk3g58wIqkgN6MZ-9F0uiwSmIyD4zcqfPKD7zmNcUjoA9bw6qh-COxMoIVIhsWmKeMxUYtweQs_u5RFWxJ4UWNSeUCJsV9tQTjfp1wylaAI161_vXR4gA2fuz9rDsIQtEbQsejLpbGcNphVIRWKEGIUhR-Yi60fBXyKtkY60IodeTxXtYT1gL9za-4xmPH_FLc22Qof21pQ6nyt6iOyttsao8ek8aIp7U51vh-9aYG6Yc4RtXkJmMO0" },
              { name: "DJs", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmFHBg_LOw_JmgEeZSLYOYfwD_kaCDJY10Dch_1LbKEdUUeEadT8cdAMgx1CPnekAq-lnN4jrVqi7Hzuqit4lphsgSpBV_Pb-wJPc8rCwwjl5MeH1LUjfKbjGUgbd-xRghmZv3rFkrCEPlxyJVHhjZ_ctAX6j2Q4gDlbYl2-c0br1fEmmFi7gy8LQfwItOTWWupjS87i_16XRTDoJ1tNWCH3cSVySnWlRhNZR-Q7bC5QagUjEpEcRR7iWe5Kt1v5Un0U88PM49Ufg" },
              { name: "Decorators", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7_Rg_2sPHgOVNYGiDg08JwF2nkfm9JSsWLzxaMp5Fr7c2LYjweFCDlgP2BWfK4KzjViUbmOKaqtXzEhwW8fBEPe4Grc9rZw5MZ0hiW7bukMA6qrDzU9Wx9ltXbKoYv6kdqvoJBX92Mg2RGiXdwzDxCRwfYaLoJTlHR0qtE-eevToQ1uiPas9atjrnDioizHUSXgCUxBXlkUxrSYxIPMksCLFjc5r4r4btJjZgBkAcxere2rw_6bljhX5Rs5Gy_lW1bpaB4kLFDmQ" },
              { name: "Canopies", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgNgy0Y8V-kjUCThijwUT5xBA8DBQZNHPLBtfe0mo-xDavDOfGnk5Hz1X4qfILukFPt3uUPQAC_4t6IhJv7qSJdIBB2Py7tGx4gxb2IBdKvZ2_VpvgNSd0EC3C8vUHDOY17uYmHyvmEB7SlwKXUjSVZ7lm-9J-jOtcZ8qdwsB8XREN_FDlMqhDeI19ID81dhX6v6OG_uSzOtJWArCKJLegwl36sb37oOaADiaQHZQnenC5TFIoMX592SXOYfUAzZvt9C3JkpQmXng" },
              { name: "Chairs", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdwiWsFXXlmGVuI2HufO9S8ljrD4bSYkFncVFR7wwjPaKNgpbh-VqDyQ606QsDfBd9lVOf1lJhQ63rnRUNSJfgjZH0x0YIcbHLtpvQ501iMUp8c2l6R5zsRMIVFZja1oYjZzIKF-GsQ-EO6g-pMlCvon5MNbt8SeRwXk_X5IY6N9QwFY6GqIkleVcRIKrSpgLFDWyak39nIrmeIpzIh3939u77C40UHxLVAE48wRh26BVtMeoBQJIo9xE-IKhtQGl10me2gKSR4uQ" },
              { name: "Sound", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4W96mLilkdY-N3-PXxYO3ez6dcxANK1s49_Y-nxoMZbvLGvI-mMFmdzK4M8uXMXBpwG7bkktwPdsprZO6QOJqau4VyAVQSzByvoh_cr4Q5pXZseAiyyP5P5KO6lXl5-fqCzswQbeR08jZi8xXZYSSu9sAnmmI0N-0cQwyhT1p7QunJ9Vy_49h3iBaleT2ayc2kvIFhr-dzkMtw3LbB79AtWi9OnP_Qjqzod3qPy6H12NZYdN6SFEs7lHzF5O0bD9qvFIUM0UprZc" },
            ].map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center group cursor-pointer">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/5 shadow-md flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-all overflow-hidden mb-3">
                    <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    alt={cat.name}
                    src={cat.img}
                    />
                </div>
                <span className="font-bold text-sm text-center">{cat.name}</span>
                </div>
            ))}
            
            {/* Catering Special Case */}
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/5 shadow-md flex items-center justify-center border-2 border-transparent group-hover:border-primary transition-all overflow-hidden mb-3">
                <div className="bg-primary/10 w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    restaurant
                  </span>
                </div>
              </div>
              <span className="font-bold text-sm text-center">Catering</span>
            </div>
          </div>
        </section>
  );
}