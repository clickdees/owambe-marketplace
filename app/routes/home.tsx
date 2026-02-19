import type { Route } from "./+types/home";
import { Link } from "react-router";

import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedVendors from "../components/home/FeaturedVendors";
import Pricing from "../components/home/Pricing";
import BlogSection from "../components/home/BlogSection";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/home/CTASection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Owambe Marketplace | Find Party Services" },
    { name: "description", content: "Connect with the best DJs, MCs, Decorators, and Rentals for your next celebration." },
  ];
}

export default function Home() {
  return (
    <>

      <main>
        <Hero />
        <Categories />
        <FeaturedVendors />
        <Pricing />
        <BlogSection />
        <Testimonials />
        <CTASection />
      </main>

    </>
  );
}