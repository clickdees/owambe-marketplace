import type { Route } from "./+types/home";
import { shopifyFetch, HOME_PAGE_QUERY } from "~/shopify.server";

// Import Components
import Hero from "~/components/home/Hero";
import Categories from "~/components/home/Categories";
import FeaturedServices from "~/components/home/FeaturedServices";
import FeaturedVendors from "~/components/home/FeaturedVendors";
import Pricing from "~/components/home/Pricing";
import BlogSection from "~/components/home/BlogSection";
import Testimonials from "~/components/home/Testimonials";
import CTASection from "~/components/home/CTASection";

// 1. THE LOADER - Updated to return featuredVendors
export async function loader({}: Route.LoaderArgs) {
  const data = await shopifyFetch(HOME_PAGE_QUERY);
  
  return {
    collections: data.collections.nodes,
    products: data.products.nodes,
    // Add the featuredVendors from the query result
    featuredVendors: data.featuredVendors.nodes,
    articles: data.articles.nodes,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owambe Marketplace | Find Party Services" },
    { name: "description", content: "Connect with the best DJs, MCs, Decorators..." },
  ];
}

// 2. THE COMPONENT - Updated to pass vendors to the component
export default function Home({ loaderData }: Route.ComponentProps) {
  // Destructure the new featuredVendors data
  const { collections, products, featuredVendors, articles  } = loaderData;

  return (
    <main>
      <Hero />
      <Categories collections={collections} />
    
      {/* Pass the new vendor data to the FeaturedVendors component */}
      <FeaturedVendors vendors={featuredVendors} />
      
      <FeaturedServices products={products} />
      {/* <Pricing /> */}
       <BlogSection articles={articles} />
      <Testimonials />
      <CTASection />
    </main>
  );
}