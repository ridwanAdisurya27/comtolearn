import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Camera, CodeXml, Ellipsis, Gamepad2, MessagesCircle, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-background font-sans text-on-surface antialiased selection:bg-primary-container min-h-screen flex flex-col">
      {/* TOP NAVIGATION BAR */}
      <header
        className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/85 border-b border-line/60`}
        id="navbar"
      >
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          {/* Brand Logo */}
          <Link className="flex items-center gap-3 group" href="#">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">hub</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-on-surface leading-none">
                Comto<span className="text-primary-container">Learn</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-black mt-0.5">
                Kampus Guild
              </span>
            </div>
          </Link>

          {/* Menu Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-sm font-semibold text-black hover:text-primary-container transition-colors"
              href="#komunitas-list"
            >
              Komunitas
            </a>
            <a
              className="text-sm font-semibold text-black hover:text-primary-container transition-colors"
              href="#cara-kerja"
            >
              Cara Kerja
            </a>
            <a
              className="text-sm font-semibold text-black hover:text-primary-container transition-colors"
              href="#trust-system"
            >
              Keamanan
            </a> 
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <Link href="/sign-in"><Button variant="outline" className="rounded-2xl"> Masuk </Button></Link>
            <Link
              href="/daftar"
            >
              <Button variant={"outline"} className="rounded-2xl text-white bg-primary transition-all shadow-sm hover:bg-on-surface hover:text-white active:scale-95"> Mulai Gratis <ArrowRight className="text-white"/> </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-background to-page-canvas">
          {/* Background Ambient Glow & Circular Rings */}
          <div className="pointer-events-none absolute top-12 right-[-6%] w-[620px] h-[620px] rounded-full bg-gradient-to-br from-primary-container/10 via-accent-soft to-transparent blur-3xl opacity-70"></div>
          <div className="pointer-events-none absolute -top-24 left-1/3 w-[380px] h-[380px] rounded-full border border-line-subtle/80 opacity-60"></div>
          <div className="pointer-events-none absolute top-40 right-10 w-[520px] h-[520px] rounded-full border border-line/50 opacity-40"></div>
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column: Copy & Actions */}
              <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
                {/* Big Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-on-surface tracking-tight leading-[1.1] max-w-[18ch]">
                  Terhubung dengan{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                    komunitas kampus
                  </span> {""}                 
                  <span className="underline decoration-primary-container/30 decoration-wavy decoration-2">
                    disekitarmu!
                  </span>
                </h1>
                <p className="mt-6 text-base sm:text-lg text-black leading-relaxed max-w-[48ch] font-normal">
                  Jelajahi Komunitas unik yang ada di Kampusmu, pelajari tentang topik mereka dan bangun komunitas bersama sesama mahasiswa se-Indonesia
                </p>
                {/* Actions */}
                <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <Link
                    href="#"
                  >
                    <Button variant={"default"} className={"rounded-2xl bg-primary hover:bg-on-surface hover:text-white"}> Jelajahi Komunitas <ArrowRight /></Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Layered Floating Visual Collage */}
              <div className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] h-[480px]">
                  {/* Concentric backdrop decorative disk */}
                  <div
                    className="absolute inset-0 m-auto w-[380px] h-[380px] rounded-full border border-dashed border-primary-container/20 animate-spin"
                    style={{ animationDuration: "40s" }}
                  ></div>
                  <div className="absolute inset-0 m-auto w-[290px] h-[290px] rounded-full bg-gradient-to-tr from-accent-soft/40 to-primary-container/5 backdrop-blur-2xl"></div>

                  {/* Top Floating Statistics Pill Card */}
                  <div className="absolute top-2 left-6 z-30 bg-white/95 backdrop-blur-md border border-line rounded-2xl p-3.5 shadow-xl shadow-slate-200/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-mint-soft text-accent-mint flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">
                        trending_up
                      </span>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-black uppercase tracking-wider">
                        Aktivitas Mingguan
                      </div>
                      <div className="text-sm font-extrabold text-on-surface flex items-center gap-1.5">
                        <span>94.8% Mahasiswa Aktif</span>
                        <span className="text-[10px] text-accent-mint font-bold px-1.5 py-0.5 rounded bg-accent-mint-soft">
                          +18%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Main Floating Featured Card */}
                  <div className="absolute top-16 right-0 z-20 w-[90%] sm:w-[380px] bg-gradient-to-br from-primary to-[#1848c9] rounded-3xl p-6 text-white shadow-2xl shadow-primary/30 border border-white/20 transform hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                          <span className="material-symbols-outlined text-[22px]">
                            smart_toy
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-base leading-tight">
                            UKM Robotika &amp; IoT
                          </h3>
                          <p className="text-xs text-white/80">
                            Institut Teknologi
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                        <span
                          className="material-symbols-outlined text-[13px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span>Terverifikasi</span>
                      </span>
                    </div>
                    <div className="font-mono text-xs text-white/70 tracking-widest uppercase mb-1">
                      Guild ID : RBT-2025-091
                    </div>
                    <div className="font-mono text-lg font-bold tracking-wider text-white mb-5">
                      120 ANGGOTA AKTIF
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/15 text-xs">
                      <div>
                        <span className="block text-white/60 text-[10px] uppercase">
                          Path Sekarang
                        </span>
                        <span className="font-semibold text-white">
                          Autonomous Rover v2
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-white/60 text-[10px] uppercase">
                          Progress
                        </span>
                        <span className="font-semibold text-white">
                          Modul 3 / 5
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Overlapping Learning Path Card */}
                  <div className="absolute bottom-6 left-0 z-30 w-[88%] sm:w-[350px] bg-white rounded-3xl p-5 border border-line shadow-2xl shadow-slate-300/40 transform hover:-translate-y-1 transition-transform">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-container">
                          Jalur Belajar
                        </span>
                      </div>
                      <span className="text-xs font-bold text-on-surface">
                        60% Selesai
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-on-surface mb-2">
                      ROS2 Nodes &amp; Sensor Fusion
                    </h4>
                    <div className="w-full h-2 bg-line rounded-full overflow-hidden mb-4">
                      <div className="h-full bg-primary-container rounded-full w-[60%]"></div>
                    </div>
                    <div className="bg-page-canvas rounded-2xl p-3 border border-line-subtle flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[15px]">
                          forum
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-on-surface block">
                          Lab Asisten Elektro
                        </span>
                        <span className="text-black leading-snug">
                          &quot;Jadwal workshop modul 3 dimulai jam 15.00 di
                          Lab.&quot;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro Quick Tag */}
                  <div className="absolute -bottom-2 right-2 z-40 bg-on-surface text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-[16px] text-emerald-400"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      done_all
                    </span>
                    <span>Modul 3 Materi Siap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF / PARTNER STRIP */}
        <section className="w-full py-10 bg-white border-y border-line">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-black/80 mb-6">
              Dipercaya oleh mahasiswa &amp; komunitas dari universitas terkemuka
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 font-extrabold text-lg text-slate-700 tracking-tight">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  school
                </span>
                <span>UI DEPOK</span>
              </div>
              <div className="flex items-center gap-2 font-extrabold text-lg text-slate-700 tracking-tight">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  science
                </span>
                <span>ITB BANDUNG</span>
              </div>
              <div className="flex items-center gap-2 font-extrabold text-lg text-slate-700 tracking-tight">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  menu_book
                </span>
                <span>UGM YOGYAKARTA</span>
              </div>
              <div className="flex items-center gap-2 font-extrabold text-lg text-slate-700 tracking-tight">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  memory
                </span>
                <span>ITS SURABAYA</span>
              </div>
              <div className="flex items-center gap-2 font-extrabold text-lg text-slate-700 tracking-tight">
                <span className="material-symbols-outlined text-2xl text-primary-container">
                  cell_tower
                </span>
                <span>TELKOM UNIV</span>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY DIRECTORY & FEATURE CARDS */}
        <section className="w-full py-20 lg:py-28 bg-page-canvas" id="komunitas-list">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-on-surface text-white text-xs font-bold uppercase tracking-wider mb-4">
                  Komunitas
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                  Jelajahi{" "}
                  <span className="text-primary-container">komunitas</span>{" "}
                  pilihan mahasiswa.
                </h2>
                <p className="mt-3 text-base text-black">
                  Gabung ke guild teknologi, Hobby, desain, dan Olahraga dan belajar dengan jalur yang dibuat oleh komunitas.
                </p>
              </div>
              <div className="flex items-center gap-3">
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-3xl p-6 border border-line hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-accent-soft text-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Bot />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-container-soft text-primary">
                      Teknologi
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    UKM Robotika &amp; IoT
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Fokus riset robot humanoid, sistem automasi sensor, dan
                    kompetisi kontes robot Indonesia.
                  </p>
                </div>
                <div className="pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black">
                    <span className="material-symbols-outlined text-base">
                      group
                    </span>
                    <span>120 Anggota</span>
                  </div>
                  <Link
                    className="h-9 px-4 rounded-full bg-accent-soft text-primary-container text-xs font-bold inline-flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors"
                    href="#"
                  >
                    Buka Komunitas
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-3xl p-6 border border-line hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CodeXml/>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-container-soft text-primary">
                      Teknologi
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Competitive Programming
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Latihan algoritma terstruktur, problem-solving, dan
                    persiapan ICPC bersama mentor medalis.
                  </p>
                </div>
                <div className="pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black">
                    <span className="material-symbols-outlined text-base">
                      group
                    </span>
                    <span>198 Anggota</span>
                  </div>
                  <Link
                    className="h-9 px-4 rounded-full bg-accent-soft text-primary-container text-xs font-bold inline-flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors"
                    href="#"
                  >
                    Buka Komunitas
                  </Link>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-3xl p-6 border border-line hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Gamepad2 />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-container-soft text-primary">
                      Hobby
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Game Development Guild
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Belajar Unity, Unreal Engine 5, 3D modeling Blender, dan
                    kolaborasi game jam rutin kampus.
                  </p>
                </div>
                <div className="pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black">
                    <span className="material-symbols-outlined text-base">
                      group
                    </span>
                    <span>142 Anggota</span>
                  </div>
                  <Link
                    className="h-9 px-4 rounded-full bg-accent-soft text-primary-container text-xs font-bold inline-flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors"
                    href="#"
                  >
                    Buka Komunitas
                  </Link>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-3xl p-6 border border-line hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Plane />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-container-soft text-primary">
                      Hobby
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Plane fans Surabaya
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Desain aerodinamika UAV, telemetry sistem, dan riset wahana
                    terbang tanpa awak KRTI.
                  </p>
                </div>
                <div className="pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black">
                    <span className="material-symbols-outlined text-base">
                      group
                    </span>
                    <span>64 Anggota</span>
                  </div>
                  <Link
                    className="h-9 px-4 rounded-full bg-accent-soft text-primary-container text-xs font-bold inline-flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors"
                    href="#"
                  >
                    Buka Komunitas
                  </Link>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-3xl p-6 border border-line hover:border-primary-container/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Camera />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-contariner-soft text-primary">
                      Design
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Fotografi &amp; Sinema
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Eksplorasi visual storytelling, color grading, teknik
                    pencahayaan studio, dan kurasi karya.
                  </p>
                </div>
                <div className="pt-5 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-black">
                    <span className="material-symbols-outlined text-base">
                      group
                    </span>
                    <span>85 Anggota</span>
                  </div>
                  <Link
                    className="h-9 px-4 rounded-full bg-accent-soft text-primary-container text-xs font-bold inline-flex items-center justify-center hover:bg-primary-container hover:text-white transition-colors"
                    href="#"
                  >
                    Buka Komunitas
                  </Link>
                </div>
              </div>

              {/* Card 6: Add UKM CTA Tile */}
              <div className="bg-gradient-to-br from-primary-container/10 via-accent-soft to-white rounded-3xl p-6 border-2 border-dashed border-primary-container/30 flex flex-col justify-between items-start">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-primary-container flex items-center justify-center shadow-sm mb-5">
                    <Ellipsis />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">
                    Belum Menemukan komunitas yang cocok?
                  </h3>
                  <p className="text-sm text-black leading-relaxed mb-6">
                    Masuk sekarang dan cari komunitasmu!
                  </p>
                </div>
                <a
                  className="w-full h-11 rounded-full bg-on-surface text-white text-xs font-bold inline-flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm"
                  href="#cta-banner"
                >
                  <span>Daftarkan Sekarang</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CARA KERJA SECTION */}
        <section className="w-full py-20 lg:py-28 bg-white" id="cara-kerja">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <div className="text-center max-w-xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-soft text-primary-container text-xs font-bold uppercase tracking-wider mb-3">
                Cara Kerja
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Mulai belajar bersama dalam 4 langkah mudah
              </h2>
              <p className="mt-3 text-black text-base">
                Tanpa birokrasi rumit, cukup autentikasi kredensial kampus Anda
                dan langsung bergabung.
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-dark via-[#111a30] to-[#0a0f1d] rounded-4xl p-8 sm:p-12 lg:p-14 text-white shadow-2xl relative overflow-hidden">
              <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary-container/20 blur-3xl"></div>
              <div className="pointer-events-none absolute -bottom-24 left-1/4 w-80 h-80 rounded-full bg-accent-mint/10 blur-3xl"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
                {/* Left Sub-card */}
                <div className="lg:col-span-5 rounded-3xl sm:p-8">
                <Image src="/modul_completed.webp" width={500} height={500} alt="modul_completed"/>
                </div>

                {/* Right Steps */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary-container/40 text-primary-container flex items-center justify-center shrink-0 font-extrabold text-base group-hover:scale-105 transition-transform">
                      01
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-container transition-colors">
                        Masuk dengan SSO / Domain Kampus
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        Gunakan email resmi universitas (.ac.id) untuk mengamankan
                        akses khusus mahasiswa dan alumni terverifikasi.
                      </p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary-container/40 text-primary-container flex items-center justify-center shrink-0 font-extrabold text-base group-hover:scale-105 transition-transform">
                      02
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-container transition-colors">
                        Pilih Komunitas &amp; Guild Sesuai Minat
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        Eksplorasi direktori UKM, riset laboratorium, atau guild
                        peminatan teknologi yang sesuai minat karir Anda.
                      </p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary-container/40 text-primary-container flex items-center justify-center shrink-0 font-extrabold text-base group-hover:scale-105 transition-transform">
                      03
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-container transition-colors">
                        Kuasai Learning Path Terstruktur
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        Ikuti kurikulum roadmap tahap-demi-tahap yang disusun rapi
                        oleh asisten lab dan ketua divisi keahlian.
                      </p>
                    </div>
                  </div>
                  {/* Step 4 */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary-container/40 text-primary-container flex items-center justify-center shrink-0 font-extrabold text-base group-hover:scale-105 transition-transform">
                      04
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-container transition-colors">
                        Diskusi Real-time &amp; Bedah Masalah
                      </h3>
                      <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                        Tanyakan hambatan coding, sirkuit, atau tugas akhir di
                        forum chat interaktif tanpa takut diabaikan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOR UKM LEADERS CTA BANNER */}
        <section className="w-full py-20 bg-secondary/10" id="cta-banner">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <div className="relative bg-gradient-to-r from-primary to-primary-container rounded-4xl p-10 sm:p-14 lg:p-16 text-white shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="pointer-events-none absolute -right-16 -top-16 w-80 h-80 rounded-full border border-white/20"></div>
              <div className="pointer-events-none absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/10"></div>
              <div className="pointer-events-none absolute left-10 -bottom-20 w-60 h-60 rounded-full bg-white/10 blur-2xl"></div>

              <div className="max-w-2xl relative z-10 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Anda Masih membaca?
                </h2>
                <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed font-normal">
                  Jelajahi Komunitas unik yang ada di Kampusmu, pelajari tentang topik mereka dan bangun komunitas bersama sesama mahasiswa se-Indonesia
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full sm:w-auto">
                <Link
                  href="#"
                >
                  <Button variant={"outline"} size={"lg"} className={"bg-white text-primary rounded-2xl"}> Gabung Sekarang <ArrowRight /> </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white border-t border-line">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 font-medium text-sm text-black">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary-container text-white flex items-center justify-center font-bold">
                <MessagesCircle className=""/>
              </div>
              <span className="font-extrabold text-on-surface text-base">
                ComtoLearn
              </span>
              <span className="text-slate-300">|</span>
              <p>© 2025 ComtoLearn. Hak cipta dilindungi undang-undang.</p>
            </div>
            <div className="flex items-center gap-8">
              <Link
                className="hover:text-primary-container transition-colors"
                href="#"
              >
                Panduan Komunitas
              </Link>
              <Link
                className="hover:text-primary-container transition-colors"
                href="#"
              >
                Privasi
              </Link>
              <Link
                className="hover:text-primary-container transition-colors"
                href="#"
              >
                Syarat &amp; Ketentuan
              </Link>
              <Link
                className="hover:text-primary-container transition-colors"
                href="#"
              >
                Kontak Kami
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
