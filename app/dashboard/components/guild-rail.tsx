"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  LogOut,
  Plus,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function GuildRail() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <aside
      aria-label="Daftar Komunitas"
      className="w-[72px] bg-surface-dim border-r border-line flex flex-col items-center py-3 space-y-2 shrink-0 z-20 overflow-y-auto justify-between"
    >
      {/* Home / Hub */}
      <div className="overflow-hidden">
        <div className="relative group flex items-center justify-center w-full">
          <div className="absolute left-0 w-1 bg-on-surface rounded-r transition-all duration-200 h-0 group-hover:h-5" />
          <Link
            aria-label="ComtoLearn Home"
            href="/"
            className="w-12 h-12 rounded-3xl group-hover:rounded-2xl bg-white group-hover:bg-primary-container text-primary group-hover:text-white shadow-sm flex items-center justify-center transition-all duration-200"
          >
            <GraduationCap className="w-6 h-6" />
          </Link>
        </div>
        <div className="w-8 h-[2px] bg-line rounded" />
        {/* UKM Robotika & IoT (Active Server) */}
        <div className="relative group flex items-center justify-center w-full">
          <div className="absolute left-0 w-1 bg-on-surface rounded-r transition-all duration-200 h-0 group-hover:h-5" />
          <button
            aria-label="UKM Robotika & IoT"
            className="w-12 h-12 rounded-2xl bg-primary-container text-white flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-primary-container/30"
          >
            <span className="material-symbols-outlined text-[24px]">smart_toy</span>
          </button>
        </div>
        {/* Add Guild Button */}
        <div className="relative group flex items-center justify-center w-full pt-1">
          <button
            aria-label="Tambah UKM atau Komunitas Baru"
            className="w-12 h-12 rounded-3xl group-hover:rounded-2xl bg-white hover:bg-accent-mint text-accent-mint hover:text-white shadow-sm flex items-center justify-center transition-all duration-200"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="relative group flex items-center justify-center w-full">
        <button
          aria-label="Keluar"
          onClick={handleLogout}
          className="w-12 h-12 rounded-3xl group-hover:rounded-2xl bg-white hover:bg-red-500 text-secondary hover:text-white shadow-sm flex items-center justify-center transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}

