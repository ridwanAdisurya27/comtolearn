"use client";

import { Search } from "lucide-react";

export function MemberSidebar() {
  return (
    <aside
      aria-label="Daftar Anggota Aktif"
      className="w-60 bg-page-canvas flex flex-col shrink-0 border-l border-line overflow-y-auto hidden lg:flex select-none"
    >
      <div className="p-3 border-b border-line">
        <div className="relative">
          <input
            className="bg-surface text-xs text-on-surface placeholder:text-secondary px-2.5 py-1.5 pr-7 rounded-md w-full border border-line focus:outline-none focus:border-primary-container"
            placeholder="Cari anggota..."
            type="text"
          />
          <Search className="w-3.5 h-3.5 absolute right-2.5 top-2 text-secondary" />
        </div>
      </div>

      <div className="p-2 space-y-4 text-xs font-semibold">
        {/* Asisten Lab & Mentor */}
        <div>
          <div className="px-2 text-secondary tracking-wider uppercase text-[10px] mb-1 font-bold">
            Asisten Lab &amp; Mentor (2)
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group">
              <div className="relative w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                AL
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-accent-mint rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-bold text-xs truncate">
                  Aditya Labs
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Reviewing PR Modul 3
                </div>
              </div>
            </div>

            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group">
              <div className="relative w-7 h-7 rounded-full bg-accent-mint flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                NS
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-bold text-xs truncate">
                  Nabila S.T.
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Mentor Sensor Fusion
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pengurus UKM */}
        <div>
          <div className="px-2 text-secondary tracking-wider uppercase text-[10px] mb-1 font-bold">
            Pengurus UKM (2)
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group">
              <div className="relative w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                FS
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-accent-mint rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-bold text-xs truncate">
                  Fathur Syarif
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Ketua UKM Robotika
                </div>
              </div>
            </div>

            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group">
              <div className="relative w-7 h-7 rounded-full bg-rose-600 flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                ZR
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-bold text-xs truncate">
                  Zahra Rahma
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Sekretaris Guild
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anggota Online */}
        <div>
          <div className="px-2 text-secondary tracking-wider uppercase text-[10px] mb-1 font-bold">
            Anggota Online (18)
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group bg-accent-soft/40">
              <div className="relative w-7 h-7 rounded-full bg-primary-container flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                RP
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-accent-mint rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-bold text-xs truncate">
                  Rian Pratama (Kamu)
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Sedang belajar Modul 3
                </div>
              </div>
            </div>

            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors group">
              <div className="relative w-7 h-7 rounded-full bg-accent-mint flex items-center justify-center text-white text-[11px] font-bold mr-2 shrink-0">
                DS
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-accent-mint rounded-full ring-2 ring-page-canvas" />
              </div>
              <div className="truncate">
                <div className="text-on-surface font-semibold text-xs truncate">
                  Dimas Surya
                </div>
                <div className="text-[10px] text-secondary font-normal truncate">
                  Fixing CMake error
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offline */}
        <div>
          <div className="px-2 text-secondary tracking-wider uppercase text-[10px] mb-1 font-bold">
            Offline (42)
          </div>
          <div className="space-y-0.5 opacity-70">
            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] mr-2 shrink-0">
                KW
              </div>
              <span className="text-secondary text-xs truncate">Kurnia Wahyu</span>
            </div>
            <div className="flex items-center px-2 py-1.5 rounded-lg hover:bg-surface-dim cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-[10px] mr-2 shrink-0">
                TR
              </div>
              <span className="text-secondary text-xs truncate">Taufik Rizki</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

