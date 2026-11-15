"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck, X } from "lucide-react";

export interface UserProfileData {
  id?: string;
  name: string;
  username: string;
  avatar: string;
  avatarBg?: string;
  role: string;
  status?: string;
  bio: string;
  departmentRole: string;
  interests: string[];
  isVerified?: boolean;
}

interface UserProfilePopoverProps {
  user: UserProfileData;
  onClose: () => void;
}

export function UserProfilePopover({ user, onClose }: UserProfilePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={`Profil ${user.name}`}
      className="absolute left-14 top-2 z-50 w-80 bg-white border border-[#DDE2EC] rounded-2xl shadow-[0_24px_48px_-24px_rgba(16,24,40,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
    >
      {/* Cover Background Banner with subtle geometric grid via pure CSS */}
      <div
        className="h-20 bg-[#E6ECFD] relative overflow-hidden border-b border-[#DDE2EC]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(35, 85, 224, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(35, 85, 224, 0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <div className="absolute top-2.5 right-3 flex items-center space-x-1.5">
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-700 rounded-full">
            {user.status || "Online"}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup profil"
            className="w-5 h-5 rounded-full bg-white/70 hover:bg-white text-secondary flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-0 pb-5">
        {/* Circular Profile Photo overlapping cover */}
        <div className="relative -mt-9 mb-2 inline-block">
          <div
            className={`w-16 h-16 rounded-full ${
              user.avatarBg || "bg-[#2355E0]"
            } text-white flex items-center justify-center font-bold text-lg border-[3px] border-white shadow-sm`}
          >
            {user.avatar}
          </div>
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>

        {/* Name & Username */}
        <div className="mb-3">
          <div className="flex items-center space-x-1.5">
            <h4 className="font-bold text-[17px] text-[#101828]">{user.name}</h4>
            {user.isVerified !== false && (
              <BadgeCheck className="w-4 h-4 text-[#2355E0] shrink-0" />
            )}
          </div>
          <p className="text-[14px] text-[#5B6478]">@{user.username}</p>
        </div>

        {/* Bio */}
        <div className="border-t border-[#DDE2EC] pt-3 pb-3">
          <p className="text-[13px] leading-relaxed text-[#5B6478]">{user.bio}</p>
        </div>

        {/* Department & Role */}
        <div className="mb-3">
          <span className="text-[11px] font-semibold text-[#5B6478] uppercase tracking-wider block mb-1">
            Departemen &amp; Peran
          </span>
          <span className="text-[13px] text-[#101828] font-medium">
            {user.departmentRole}
          </span>
        </div>

        {/* Verified Interest Pills */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-[#5B6478] uppercase tracking-wider block mb-1.5">
            Fokus Minat Terverifikasi
          </span>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-0.5 bg-[#E6ECFD] text-[#2355E0] text-[11px] font-medium rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
