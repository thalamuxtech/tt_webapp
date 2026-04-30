import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import BrandStatement from "@/components/BrandStatement";
import Pillars from "@/components/Pillars";
import TrainingPrograms from "@/components/TrainingPrograms";
import HowWeWork from "@/components/HowWeWork";
import CoreValues from "@/components/CoreValues";
import TrustedBy from "@/components/TrustedBy";
import TrustMetrics from "@/components/TrustMetrics";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import AdminLoginButton from "@/components/AdminLoginButton";

export default function Home() {
  return (
    <>
      <FirebaseAnalytics />
      <NavBar />
      <main>
        <Hero />
        <BrandStatement />
        <Pillars />
        <TrainingPrograms />
        <HowWeWork />
        <CoreValues />
        <TrustedBy />
        <TrustMetrics />
        <ContactForm />
      </main>
      <Footer />
      <AdminLoginButton />
    </>
  );
}
