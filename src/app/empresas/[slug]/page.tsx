"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_COMPANIES, MOCK_JOBS } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";

export default function CompanyDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const company = MOCK_COMPANIES.find((c) => c.slug === slug);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-[var(--foreground)]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[var(--gray-500)]">Empresa no encontrada.</p>
        </main>
      </div>
    );
  }

  const companyJobs = MOCK_JOBS.filter((job) => job.company === company.name);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[var(--foreground)]">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/empresas"
          className="text-sm text-[var(--gray-500)] hover:text-[var(--foreground)] mb-6 inline-block"
        >
          &larr; Volver a empresas
        </Link>

        {/* Company header */}
        <div className="flex items-start gap-5 mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
            style={{ backgroundColor: company.color }}
          >
            {company.logo}
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm bg-[var(--gray-100)] text-[var(--gray-600)] px-3 py-0.5 rounded-full">
                {company.sector}
              </span>
              <span className="text-sm text-[var(--gray-500)]">
                {company.location}
              </span>
              {company.hiresNonEU && (
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Contrata no-UE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mb-10">
          <h2 className="font-semibold text-lg mb-2">Sobre la empresa</h2>
          <p className="text-[var(--gray-500)] leading-relaxed">
            {company.description}
          </p>
        </section>

        {/* Open roles */}
        <section className="mb-10">
          <h2 className="font-semibold text-lg mb-4">Ofertas abiertas</h2>

          {companyJobs.length > 0 ? (
            <div className="space-y-4">
              {companyJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/empleos/${job.id}`}
                  className="block border border-[var(--gray-200)] rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{job.role}</h3>
                    <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--gray-500)]">
                    {job.salary && <span>{job.salary}</span>}
                    {job.deadline && (
                      <span>Fecha l&iacute;mite: {job.deadline}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-[var(--gray-400)] text-sm">
              No hay ofertas abiertas actualmente.
            </p>
          )}
        </section>

        {/* CTA */}
        <div className="bg-[var(--gray-100)] rounded-xl p-6 text-center">
          <p className="text-[var(--gray-600)] mb-3">
            &iquest;Quieres trabajar aqu&iacute;?
          </p>
          <Link
            href="/registro"
            className="inline-block bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Solicita plaza en Puente &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
