import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Steps from "../components/Steps";
import Disclaimer from "../components/Disclaimer";
import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0f1e 0%, #0f1425 50%, #0a0f1e 100%)' }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Steps />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
}