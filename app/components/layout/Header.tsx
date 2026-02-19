import { Link } from "react-router"; // Use Link instead of <a> for internal nav

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#e7cfd3] px-6 md:px-20 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                celebration
              </span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-accent-purple dark:text-white uppercase italic">
              Owambe<span className="text-primary not-italic">Hub</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#">
              Find Services
            </Link>
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#">
              Become a Vendor
            </Link>
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#">
              Pricing
            </Link>
            <Link className="text-sm font-semibold hover:text-primary transition-colors" to="#">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              Log In
            </button>
            <button className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              Sign Up
            </button>
          </div>
        </div>
    </header>
  );
}

     