"use client";

import { useState } from "react";
import type { UserProfileData } from "./user-profile-popover";

export interface ChatReaction {
  emoji: string;
  count: number;
}

export interface ChatMessageItem {
  id: string | number;
  type: "incoming" | "outgoing";
  sender: UserProfileData;
  time: string;
  content: string;
  codeSnippet?: {
    title: string;
    error: string;
    desc: string;
  };
  commandSnippet?: string;
  postscript?: string;
  reactions?: ChatReaction[];
}

interface IncomingBubbleProps {
  message: ChatMessageItem;
  onAvatarClick: (user: UserProfileData) => void;
}

export function IncomingChatBubble({ message, onAvatarClick }: IncomingBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    if (message.commandSnippet) {
      navigator.clipboard.writeText(message.commandSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="relative flex items-start space-x-3"
      data-purpose="incoming-message"
    >
      {/* Sender Avatar with Online Indicator */}
      <button
        type="button"
        onClick={() => onAvatarClick(message.sender)}
        aria-label={`Buka profil ${message.sender.name}`}
        className="relative shrink-0 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0] rounded-full"
      >
        <div
          className={`w-10 h-10 rounded-full ${
            message.sender.avatarBg || "bg-[#2355E0]"
          } text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs group-hover:scale-105 transition-transform`}
        >
          {message.sender.avatar}
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
      </button>

      {/* Message Content Container */}
      <div className="flex-1 max-w-[80%] sm:max-w-[70%]">
        <div className="flex items-center space-x-2 mb-1">
          <button
            type="button"
            onClick={() => onAvatarClick(message.sender)}
            className="font-bold text-[14.5px] text-[#101828] hover:underline cursor-pointer"
          >
            {message.sender.name}
          </button>
          <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#E6ECFD] text-[#2355E0] rounded-full">
            {message.sender.role}
          </span>
          <time className="text-[11px] text-[#5B6478]">{message.time}</time>
        </div>

        {/* Incoming Bubble */}
        <div className="bg-white border border-[#DDE2EC] rounded-2xl rounded-tl-none p-4 shadow-xs text-[14.5px] leading-relaxed text-[#101828]">
          <p>{message.content}</p>

          {message.codeSnippet && (
            <div className="mt-2.5 bg-surface-dim p-3 rounded-xl border border-line font-mono text-xs text-on-surface">
              <div className="text-secondary text-[10px] uppercase font-bold mb-1">
                {message.codeSnippet.title}
              </div>
              <p className="text-rose-600 font-semibold">{message.codeSnippet.error}</p>
              <p className="text-secondary mt-0.5">{message.codeSnippet.desc}</p>
            </div>
          )}

          {message.commandSnippet && (
            <div className="mt-2.5 bg-surface-dim p-2.5 rounded-xl border border-line font-mono text-xs flex justify-between items-center gap-2">
              <code className="text-on-surface truncate">{message.commandSnippet}</code>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="text-secondary hover:text-on-surface hover:bg-surface border border-line px-2 py-1 rounded text-[11px] transition-colors shrink-0 cursor-pointer"
              >
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
          )}

          {message.postscript && (
            <p className="mt-2 text-[13px] text-secondary">{message.postscript}</p>
          )}

          <div className="text-right mt-1.5">
            <span className="text-[11px] text-[#5B6478]">{message.time}</span>
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex items-center space-x-1.5 mt-2">
            {message.reactions.map((r, i) => (
              <span
                key={i}
                className="inline-flex items-center space-x-1 bg-white border border-[#DDE2EC] px-2 py-0.5 rounded-full text-xs text-[#101828] shadow-xs"
              >
                <span>{r.emoji}</span>
                <span className="font-semibold text-[11px]">{r.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface OutgoingBubbleProps {
  message: ChatMessageItem;
}

export function OutgoingChatBubble({ message }: OutgoingBubbleProps) {
  return (
    <div
      className="flex flex-col items-end"
      data-purpose="outgoing-standard-message"
    >
      <div className="flex items-center space-x-2 mb-1 pr-1">
        <time className="text-[11px] text-[#5B6478]">{message.time}</time>
        <span className="font-bold text-[14.5px] text-[#101828]">{message.sender.name}</span>
        <span className="px-2 py-0.5 text-[11px] font-semibold bg-gray-200 text-[#5B6478] rounded-full">
          {message.sender.role}
        </span>
      </div>

      {/* Outgoing Bubble */}
      <div className="bg-[#E6ECFD] border border-[#2355E0]/20 rounded-2xl rounded-tr-none p-4 max-w-[80%] sm:max-w-[70%] text-[14.5px] leading-relaxed text-[#101828] shadow-xs">
        <p>{message.content}</p>
        <div className="text-right mt-1.5">
          <span className="text-[11px] text-[#5B6478]">{message.time}</span>
        </div>
      </div>
    </div>
  );
}

