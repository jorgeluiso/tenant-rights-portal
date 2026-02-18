/**
 * Tenant Rights Portal — Guardian Shield Design
 * Civic-editorial design: slate + teal palette, shield motifs, progressive disclosure
 * Plus Jakarta Sans headings, IBM Plex Mono for legal citations
 */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Home as HomeIcon,
  FileText,
  Calendar,
  ExternalLink,
  Info,
  BookOpen,
  Gavel,
  ShieldCheck,
  ShieldAlert,
  MapPin,
  Users,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ── Image URLs ──
const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/fH7iDOQCpfIRjFkVAz0V3Z/sandbox/ZoJFZbIvgOzOcRysOLhnsm-img-1_1771438662000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZkg3aURPUUNwZklSakZrVkF6MFYzWi9zYW5kYm94L1pvSkZaYkl2Z096T2NSeXNPTGhuc20taW1nLTFfMTc3MTQzODY2MjAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Y~AqoIeDuB0bSiGIjt5Gz44QKqHP8R5awe~HGuqGJAmadjyIHCua-TpfvBPy95qKt6CY~OoIEqevhSQ0~heW8A7q2TXkxhTwHhkU2catwvwERTrTuMcm123E7t4iE5GLVZwJ7eE0lw3XsUz3pzlaTjkOsYzY~Bjlw61TNAw9S2fJoFEhUy3Fp777B7ZLWC8PQOJqXrfADA0S31GhRVdCrR6SMGLic1VaIcfVBWFXZmeo5lvaw2mkoTWwzNi-mRbpzm9FyV9DxdSyqoc4D7iKOxYCYp9hyMX-IBxi~~lElhYcAVimxnMrlGCLhcYeShrJgpFZXgyiHzztC1jBpxKEAA__";

const MENLO_PARK_AERIAL = "https://private-us-east-1.manuscdn.com/sessionFile/fH7iDOQCpfIRjFkVAz0V3Z/sandbox/ZoJFZbIvgOzOcRysOLhnsm-img-4_1771438666000_na1fn_bWVubG8tcGFyay1hZXJpYWw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZkg3aURPUUNwZklSakZrVkF6MFYzWi9zYW5kYm94L1pvSkZaYkl2Z096T2NSeXNPTGhuc20taW1nLTRfMTc3MTQzODY2NjAwMF9uYTFmbl9iV1Z1Ykc4dGNHRnlheTFoWlhKcFlXdy5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ekx3PYwd6tODGo7ZFtX0s9g3i0dOqqopdQxUCVUkYfprgVtxiB9mOvmgHGMea3zM747vdsOeinzEPvxIHYWBEZffXwiqzHr58x1hvuHzg7BC5u6eo8GcP~6uVRpt3nlk22m6kPKdlzXBu10AJ2xGwYs8abb6smzdiOL~uho6yPLRnw6aN~DI9Oak3t7vMyCnsQ5VRQ0LDSQGhvqDWyw6GdMsNGsXf7YKxm850K0Q4-16hmyKvWzBrcBtG9omQO-537qqysDdB8X8Lc9IBkWYyr4fFXOs3rlViCOmJ2Vpb1IR~B1a25D5OahyEljhBEhWsYRSdtEQX8CMuULFUcwn3A__";

const TIMELINE_BG = "https://private-us-east-1.manuscdn.com/sessionFile/fH7iDOQCpfIRjFkVAz0V3Z/sandbox/ZoJFZbIvgOzOcRysOLhnsm-img-5_1771438671000_na1fn_dGltZWxpbmUtcGF0dGVybg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZkg3aURPUUNwZklSakZrVkF6MFYzWi9zYW5kYm94L1pvSkZaYkl2Z096T2NSeXNPTGhuc20taW1nLTVfMTc3MTQzODY3MTAwMF9uYTFmbl9kR2x0Wld4cGJtVXRjR0YwZEdWeWJnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=XTR6OdRiNIVxLN8ydUUfscAl6e3-XSrStkEi52XtDmye5krL10tb1fpy~mcTfKi3B4Bqth~agOr~Ae-dnHAnKIdgw9a6n6xgtet9VYiVgdHW88OU244YL7F8-33MbliT1zArA4qA90CvrNjKBdH2cbxc4GH4prBwaTb9l4kPstR9STCgsRJ3DgV09ilTItR-BZcpwofyBwQPqvccYIen8oXmYcTTCDc2PmzUhACBkCZnv4R7WnEUdPJV5F-~PuPfe~3feD72ItMhX4qRSNi~wcYaeC8KUO3Nez8RxzCK6EciFZfcp2XihZyvFsfF9FQo-A569R8tSMwFVU-FwkF9LA__";

// ── Countdown Hook ──
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

// ── Scroll-animated section wrapper ──
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Status Badge ──
function StatusBadge({ status, label }: { status: "protected" | "exempt" | "warning" | "info"; label: string }) {
  const styles = {
    protected: "bg-teal-50 text-teal-700 border-teal-200",
    exempt: "bg-amber-50 text-amber-700 border-amber-200",
    warning: "bg-orange-50 text-orange-700 border-orange-200",
    info: "bg-slate-50 text-slate-600 border-slate-200",
  };
  const icons = {
    protected: <ShieldCheck className="w-3.5 h-3.5" />,
    exempt: <ShieldAlert className="w-3.5 h-3.5" />,
    warning: <AlertTriangle className="w-3.5 h-3.5" />,
    info: <Info className="w-3.5 h-3.5" />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
      {icons[status]}
      {label}
    </span>
  );
}

// ── Nav ──
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200/60" : "bg-transparent"}`}>
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <Shield className={`w-6 h-6 transition-colors ${scrolled ? "text-teal-600" : "text-teal-300"}`} />
          <span className={`font-bold text-sm tracking-tight transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}>
            Tenant Rights Portal
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "lease-status", label: "Lease Status" },
            { id: "rights", label: "Your Rights" },
            { id: "timeline", label: "Timeline" },
            { id: "resources", label: "Resources" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${scrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" : "text-white/80 hover:text-white hover:bg-white/10"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ── Main Page ──
export default function Home() {
  const leaseEnd = new Date("2026-07-31T23:59:59");
  const countdown = useCountdown(leaseEnd);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        </div>

        <div className="relative container pt-28 pb-20 lg:pt-36 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <StatusBadge status="info" label="Personalized Analysis" />
              <StatusBadge status="info" label="February 18, 2026" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Your Lease Renewal<br />
              <span className="text-teal-300">Rights & Protections</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              A comprehensive analysis of your tenancy at 461 Hamilton Avenue, Menlo Park — including applicable California state laws, local ordinances, and your continuing protections.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4"
          >
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
              <Clock className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
              Lease Expiration Countdown
            </p>
            <div className="flex gap-3 md:gap-4">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hours" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map((unit) => (
                <div key={unit.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 md:px-6 md:py-4 text-center min-w-[72px]">
                  <div className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{unit.label}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-3">
              Current lease expires <span className="text-white font-semibold">July 31, 2026</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ KEY FINDING BANNER ═══════════ */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200/60">
        <div className="container py-5">
          <AnimatedSection>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900 text-base mb-1">Key Finding</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Your landlord <strong>can refuse to renew your lease</strong> when the current term expires on July 31, 2026, provided they give you proper 60-day written notice. The property is exempt from California's "just cause" eviction protections (AB 1482). However, the decision cannot be retaliatory or discriminatory.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ OVERVIEW CARDS ═══════════ */}
      <section id="overview" className="container py-16 lg:py-20">
        <AnimatedSection>
          <div className="mb-12">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Property Overview</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Tenancy at a Glance</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: HomeIcon, title: "Property", value: "461 Hamilton Ave", sub: "Menlo Park, CA 94025", badge: "Single-Family Home" },
            { icon: Users, title: "Occupants", value: "Jorge L. Olivares", sub: "Cristina Chacon, Isabelle Olivares", badge: "3 Residents" },
            { icon: Calendar, title: "Current Term", value: "Aug 1, 2025 – Jul 31, 2026", sub: "3rd renewal (4th year)", badge: "Fixed-Term Lease" },
            { icon: DollarSign, title: "Monthly Rent", value: "$4,300", sub: "Increased from $4,150 (2nd renewal)", badge: "No Rent Cap Applied" },
            { icon: FileText, title: "Landlord", value: "Gaurang Garg", sub: "39427 Squirrel Rd, Newark, CA 94560", badge: "Individual Owner" },
            { icon: Shield, title: "AB 1482 Status", value: "Exempt", sub: "Single-family home, individual owner", badge: "No Just Cause Required" },
          ].map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.08}>
              <Card className="h-full border-slate-200/80 shadow-sm hover:shadow-md transition-shadow bg-white">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                      <card.icon className="w-4.5 h-4.5 text-slate-600" />
                    </div>
                    <Badge variant="secondary" className="text-[11px] font-medium bg-slate-100 text-slate-500 border-0">
                      {card.badge}
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{card.title}</p>
                  <p className="text-lg font-bold text-slate-900 mb-0.5">{card.value}</p>
                  <p className="text-sm text-slate-500">{card.sub}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══════════ LEASE STATUS / EXEMPTION ANALYSIS ═══════════ */}
      <section id="lease-status" className="bg-slate-50/80 border-y border-slate-200/60">
        <div className="container py-16 lg:py-20">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Legal Analysis</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AB 1482 Exemption Status</h2>
              <p className="text-slate-500 mt-3 max-w-2xl leading-relaxed">
                The California Tenant Protection Act (AB 1482) provides rent caps and "just cause" eviction protections. Your property claims an exemption. Here is our analysis of whether that exemption is valid.
              </p>
            </div>
          </AnimatedSection>

          {/* Exemption Criteria Table */}
          <AnimatedSection delay={0.1}>
            <Card className="border-slate-200/80 shadow-sm overflow-hidden bg-white mb-8">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-700">Exemption Criteria</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-slate-700">Your Property</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-800">Property Type</td>
                      <td className="px-5 py-4 text-slate-600">Single-family home ("separately alienable from any other dwelling")</td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                          <CheckCircle2 className="w-4 h-4" /> Meets Exemption
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-800">Ownership Structure</td>
                      <td className="px-5 py-4 text-slate-600">Owned by individual (Gaurang Garg), not a corporation, REIT, or LLC</td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                          <CheckCircle2 className="w-4 h-4" /> Meets Exemption
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-slate-800">Written Notice in Lease</td>
                      <td className="px-5 py-4 text-slate-600">Lease contains the required AB 1482 exemption notice on page 1</td>
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                          <CheckCircle2 className="w-4 h-4" /> Meets Exemption
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </AnimatedSection>

          {/* Verdict Card */}
          <AnimatedSection delay={0.2}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Exemption Verdict: Likely Valid</h3>
                  <p className="text-slate-300 leading-relaxed text-sm mb-4">
                    All three criteria for the AB 1482 single-family home exemption appear to be met. This means the landlord is not required to provide a "just cause" reason for ending your tenancy and is not bound by the state rent cap of 5% + CPI.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status="exempt" label="AB 1482 Exempt" />
                    <StatusBadge status="exempt" label="No Rent Cap" />
                    <StatusBadge status="exempt" label="No Just Cause Required" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Local Ordinances */}
          <AnimatedSection delay={0.3}>
            <div className="mt-10">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Menlo Park Local Ordinances</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <Card className="border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-slate-400" />
                      <h4 className="font-bold text-slate-800">12-Month Lease Ordinance</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-mono mb-2">Chapter 8.53</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      Requires landlords to offer a one-year lease. However, this applies only to multifamily properties with four or more units.
                    </p>
                    <StatusBadge status="info" label="Does Not Apply — Single-Family Home" />
                  </CardContent>
                </Card>
                <Card className="border-slate-200/80 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-slate-400" />
                      <h4 className="font-bold text-slate-800">Tenant Relocation Assistance</h4>
                    </div>
                    <p className="text-sm text-slate-500 font-mono mb-2">Chapter 8.56</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      Mandates relocation payments for displaced tenants. Only applies to properties with five or more units, and explicitly excludes lease expirations.
                    </p>
                    <StatusBadge status="info" label="Does Not Apply — Single-Family Home" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ YOUR RIGHTS ═══════════ */}
      <section id="rights" className="container py-16 lg:py-20">
        <AnimatedSection>
          <div className="mb-12">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Your Protections</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Rights That Still Apply</h2>
            <p className="text-slate-500 mt-3 max-w-2xl leading-relaxed">
              Even though your property is exempt from AB 1482, you remain protected by several important state and federal laws. These protections cannot be waived by any lease provision.
            </p>
          </div>
        </AnimatedSection>

        {/* Notice Requirement Highlight */}
        <AnimatedSection delay={0.1}>
          <div className="bg-teal-50 border border-teal-200/60 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-900 mb-2">60-Day Written Notice Required</h3>
                <p className="text-teal-800 text-sm leading-relaxed mb-3">
                  Under California Civil Code § 1946.1, because you have resided in the property for more than one year, your landlord must provide you with at least <strong>60 days' written notice</strong> to terminate the tenancy. If the landlord fails to provide this notice, the termination is improper.
                </p>
                <p className="text-xs text-teal-600 font-mono">Cal. Civ. Code § 1946.1</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Rights Accordion */}
        <AnimatedSection delay={0.2}>
          <Accordion type="multiple" className="space-y-3">
            <AccordionItem value="anti-retaliation" className="border border-slate-200/80 rounded-xl bg-white shadow-sm px-1 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Anti-Retaliation Protections</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Cal. Civ. Code § 1942.5</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="pl-12">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    This law applies to <strong>all rental properties</strong>, including those exempt from AB 1482. Your landlord cannot terminate your tenancy in retaliation for exercising any legal right.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "Requesting necessary repairs to maintain habitability",
                      "Filing a complaint with a government agency about property conditions",
                      "Organizing or participating in a tenants' group",
                      "Reporting code violations to local authorities",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-4">
                    If retaliation is proven, the tenant wins the eviction lawsuit and may recover damages including attorney's fees.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fair-housing" className="border border-slate-200/80 rounded-xl bg-white shadow-sm px-1 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                    <Scale className="w-4.5 h-4.5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Fair Housing Protections</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">FEHA (Gov. Code § 12955) & Federal Fair Housing Act</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="pl-12">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    It is illegal for your landlord to refuse to renew your lease based on any protected characteristic. These laws apply to <strong>all housing</strong>, regardless of AB 1482 status.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Race or color",
                      "National origin",
                      "Religion",
                      "Sex or gender",
                      "Familial status",
                      "Disability",
                      "Sexual orientation",
                      "Source of income",
                      "Marital status",
                      "Immigration status",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="self-help" className="border border-slate-200/80 rounded-xl bg-white shadow-sm px-1 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <Gavel className="w-4.5 h-4.5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Prohibition on Self-Help Eviction</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Cal. Civ. Code § 789.3</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="pl-12">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Your landlord is strictly prohibited from engaging in "self-help" eviction tactics. All evictions must go through the formal legal process.
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "Changing locks or removing doors/windows",
                      "Shutting off utilities (gas, electric, water)",
                      "Removing your personal property",
                      "Intimidation or harassment to force you to leave",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security-deposit" className="border border-slate-200/80 rounded-xl bg-white shadow-sm px-1 data-[state=open]:shadow-md transition-shadow">
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <DollarSign className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Security Deposit Return</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Cal. Civ. Code § 1950.5</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <div className="pl-12">
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Your security deposit of <strong>$4,000</strong> (plus $500 pet deposit) must be returned within <strong>21 days</strong> of your move-out date. The landlord may only deduct for:
                  </p>
                  <div className="space-y-2.5">
                    {[
                      "Unpaid rent",
                      "Cleaning costs to restore the unit to move-in condition",
                      "Repair of damage beyond normal wear and tear",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mt-3">
                    The landlord must provide an itemized statement of any deductions.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AnimatedSection>
      </section>

      {/* ═══════════ LEASE TIMELINE ═══════════ */}
      <section id="timeline" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={TIMELINE_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-slate-900/85" />
        </div>
        <div className="relative container py-16 lg:py-20">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider mb-2">Lease History</p>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">Your Tenancy Timeline</h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-teal-500/30 -translate-x-1/2" />

            {[
              { date: "Jun 26, 2022", title: "Original Lease Signed", desc: "1-year term from Jul 22, 2022 to Jul 21, 2023. Monthly rent: $4,000. Security deposit: $4,000.", active: false },
              { date: "May 19, 2023", title: "1st Renewal", desc: "Extended for one year: Jul 22, 2023 to Jul 21, 2024. Rent unchanged at $4,000/month.", active: false },
              { date: "Jul 3, 2024", title: "2nd Renewal", desc: "Extended for one year: Jul 22, 2024 to Jul 21, 2025. Rent increased to $4,150/month (+3.75%).", active: false },
              { date: "May 10, 2025", title: "3rd Renewal (Current)", desc: "Extended for one year: Aug 1, 2025 to Jul 31, 2026. Rent increased to $4,300/month (+3.6%).", active: true },
              { date: "Jul 31, 2026", title: "Lease Expiration", desc: "Current lease term ends. Landlord may choose not to renew with 60-day written notice. If no notice is given, tenancy may convert to month-to-month.", active: false },
            ].map((event, i) => (
              <AnimatedSection key={event.date} delay={i * 0.1}>
                <div className={`relative flex items-start gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 rounded-full border-2 ${event.active ? "bg-teal-400 border-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.5)]" : "bg-slate-700 border-slate-500"}`} />
                  </div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <p className="text-xs font-mono text-teal-400 mb-1">{event.date}</p>
                    <h4 className={`font-bold text-lg mb-1.5 ${event.active ? "text-teal-300" : "text-white"}`}>
                      {event.title}
                      {event.active && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROPERTY LOCATION ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={MENLO_PARK_AERIAL} alt="Menlo Park aerial view" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/40" />
        </div>
        <div className="relative container py-16 lg:py-20">
          <AnimatedSection>
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-teal-400" />
                <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Property Location</p>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">461 Hamilton Avenue</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Located in Menlo Park, San Mateo County, California. As a single-family home in this jurisdiction, the property falls under specific state and local regulations that differ from multifamily housing protections.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-slate-300">San Mateo County jurisdiction</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-slate-300">Subject to California state tenant protections</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="text-slate-400">Not subject to Menlo Park local rent ordinances (single-family)</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ RESOURCES ═══════════ */}
      <section id="resources" className="container py-16 lg:py-20">
        <AnimatedSection>
          <div className="mb-12">
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">Legal Resources</p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">References & Further Reading</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              icon: BookOpen,
              title: "AB 1482 — Tenant Protection Act",
              desc: "Full text of the California Tenant Protection Act of 2019, including exemption criteria for single-family homes.",
              url: "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=201920200AB1482",
              source: "California Legislative Information",
            },
            {
              icon: FileText,
              title: "Menlo Park Municipal Code Ch. 8.53",
              desc: "Residential Leases for Rental Units ordinance — 12-month lease requirement for multifamily properties.",
              url: "https://ecode360.com/47071926",
              source: "City of Menlo Park",
            },
            {
              icon: FileText,
              title: "Menlo Park Municipal Code Ch. 8.56",
              desc: "Tenant Relocation Assistance ordinance — relocation payments for displaced tenants in 5+ unit properties.",
              url: "https://ecode360.com/47071999",
              source: "City of Menlo Park",
            },
            {
              icon: Scale,
              title: "Cal. Civ. Code § 1946.1",
              desc: "Notice requirements for terminating residential tenancies — 60-day notice for tenancies over one year.",
              url: "https://codes.findlaw.com/ca/civil-code/civ-sect-1946-1.html",
              source: "FindLaw",
            },
            {
              icon: Shield,
              title: "Cal. Civ. Code § 1942.5",
              desc: "Anti-retaliation protections — prohibits landlords from retaliating against tenants who exercise legal rights.",
              url: "https://codes.findlaw.com/ca/civil-code/civ-sect-1942-5/",
              source: "FindLaw",
            },
            {
              icon: Gavel,
              title: "California Fair Housing (FEHA)",
              desc: "Housing discrimination protections under the California Fair Employment and Housing Act.",
              url: "https://calcivilrights.ca.gov/housing/",
              source: "CA Civil Rights Department",
            },
          ].map((resource, i) => (
            <AnimatedSection key={resource.title} delay={i * 0.06}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="h-full border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-200/60 transition-all bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center shrink-0 transition-colors">
                        <resource.icon className="w-4.5 h-4.5 text-slate-500 group-hover:text-teal-600 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-teal-700 transition-colors">{resource.title}</h4>
                          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 shrink-0 transition-colors" />
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mt-1 mb-2">{resource.desc}</p>
                        <p className="text-xs text-slate-400 font-mono">{resource.source}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ═══════════ CONCLUSION ═══════════ */}
      <section className="bg-slate-50/80 border-t border-slate-200/60">
        <div className="container py-16 lg:py-20">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
                <Scale className="w-7 h-7 text-teal-700" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Summary & Recommended Actions</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                Your landlord has the legal right not to renew your lease upon its expiration on July 31, 2026, because the property is exempt from the "just cause" requirements of state and local laws. However, this is contingent upon providing you with a 60-day written notice and ensuring the reason for non-renewal is not retaliatory or discriminatory.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                    <span className="text-teal-700 font-extrabold text-sm">1</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">Communicate Early</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Contact your landlord in writing well before the lease end date to understand their intentions regarding renewal.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                    <span className="text-teal-700 font-extrabold text-sm">2</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">Document Everything</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Keep records of all communications, maintenance requests, and any issues. This documentation is crucial if retaliation is suspected.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                    <span className="text-teal-700 font-extrabold text-sm">3</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1.5">Seek Legal Counsel</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">If you receive a non-renewal notice and believe it is retaliatory or discriminatory, consult a tenant rights attorney promptly.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-teal-500" />
              <span className="font-bold text-sm text-white">Tenant Rights Portal</span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              This portal is for informational purposes only and does not constitute legal advice. Consult with a qualified legal professional for advice regarding your individual situation.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-600">
            Prepared for Jorge Luis Olivares · February 18, 2026 · Analysis based on California state law and Menlo Park municipal code
          </div>
        </div>
      </footer>
    </div>
  );
}
