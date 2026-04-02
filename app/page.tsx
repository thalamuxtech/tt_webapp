import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import Pillars from "@/components/Pillars";
import HowWeWork from "@/components/HowWeWork";
import CoreValues from "@/components/CoreValues";
import TrustedBy from "@/components/TrustedBy";
import TrustMetrics from "@/components/TrustMetrics";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <BrandStatement />
        <Pillars />
        <HowWeWork />
        <CoreValues />
        <TrustedBy />
        <TrustMetrics />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
