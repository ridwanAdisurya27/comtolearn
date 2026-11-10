"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, EyeOff, GraphStar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Daftar() {
  const [eye, setEye] = useState(true)
  return (
    <>
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        <header
          className="shrink-0 z-50 backdrop-blur-md bg-white/85 border-b border-line/60"
          id="navbar"
        >
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
            {/* Brand Logo */}
            <Link className="flex items-center gap-3 group" href="/">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-on-surface leading-none">
                  Comto<span className="text-primary-container">Learn</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-0.5">
                  Kampus Guild
                </span>
              </div>
            </Link>

            {/* Action CTA */}
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="outline" className="h-9 px-4 rounded-xl text-xs">
                  Masuk
                </Button>
              </Link>
              <Link href="#">
                <Button
                  variant="outline"
                  className="h-9 px-4 rounded-xl text-xs text-white bg-primary transition-all shadow-sm hover:bg-on-surface hover:text-white active:scale-95"
                >
                  Mulai Gratis
                  <ArrowRight className="w-3.5 h-3.5 text-white ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Form Container */}
        <main className="flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-6 min-h-0 overflow-y-auto">
          <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-h-full border border-line shadow-xl">
            {/* Left Hero Panel */}
            <section
              aria-label="Informasi Platform ComtoLearn"
              className="hidden lg:flex lg:col-span-5 p-3 flex-col"
            >
              <div className="hero-mesh-gradient w-full h-full rounded-2xl p-6 lg:p-8 flex flex-col justify-between text-white relative overflow-hidden shadow-inner">
                {/* Subtle noise and glow overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                />

                {/* Header / Asterisk Logo in white */}
                <div className="relative z-10">
                  <div
                    aria-label="ComtoLearn Logo"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm"
                  >
                    <GraphStar />
                  </div>
                </div>

                {/* Bottom Tagline & Campus Highlight */}
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/90 mb-2.5 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Eksklusif Mahasiswa &amp; UKM
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-white leading-snug tracking-tight">
                    Akses pusat belajar, forum, dan komunitas kampus terverifikasi.
                  </h1>
                  <p className="mt-2 text-xs text-white/80 leading-relaxed font-normal">
                    Satu portal untuk kolaborasi antar-fakultas, mentoring riset,
                    dan arsip materi akademik resmi.
                  </p>
                </div>
              </div>
            </section>

            {/* Right Auth Form Panel */}
            <section
              aria-labelledby="form-heading"
              className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-white overflow-y-auto"
            >
              <div className="max-w-md w-full mx-auto">
                {/* Header Branding & Intro */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-accent-soft flex items-center justify-center text-primary font-bold text-sm">
                      <GraphStar />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                      ComtoLearn Campus ID
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight"
                    id="form-heading"
                  >
                    Daftar dengan email Kampusmu
                  </h2>
                  <p className="mt-1 text-xs text-secondary leading-relaxed">
                    Gunakan email resmi universitas (
                    <code className="text-primary bg-accent-soft px-1 py-0.5 rounded text-[11px]">
                      .ac.id
                    </code>
                    ) untuk mengakses komunitas dan modul.
                  </p>
                </div>

                {/* Section Divider */}
                <div className="border-t border-line w-full mb-4" />

                {/* Standard Credentials Form */}
                <form action="#" className="space-y-3.5" method="POST">
                  {/* Username */}
                  <div>
                    <label
                      className="block text-[11px] font-semibold text-on-surface uppercase tracking-wider mb-1"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-line bg-white text-on-surface placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition duration-150"
                      id="username"
                      name="email"
                      placeholder="Username"
                      required
                      type="text"
                    />
                  </div>

                  {/* Email Input Field */}
                  <div>
                    <label
                      className="block text-[11px] font-semibold text-on-surface uppercase tracking-wider mb-1"
                      htmlFor="campus-email"
                    >
                      Email Mahasiswa
                    </label>
                    <input
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-line bg-white text-on-surface placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition duration-150"
                      id="campus-email"
                      name="email"
                      placeholder="nama@mahasiswa.kampus.ac.id"
                      required
                      type="email"
                    />
                  </div>


                  {/* Password Input Field with Toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        className="block text-[11px] font-semibold text-on-surface uppercase tracking-wider"
                        htmlFor="campus-password"
                      >
                        Kata Sandi
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="w-full text-xs px-3.5 py-2.5 pr-10 rounded-xl border border-line bg-white text-on-surface placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition duration-150"
                        id="campus-password"
                        name="password"
                        placeholder="••••••••••••"
                        required
                        type="password"
                      />
                      <button
                        aria-label="Tampilkan atau sembunyikan kata sandi"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                        id="toggle-password-visibility"
                        type="button">
                          <Button variant={"default"} size={"icon-sm"} className={"bg-transparent hover:bg-transparent"} onClick={() => setEye(!eye)}> {eye ? <Eye className="text-black"/> : <EyeOff className="text-black" />} </Button>
                      </button>
                    </div>
                  </div>

                  {/* Primary Submit CTA Button */}
                  <div className="pt-1">
                    <Link href={"/dashboard"}>
                      <Button
                        className="w-full rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-medium text-xs transition duration-150 transform focus:outline-none focus:ring-2 focus:ring-primary/30 flex items-center justify-center gap-2 shadow-sm shadow-primary/20 hover:text-white"
                        variant={"outline"}
                      >
                        Masuk Sekarang
                        <ArrowRight />
                      </Button>
                    </Link>
                  </div>
                </form>

                {/* Alternative Link */}
                <p className="mt-4 text-center text-xs text-secondary">
                  Sudah Daftar?
                  <a
                    className="font-semibold text-primary hover:underline ml-1"
                    href="#register"
                  >
                    Login
                  </a>
                </p>

                {/* Institutional Security Trust Badge */}
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-center gap-1.5 text-[11px] text-secondary">
                  <svg
                    className="w-3.5 h-3.5 text-accent-mint shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Autentikasi aman terintegrasi domain institusi kampus.</span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
