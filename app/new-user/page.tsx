"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import {
  Shield,
  School,
  Lock,
  Check,
  CheckCircle,
  Upload,
  User,
  Eye,
  Users,
  ArrowLeft,
  ArrowRight,
  Info,
  Loader2,
  BadgeCheck,
} from "lucide-react";

const INITIAL_INTERESTS = [
  "Game Development",
  "Robotika & IoT",
  "UI/UX Design",
  "Kecerdasan Buatan (AI)",
  "Web Development",
  "Mobile App Dev",
  "Fotografi & Sinematografi",
  "Aeromodelling",
  "Sains Data",
  "Cyber Security",
  "Game Design",
];

const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDsFBIeb4NHXrDjhqEs0A_Z2vZMkJbWsazsuptICjTWdSSESW4s0nw908cZtpp_faePul8Rp3_uty9rKj1_ajhya5XwUnwixNNyWeqmCMh-KaFD1WiOU_jn-WSt-m_qFrLX-cyYjuos2qG0yZJyhKHU6V-KRkq4-znpbxnBGFizKUybhoK4l597jjIL_w3Qiec1FGM42b1kyumeKIn0FxpJF6EQ4aweI1LCEb9Sb7I";

export default function NewUserOnboardingPage() {
  const [username, setUsername] = useState("alex_pratama");
  const [nickname, setNickname] = useState("Andra Seto");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Game Development",
    "Robotika & IoT",
    "UI/UX Design",
  ]);
  const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
  const [isDefaultAvatar, setIsDefaultAvatar] = useState(false);
  const [statusState, setStatusState] = useState<"idle" | "loading" | "saved">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDisplayName = (val: string) => {
    if (!val || val.length < 2) return "Alex Pratama";
    return val
      .split(/[._]/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, "");
    setUsername(cleaned);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
          setIsDefaultAvatar(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseCampusAvatar = () => {
    setIsDefaultAvatar(true);
  };

  const handleContinue = () => {
    if (selectedInterests.length < 2) {
      alert("Silakan pilih minimal 2 minat belajar untuk mempersonalisasi rekomendasi UKM Anda.");
      return;
    }
    setStatusState("loading");
    setTimeout(() => {
      setStatusState("saved");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-page-canvas text-on-surface antialiased flex flex-col font-sans">
      {/* Top Fixed Header */}
      <header className="sticky top-0 left-0 right-0 w-full z-50 bg-surface border-b border-line">
        <div className="h-16 max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between gap-6">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-4">
            <Link className="flex items-center gap-2 group" href="/">
              <span className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-white font-bold text-lg leading-none transition-transform group-hover:scale-105">
                C
              </span>
              <span className="font-bold text-lg text-on-surface tracking-tight">
                Comto<span className="text-primary-container">Learn</span>
              </span>
            </Link>
            <div className="hidden lg:block h-5 w-[1px] bg-line" />
        
          </div>

          

          {/* Header Action Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center text-xs font-medium text-secondary hover:text-on-surface transition-colors px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Simpan Draf
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 py-8 md:py-12">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8">
          {/* Sub Header Notice */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
            
            <div className="flex items-center gap-1.5 text-secondary text-xs">
              <Lock className="w-3.5 h-3.5 text-secondary" />
              <span>Data tersimpan otomatis ke akun kampus Anda</span>
            </div>
          </div>

          {/* Main Card Container */}
          <div className="bg-surface rounded-2xl border border-line shadow-sm overflow-hidden">
            {/* Top Linear Progress Indicator */}
            <div className="w-full bg-surface-dim h-1.5 flex">
              <div className="h-full bg-primary-container w-2/3 transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
              {/* Left Column: Context & Live Mirror Profile */}
              <div className="lg:col-span-5 bg-surface-dim/50 border-b lg:border-b-0 lg:border-r border-line p-6 md:p-10 flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center gap-2 text-primary font-medium text-xs mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary-container" />
                    <span>Langkah 2 dari 3</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-on-surface mb-3 tracking-tight">
                    Lengkapi Profil Belajarmu
                  </h1>
                  <p className="text-sm text-secondary leading-relaxed mb-6">
                    Identitas dan minat yang kamu tentukan membantu kami memetakan silabus mandiri,
                    menduetkan teman diskusi sepadan, dan memunculkan rekomendasi UKM kampus yang tepat.
                  </p>

                  {/* Interactive Live Campus Card Preview */}
                <div className="bg-surface border border-line rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-line-subtle">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary-container" />
                    Pratinjau Kartu Mahasiswa
                    </span>
                    <span className="text-[11px] font-semibold text-primary bg-primary-container-soft px-2 py-0.5 rounded-full">
                    Aktif
                    </span>
                </div>

                {/* Profile Card Header */}
                <div className="flex items-start gap-4 mb-4">
                    <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary-container-soft flex items-center justify-center overflow-hidden border border-line">
                        {isDefaultAvatar ? (
                        <User className="w-8 h-8 text-primary" />
                        ) : (
                        <Image
                            src={avatarUrl}
                            alt="Avatar Pratinjau Mahasiswa"
                            width={56}
                            height={56}
                            unoptimized
                            className="w-full h-full object-cover"
                        />
                        )}
                    </div>
                    </div>

                    <div className="flex-1 min-w-0">
                    {/* 1. Nama Tampilan / Panggilan ditaruh di sini */}
                    <span className="font-semibold text-on-surface text-base block truncate">
                        {nickname || "Nama Lengkap / Panggilan"}
                    </span>

                    {/* 2. Username tetap di bawah nama */}
                    <p className="text-xs text-secondary truncate mt-0.5">
                        @{username || "username"}
                    </p>

                    {/* 3. Fakultas / Instansi */}
                    <p className="text-xs text-secondary flex items-center gap-1.5 mt-1">
                        <School className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span className="truncate">Fakultas Ilmu Komputer</span>
                    </p>
                    </div>
                

                {/* Lanjutan kartu (bagian tag minat, dsb. tetap di bawah sini) */}
                </div>

                    {/* Selected Tags Preview Slot */}
                    <div className="mb-4">
                      <span className="text-[11px] text-secondary font-medium block mb-2">
                        Fokus Minat Terpilih:
                      </span>
                      <div className="flex flex-wrap gap-1.5 min-h-[30px]">
                        {selectedInterests.length === 0 ? (
                          <span className="text-xs text-secondary italic">
                            Belum ada minat yang dipilih
                          </span>
                        ) : (
                          selectedInterests.map((interest) => (
                            <span
                              key={interest}
                              className="px-2.5 py-0.5 bg-primary-container-soft text-primary rounded-full text-xs font-medium"
                            >
                              {interest}
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Recommendation Result Match Box */}
                    <div className="bg-surface-dim rounded-lg p-3 flex items-center justify-between border border-line-subtle">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary-container border border-line-subtle shrink-0">
                          <Users className="w-4 h-4 text-primary-container" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-on-surface leading-tight">
                            32 Komunitas Kampus Cocok
                          </p>
                          <p className="text-[11px] text-secondary mt-0.5">
                            UKM Robotika, GDSC, Desain Interaktif
                          </p>
                        </div>
                      </div>
                      <span className="text-base font-bold text-primary-container">
                        98%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Academic Privacy Note */}
                <div className="flex items-start gap-2 text-secondary text-xs pt-4 border-t border-line-subtle">
                  <Shield className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>
                    Profilmu hanya dibagikan dalam ekosistem kampus terverifikasi untuk tujuan
                    kolaborasi proyek dan riset.
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleContinue();
                  }}
                >
                  {/* Section 1: Foto Profil / Avatar */}
                  <div>
                    <label className="block text-sm font-semibold text-on-surface mb-1">
                      Foto Profil
                    </label>
                    
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 bg-surface-dim p-4 rounded-xl border border-line-subtle">
                      {/* Avatar Preview */}
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-container-soft flex items-center justify-center border border-line">
                          {isDefaultAvatar ? (
                            <User className="w-9 h-9 text-primary" />
                          ) : (
                            <Image
                              src={avatarUrl}
                              alt="Avatar Mahasiswa"
                              width={64}
                              height={64}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>

                      {/* Action Controls */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-surface text-on-surface text-xs font-semibold hover:bg-surface-dim cursor-pointer transition-colors border border-line shadow-xs focus-within:ring-2 focus-within:ring-primary">
                            <Upload className="w-3.5 h-3.5 mr-1.5 text-primary-container" />
                            Pilih Foto Baru
                            <input
                              ref={fileInputRef}
                              accept="image/png, image/jpeg"
                              className="sr-only"
                              type="file"
                              onChange={handleAvatarFileChange}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={handleUseCampusAvatar}
                            className="inline-flex items-center justify-center h-9 px-3 rounded-lg text-secondary hover:text-on-surface text-xs font-medium hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <User className="w-3.5 h-3.5 mr-1 text-secondary" />
                            Gunakan Avatar Kampus
                          </button>
                        </div>
                        <p className="text-[11px] text-secondary">
                          Format .jpg atau .png. Ukuran maksimal 5MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Username Kampus */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="usernameInput"
                        className="block text-sm font-semibold text-on-surface"
                      >
                        Username Kampus
                      </label>
                      <span className="text-[11px] text-secondary">Wajib diisi</span>
                    </div>
                    <div>

                    </div>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 pointer-events-none flex items-center justify-center text-secondary text-sm">
                        @
                      </div>
                      <input
                        id="usernameInput"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        maxLength={24}
                        placeholder="nama_kamu"
                        autoComplete="off"
                        className="w-full h-11 pl-8 pr-10 rounded-lg bg-surface text-on-surface border border-line text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-secondary/50"
                      />
                      <div className="absolute right-3.5 flex items-center pointer-events-none text-accent-mint">
                        {username.length >= 3 ? (
                          <CheckCircle className="w-4 h-4 text-accent-mint" />
                        ) : null}
                      </div>
                    </div>
                    <p className="text-xs text-secondary mt-1.5 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>
                        Hanya huruf kecil, angka, dan titik. Terlihat oleh anggota komunitas.
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="nicknameInput" className="block text-sm font-semibold text-on-surface">
                        Nama Panggilan
                      </label>
                      <span className="text-[11px] text-secondary">Opsional</span>
                    </div>

                    <div className="relative flex items-center">
                      <input
                        id="nicknameInput"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={30}
                        placeholder="Contoh: Andra"
                        className="w-full h-11 px-3.5 rounded-lg bg-surface text-on-surface border border-line text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder:text-secondary/50"
                      />
                    </div>
                    <p className="text-xs text-secondary mt-1.5">
                      Nama ini yang akan muncul sebagai judul kartu identitas kamu.
                    </p>
                  </div>

                  {/* Section 3: Minat Belajar Chips Selection */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <label className="block text-sm font-semibold text-on-surface">
                        Pilih Minat Belajar & Riset
                      </label>
                      <span className="text-xs text-primary font-semibold">
                        {selectedInterests.length} Minat Dipilih (Minimal 2)
                      </span>
                    </div>
                    <p className="text-xs text-secondary mb-3 leading-relaxed">
                      Klik tag yang sesuai dengan fokus studi atau eksplorasi kegiatan UKM yang ingin
                      kamu ikuti semester ini.
                    </p>

                    {/* Tags Cluster */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {INITIAL_INTERESTS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                              isSelected
                                ? "bg-primary-container-soft text-primary border border-primary/20 shadow-xs"
                                : "bg-surface text-secondary hover:text-on-surface hover:bg-surface-dim border border-line"
                            }`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-primary shrink-0 stroke-[2.5]" />
                            )}
                            <span>{interest}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Actions */}
                  <div className="pt-4 flex items-center justify-between gap-4 border-t border-line-subtle">
                    <Link
                      href="/daftar"
                      className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-surface-dim text-secondary hover:text-on-surface hover:bg-line transition-colors text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1.5" />
                      Kembali
                    </Link>
                    <button
                      type="submit"
                      disabled={statusState === "loading"}
                      className={`inline-flex items-center justify-center h-11 px-7 rounded-lg text-white font-semibold text-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        statusState === "saved"
                          ? "bg-accent-mint hover:bg-accent-mint"
                          : "bg-primary-container hover:bg-primary-hover active:scale-98"
                      }`}
                    >
                      {statusState === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                          <span>Menyimpan...</span>
                        </>
                      ) : statusState === "saved" ? (
                        <>
                          <Check className="w-4 h-4 mr-1.5 text-white stroke-[2.5]" />
                          <span>Berhasil Disimpan</span>
                        </>
                      ) : (
                        <>
                          <span>Lanjutkan</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Stepper Footer Sequential Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-line">
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-secondary leading-none">01</span>
              <div>
                <h2 className="text-sm font-semibold text-on-surface">
                  Verifikasi Email Kampus
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  Terkonfirmasi dengan domain sso.ac.id mahasiswa.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-primary-container leading-none">02</span>
              <div>
                <h2 className="text-sm font-semibold text-primary-container">
                  Lengkapi Profil Belajar
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  Personalisasi topik riset & pencocokan UKM rekan sebidang.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-line leading-none">03</span>
              <div>
                <h2 className="text-sm font-semibold text-secondary">
                  Gabung Komunitas Perdana
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  Masuk ke ruang forum dan dapatkan alur belajar mandiri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Area */}
      <footer className="w-full bg-surface border-t border-line py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-on-surface">ComtoLearn</span>
            <span className="text-secondary">
              © 2025 Platform Komunitas & Belajar Mandiri Mahasiswa
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              className="text-secondary hover:text-primary transition-colors"
              href="#"
            >
              Panduan Akademik
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors"
              href="#"
            >
              Kebijakan Privasi
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors"
              href="#"
            >
              Pusat Bantuan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
