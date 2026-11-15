"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { UserProfileData } from "./user-profile-popover";

export interface AskingPathData {
  id: string | number;
  authorId: string;
  sender: UserProfileData;
  time: string;
  pathTitle: string;
  moduleName: string;
  pathHref?: string;
  question: string;
}

interface AskingPathBubbleProps {
  data: AskingPathData;
  currentUserId: string;
  onAvatarClick: (user: UserProfileData) => void;
}

export function AskingPathBubble({
  data,
  currentUserId,
  onAvatarClick,
}: AskingPathBubbleProps) {
  const isOutgoing = currentUserId === data.authorId;

  if (isOutgoing) {
    return (
      <div
        className="flex flex-col items-end"
        data-purpose="asking-path-bubble-outgoing"
      >
        {/* Outgoing Message Header */}
        <div className="flex items-center space-x-2 mb-1 pr-1">
          <time className="text-[11px] text-[#5B6478]">{data.time}</time>
          <span className="font-bold text-[14.5px] text-[#101828]">{data.sender.name}</span>
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-200 text-[#5B6478] rounded-full">
            {data.sender.role}
          </span>
        </div>

        {/* Outgoing Bubble */}
        <div className="bg-[#E6ECFD] border border-[#2355E0]/20 rounded-2xl rounded-tr-none p-4 max-w-[80%] sm:max-w-[70%] shadow-xs">
          {/* a. Attached Learning Path Reference Box */}
          <div className="bg-[#F7F8FA] border border-[#DDE2EC] border-l-4 border-l-[#2355E0] rounded-lg p-3 mb-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6ECFD] text-[#2355E0]">
                <BookOpen className="w-3.5 h-3.5" />
                Bertanya tentang Path
              </span>
              <Link
                href={data.pathHref || "/dashboard/path"}
                className="text-[11px] font-medium text-[#2355E0] hover:underline inline-flex items-center gap-0.5 shrink-0"
              >
                Buka Bagian →
              </Link>
            </div>
            <div className="text-xs font-bold text-[#101828]">{data.pathTitle}</div>
            <div className="text-xs text-[#5B6478] mt-0.5">{data.moduleName}</div>
          </div>

          {/* b. Student's Question Text */}
          <p className="text-[14.5px] leading-relaxed text-[#101828] whitespace-pre-wrap">
            {data.question}
          </p>

          {/* Bottom-right 24-hour timestamp (NO read-receipts) */}
          <div className="text-right mt-1.5">
            <span className="text-[11px] text-[#5B6478]">{data.time}</span>
          </div>
        </div>
      </div>
    );
  }

  // Incoming Asking Path Bubble (Others)
  return (
    <div
      className="relative flex items-start space-x-3"
      data-purpose="asking-path-bubble-incoming"
    >
      {/* Clickable Sender Avatar with Online Indicator */}
      <button
        type="button"
        onClick={() => onAvatarClick(data.sender)}
        aria-label={`Buka profil ${data.sender.name}`}
        className="relative shrink-0 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0] rounded-full"
      >
        <div
          className={`w-10 h-10 rounded-full ${
            data.sender.avatarBg || "bg-[#2355E0]"
          } text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs group-hover:scale-105 transition-transform`}
        >
          {data.sender.avatar}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
      </button>

      {/* Main Column: Sender Metadata Header + Bubble */}
      <div className="flex-1 max-w-[80%] sm:max-w-[70%]">
        <div className="flex items-center space-x-2 mb-1">
          <button
            type="button"
            onClick={() => onAvatarClick(data.sender)}
            className="font-bold text-[14.5px] text-[#101828] hover:underline cursor-pointer"
          >
            {data.sender.name}
          </button>
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#E6ECFD] text-[#2355E0] rounded-full">
            {data.sender.role}
          </span>
          <time className="text-[11px] text-[#5B6478]">{data.time}</time>
        </div>

        {/* Incoming Bubble */}
        <div className="bg-white border border-[#DDE2EC] rounded-2xl rounded-tl-none p-4 shadow-xs">
          {/* a. Attached Learning Path Reference Box */}
          <div className="bg-[#F7F8FA] border border-[#DDE2EC] border-l-4 border-l-[#2355E0] rounded-lg p-3 mb-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6ECFD] text-[#2355E0]">
                <BookOpen className="w-3.5 h-3.5" />
                Bertanya tentang Path
              </span>
              <Link
                href={data.pathHref || "/dashboard/path"}
                className="text-[11px] font-medium text-[#2355E0] hover:underline inline-flex items-center gap-0.5 shrink-0"
              >
                Buka Bagian →
              </Link>
            </div>
            <div className="text-xs font-bold text-[#101828]">{data.pathTitle}</div>
            <div className="text-xs text-[#5B6478] mt-0.5">{data.moduleName}</div>
          </div>

          {/* b. Student's Question Text */}
          <p className="text-[14.5px] leading-relaxed text-[#101828] whitespace-pre-wrap">
            {data.question}
          </p>

          {/* Bottom-right 24-hour timestamp (NO read-receipts) */}
          <div className="text-right mt-1.5">
            <span className="text-[11px] text-[#5B6478]">{data.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
