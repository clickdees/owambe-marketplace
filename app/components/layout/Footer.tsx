export default function Footer() {
  return (
     <footer className="bg-background-dark text-white pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    celebration
                  </span>
                </div>
                <h4 className="text-lg font-extrabold tracking-tight uppercase italic">
                  Owambe<span className="text-primary not-italic">Hub</span>
                </h4>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                The ultimate destination for finding reliable vendors for your
                Nigerian parties. We bring celebration to your doorstep.
              </p>
              <div className="flex gap-4">
                <a
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-lg">
                    public
                  </span>
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
                  href="#"
                >
                  <span className="material-symbols-outlined text-lg">
                    chat
                  </span>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-6">Explore</h5>
              <ul className="space-y-4 text-white/60 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Find a DJ
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Find an MC
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Blog & News
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Rental Equipment
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Catering
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-6">For Vendors</h5>
              <ul className="space-y-4 text-white/60 text-sm">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    List your Business
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Vendor Dashboard
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Vendor Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-6">Join our Newsletter</h5>
              <p className="text-white/60 text-sm mb-6">
                Get party planning tips and vendor deals directly to your inbox.
              </p>
              <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                <input
                  className="bg-transparent border-none focus:ring-0 text-sm w-full px-3 outline-none"
                  placeholder="Email address"
                  type="email"
                />
                <button className="bg-primary px-4 py-2 rounded-md text-xs font-bold uppercase cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs gap-4">
            <p>© 2026 Owambe Marketplace. All rights reserved.</p>
            <div className="flex gap-8">
              <a className="hover:text-white transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-white transition-colors" href="#">
                Terms of Service
              </a>
              <a className="hover:text-white transition-colors" href="#">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}