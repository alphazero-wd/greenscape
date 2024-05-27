import {
  Categories,
  HeroSection,
  Testimonials,
  TrendingProducts,
} from "@/features/home";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrendingProducts />
      <Categories />
      <Testimonials />
    </>
  );
}
