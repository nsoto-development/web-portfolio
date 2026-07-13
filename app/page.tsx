import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { Experience } from "@/components/landing/Experience";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Nav } from "@/components/landing/Nav";
import { Skills } from "@/components/landing/Skills";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeJsonLd } from "@/lib/seo/jsonld";

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Nav />
      <main className="landing-main">
        <Hero />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
