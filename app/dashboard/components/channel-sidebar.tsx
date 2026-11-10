"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Hash,
  Map,
  MessageCircle,
  Mic,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";

export function ChannelSidebar() {
  const pathname = usePathname();
  const isPathView = pathname === "/dashboard/path";

  return (
    <aside
      aria-label="Daftar Saluran Komunitas"
      className="w-60 bg-page-canvas flex flex-col justify-between shrink-0 border-r border-line select-none"
    >
      <div>
        {/* Guild Header */}
        <header className="py-3 border-b border-line px-4 flex flex-col text-on-surface shadow-xs cursor-pointer hover:bg-surface-dim transition-colors">
          <div className="flex items-center justify-between font-semibold">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="truncate text-sm font-bold tracking-tight">
                UKM Robotika &amp; IoT
              </span>
              <span
                className="material-symbols-outlined text-primary-container text-[17px] shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <Settings className="w-4 h-4 text-secondary" />
          </div>
            <p className="text-[10px]">Ini Deskripsi</p>
        </header>

        {/* Navigation Categories */}
        <nav aria-label="Saluran Diskusi" className="px-2 py-3 space-y-4 overflow-y-auto max-h-[calc(100vh-106px)]">
          {/* Main Guild Hubs: Chat & Learning Path */}
          <div>
            <div className="space-y-0.5">
              <Link
                href="/dashboard"
                className={`w-full flex items-center px-2 py-1.5 rounded text-xs transition-colors ${
                  !isPathView
                    ? "bg-accent-soft text-primary-container font-semibold border-l-2 border-primary-container"
                    : "text-secondary hover:bg-surface-dim hover:text-on-surface"
                }`}
              >
                <MessageCircle className="w-4 h-4 mr-1.5 shrink-0" />
                <span className="truncate">Diskusi Chat</span>
              </Link>
              <Link
                href="/dashboard/path"
                className={`w-full flex items-center px-2 py-1.5 rounded text-xs transition-colors ${
                  isPathView
                    ? "bg-accent-soft text-primary-container font-semibold border-l-2 border-primary-container"
                    : "text-secondary hover:bg-surface-dim hover:text-on-surface"
                }`}
              >
                <Map className="w-4 h-4 mr-1.5 shrink-0" />
                <span className="truncate">Learning Path</span>
                <span className="ml-auto bg-primary-container/10 text-primary-container text-[10px] px-1.5 py-0.2 rounded font-bold">
                  60%
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}

