"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  Search,
  SlidersHorizontal,
  Sparkles,
  Users,
  X,
} from "lucide-react";

interface DiscoveryItem {
  id: string;
  type: "Komunitas UKM" | "Learning Path";
  category: "Robotika & IoT" | "Pemrograman & AI" | "Sistem Tertanam" | "Desain UI/UX";
  title: string;
  description: string;
  meta: string;
  actionText: string;
  actionHref: string;
}

const CATEGORIES = [
  "Semua",
  "Robotika & IoT",
  "Pemrograman & AI",
  "Sistem Tertanam",
  "Desain UI/UX",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

const DISCOVERY_ITEMS: DiscoveryItem[] = [
  {
    id: "guild-1",
    type: "Komunitas UKM",
    category: "Robotika & IoT",
    title: "UKM Robotika & IoT",
    description:
      "Pusat kolaborasi riset robot otonom, drone UAV, sensor fusion, dan persiapan kontes robotika nasional (KRI).",
    meta: "64 Anggota • 3 Path Aktif",
    actionText: "Lihat Ruang",
    actionHref: "/dashboard/chat",
  },
  {
    id: "path-1",
    type: "Learning Path",
    category: "Robotika & IoT",
    title: "ROS2 Nodes & Sensor Fusion",
    description:
      "Kurikulum terarah integrasi ROS2 Humble, filtering IMU BNO055, odometri, dan pemetaan SLAM simulator Gazebo.",
    meta: "5 Modul • Tingkat Menengah",
    actionText: "Mulai Belajar",
    actionHref: "/dashboard/path",
  },
  {
    id: "guild-2",
    type: "Komunitas UKM",
    category: "Sistem Tertanam",
    title: "Embedded & PCB Design Club",
    description:
      "Komunitas perancangan skematik PCB KiCad, routing multi-layer, soldering SMD, dan integrasi mikrokontroler STM32.",
    meta: "48 Anggota • 2 Path Aktif",
    actionText: "Lihat Ruang",
    actionHref: "/dashboard/chat",
  },
  {
    id: "path-2",
    type: "Learning Path",
    category: "Pemrograman & AI",
    title: "Computer Vision untuk Object Tracking",
    description:
      "Pelajari algoritma tracking OpenCV, implementasi model YOLOv8 pada hardware Raspberry Pi 5, dan akselerasi CUDA.",
    meta: "4 Modul • Tingkat Lanjut",
    actionText: "Mulai Belajar",
    actionHref: "/dashboard/path",
  },
  {
    id: "guild-3",
    type: "Komunitas UKM",
    category: "Desain UI/UX",
    title: "ComtoLearn Design Guild",
    description:
      "Wadah mahasiswa bertukar design system Figma, riset pengalaman pengguna aplikasi edutech, dan prototyping interaktif.",
    meta: "39 Anggota • 4 Path Aktif",
    actionText: "Lihat Ruang",
    actionHref: "/dashboard/chat",
  },
  {
    id: "path-3",
    type: "Learning Path",
    category: "Sistem Tertanam",
    title: "STM32 Bare-Metal & FreeRTOS",
    description:
      "Praktikum register-level programming ARM Cortex-M, manajemen multithreading FreeRTOS, dan komunikasi peripheral SPI/I2C.",
    meta: "6 Modul • Tingkat Menengah",
    actionText: "Mulai Belajar",
    actionHref: "/dashboard/path",
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Semua");

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "Semua";

  const filteredItems = useMemo(() => {
    return DISCOVERY_ITEMS.filter((item) => {
      // Category filtering
      if (selectedCategory !== "Semua" && item.category !== selectedCategory) {
        return false;
      }

      // Query filtering
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesType = item.type.toLowerCase().includes(query);
        const matchesMeta = item.meta.toLowerCase().includes(query);

        return matchesTitle || matchesDesc || matchesCategory || matchesType || matchesMeta;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("Semua");
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#F7F8FA] text-[#101828] font-sans antialiased">
      {/* 1. Google-Style Centered Hero Search Section */}
      <section className="max-w-2xl mx-auto pt-12 pb-8 px-4 text-center">
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6ECFD] text-[#2355E0] mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#101828]">
            Comto<span className="text-[#2355E0]">Learn</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5B6478] mt-2">
            Temukan komunitas UKM, mentor lab, dan learning path kampus
          </p>
        </div>

        {/* Hero Search Input (Pill Shaped) */}
        <div className="mt-6 max-w-xl mx-auto">
          <div className="h-14 rounded-full bg-white border border-[#DDE2EC] focus-within:border-[#2355E0] focus-within:ring-4 focus-within:ring-[#2355E0]/10 shadow-[0_12px_32px_-12px_rgba(16,24,40,0.12)] flex items-center px-5 gap-3 transition-all">
            <Search className="w-5 h-5 text-[#5B6478] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari komunitas UKM, topik ROS2, atau learning path..."
              className="w-full bg-transparent text-sm sm:text-base text-[#101828] placeholder-[#5B6478] focus:outline-none"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Hapus kata kunci"
                className="p-1 text-[#5B6478] hover:text-[#101828] rounded-full hover:bg-gray-100 transition cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              className="bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] text-white rounded-full px-5 py-2 text-sm font-semibold transition cursor-pointer shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0]"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0] ${
                  isActive
                    ? "bg-[#2355E0] text-white shadow-xs"
                    : "bg-white border border-[#DDE2EC] text-[#5B6478] hover:text-[#101828] hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive Dummy Recommended Section */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DDE2EC]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#E6ECFD] text-[#2355E0]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[#101828]">
              {isFiltering ? "Hasil Pencarian" : "Rekomendasi Untukmu"}
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-medium text-[#5B6478]">
            {filteredItems.length} dari {DISCOVERY_ITEMS.length} item
          </span>
        </div>

        {/* Results Grid or Empty State */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredItems.map((item) => {
              const isGuild = item.type === "Komunitas UKM";

              return (
                <article
                  key={item.id}
                  className="bg-white border border-[#DDE2EC] rounded-2xl p-5 hover:border-[#2355E0]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon Box & Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#E6ECFD] text-[#2355E0] flex items-center justify-center shrink-0">
                        {isGuild ? (
                          <Users className="w-5 h-5" />
                        ) : (
                          <BookOpen className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0F2F7] text-[#5B6478]">
                          {item.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6ECFD] text-[#2355E0]">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-base sm:text-lg font-bold text-[#101828] group-hover:text-[#2355E0] transition-colors mt-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5B6478] leading-relaxed line-clamp-2 mt-1.5">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Metadata & Action CTA */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#DDE2EC]/70">
                    <span className="text-xs font-medium text-[#5B6478] truncate mr-2">
                      {item.meta}
                    </span>
                    <Link
                      href={item.actionHref}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#2355E0] hover:text-[#1D47BC] transition-colors shrink-0 group-hover:translate-x-0.5 transform duration-150"
                    >
                      <span>{item.actionText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State when no results match */
          <div className="mt-8 bg-white border border-[#DDE2EC] rounded-2xl p-10 text-center space-y-3 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E6ECFD] text-[#2355E0] flex items-center justify-center mx-auto">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#101828]">
              Tidak ada komunitas atau path yang cocok
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6478] max-w-sm mx-auto">
              Coba gunakan kata kunci yang lebih umum atau pilih filter kategori yang berbeda.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0]"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

