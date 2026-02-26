import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("collections/:handle", "routes/collections.$handle.tsx"),
  route("products/:handle", "routes/products.$handle.tsx"),

  // NEW: Search Route
  route("search", "routes/search.tsx"),
   
  // NEW: Vendor Landing Page
  route("become-vendor", "routes/become-vendor.tsx"),

    // NEW: All Vendors Route
  route("vendors", "routes/vendors.tsx"),
   // NEW: All Services Route
  route("services", "routes/services.tsx"),

  // NEW: Blog Route
  route("blog", "routes/blog.tsx"),

  // NEW: Article Page Route (captures blog handle and article handle)
  route("blog/:blogHandle/:articleHandle", "routes/blog.$blogHandle.$articleHandle.tsx"),

   // NEW: Vendor Profile Route
  route("vendors/:handle", "routes/vendors.$handle.tsx"),

  // --- BOOKING ROUTES ---
  // 1. The URL is "book/" followed by the handle
  // 2. It renders the layout file "routes/book.$handle.tsx"
  route("book/:handle", "routes/book.$handle.tsx", [
    
    // 3. When at "/book/handle", render Step 1
    index("routes/book.$handle.step1.tsx"),
    
    // 4. When at "/book/handle/review", render Review
    route("review", "routes/book.$handle.review.tsx"),
  ]),

] satisfies RouteConfig;
