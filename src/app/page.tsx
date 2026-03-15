"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Objectives from "@/components/objectives";
import MentorshipModel from "@/components/mentorship-model";
import Phases from "@/components/phases";
import Team from "@/components/team";
import KPIs from "@/components/kpis";
import Resources from "@/components/resources";
import CaseStudies from "@/components/case-studies";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <Hero />
        <Objectives />
        <MentorshipModel />
        <Phases />
        <Team />
        <KPIs />
        <Resources />
        <CaseStudies />
        <Testimonials />

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo/a para empezar?
          </h2>
          <p className="text-[var(--gray-500)] mb-8 max-w-lg mx-auto">
            Plazas limitadas. Solicita tu plaza en el programa de mentoría y da
            el primer paso hacia tu carrera profesional en España.
          </p>
          <a
            href="/registro"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-3 rounded-full font-medium hover:bg-[var(--primary-hover)] transition-colors text-lg"
          >
            Solicitar plaza →
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
