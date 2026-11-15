"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Bell,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Hash,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import {
  IncomingChatBubble,
  OutgoingChatBubble,
  type ChatMessageItem,
} from "./components/chat-bubble";
import {
  AskingPathBubble,
  type AskingPathData,
} from "./components/asking-path-bubble";
import {
  UserProfilePopover,
  type UserProfileData,
} from "./components/user-profile-popover";

const SAMPLE_USERS: Record<string, UserProfileData & { id: string }> = {
  aditya: {
    id: "user_aditya",
    name: "Aditya Labs",
    username: "aditya_labs",
    avatar: "AL",
    avatarBg: "bg-[#2355E0]",
    role: "Asisten Lab",
    status: "Online",
    bio: "Mahasiswa Teknik Komputer • Fokus di ROS2, Sensor Fusion, dan sistem kendali UAV.",
    departmentRole: "Teknik Komputer • Asisten Lab",
    interests: ["Robotika & IoT", "ROS2", "Embedded Systems"],
    isVerified: true,
  },
  andra: {
    id: "user_andra",
    name: "Andra Seto",
    username: "andra_seto",
    avatar: "AS",
    avatarBg: "bg-slate-700",
    role: "Mahasiswa",
    status: "Online",
    bio: "Mahasiswa Teknik Elektro • Penggemar mikrokontroler STM32 dan sistem kendali PID.",
    departmentRole: "Teknik Elektro • Mahasiswa",
    interests: ["Kendali PID", "STM32", "Autonomous Vehicles"],
    isVerified: false,
  },
  rian: {
    id: "user_rian",
    name: "Rian Nugraha",
    username: "rian_nugraha",
    avatar: "RN",
    avatarBg: "bg-emerald-600",
    role: "Ketua Divisi Robotika",
    status: "Online",
    bio: "Ketua Divisi Robotika UKM • Riset integrasi Nav2 stack dan robotika mobile kampus.",
    departmentRole: "Teknik Informatika • Ketua Divisi",
    interests: ["Nav2", "SLAM", "Autonomous Navigation"],
    isVerified: true,
  },
};

const CURRENT_USER = SAMPLE_USERS.andra;

const AVAILABLE_MODULES = [
  {
    value: "ROS2 Nodes & Sensor Fusion — Modul 1: Pengenalan Node & Topic",
    pathTitle: "ROS2 Nodes & Sensor Fusion",
    moduleName: "Modul 1: Pengenalan Node & Topic",
  },
  {
    value: "ROS2 Nodes & Sensor Fusion — Modul 2: Integrasi LiDAR",
    pathTitle: "ROS2 Nodes & Sensor Fusion",
    moduleName: "Modul 2: Integrasi LiDAR",
  },
  {
    value: "ROS2 Nodes & Sensor Fusion — Modul 3: Kalibrasi IMU & Odometry",
    pathTitle: "ROS2 Nodes & Sensor Fusion",
    moduleName: "Modul 3: Kalibrasi IMU & Odometry",
  },
  {
    value: "ROS2 Nodes & Sensor Fusion — Modul 4: Sensor Fusion EKF",
    pathTitle: "ROS2 Nodes & Sensor Fusion",
    moduleName: "Modul 4: Sensor Fusion EKF",
  },
];

type StreamItem =
  | { kind: "message"; data: ChatMessageItem }
  | { kind: "asking-path"; data: AskingPathData };

export default function ChatPage() {
  const [activeChannel] = useState("umum");
  const [inputText, setInputText] = useState("");
  const [activePopoverUser, setActivePopoverUser] = useState<{
    user: UserProfileData;
    messageId: string | number;
  } | null>(null);

  // Inline Path Reference state
  const [isReferencingPath, setIsReferencingPath] = useState(false);
  const [selectedModule, setSelectedModule] = useState(AVAILABLE_MODULES[2].value);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const isScrolledUpRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsReferencingPath(false);
        setActivePopoverUser(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
    setUnreadCount(0);
    isScrolledUpRef.current = false;
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const threshold = 60;
    const isAtBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;

    isScrolledUpRef.current = !isAtBottom;
    if (isAtBottom && unreadCount > 0) {
      setUnreadCount(0);
    }
  };

  const [streamItems, setStreamItems] = useState<StreamItem[]>([
    {
      kind: "message",
      data: {
        id: "msg-1",
        type: "incoming",
        sender: SAMPLE_USERS.aditya,
        time: "10:14 WIB",
        content:
          "Halo rekan-rekan! Modul praktikum sensor fusion kamera depth dan IMU sudah dirilis di tab Learning Path. Silakan dicoba di simulator Gazebo masing-masing ya.",
        reactions: [
          { emoji: "🤖", count: 12 },
          { emoji: "🔥", count: 8 },
        ],
      },
    },
    {
      kind: "message",
      data: {
        id: "msg-2",
        type: "outgoing",
        sender: SAMPLE_USERS.andra,
        time: "10:18 WIB",
        content:
          "Terima kasih Mas Adit! Kemarin sudah tes kalibrasi IMU di mikrokontroler STM32, hasilnya stabil. Tapi kami butuh rekomendasi parameter filtering untuk motor penggeraknya.",
      },
    },
    {
      kind: "asking-path",
      data: {
        id: "path-1",
        authorId: SAMPLE_USERS.aditya.id,
        sender: SAMPLE_USERS.aditya,
        time: "10:20 WIB",
        pathTitle: "ROS2 Nodes & Sensor Fusion",
        moduleName: "Modul 3: Kalibrasi IMU & Odometry",
        pathHref: "/dashboard/path",
        question:
          "Izin bertanya Mas Rian & rekan-rekan, untuk parameter filtering IMU BNO055 di Modul 3, apakah lebih disarankan memakai complementary filter atau langsung pasang sensor fusion EKF? Terjadi yaw drift cukup terasa saat belok cepat.",
      },
    },
    {
      kind: "message",
      data: {
        id: "msg-3",
        type: "incoming",
        sender: SAMPLE_USERS.rian,
        time: "10:24 WIB",
        content:
          "Untuk kasus yaw drift saat belok tajam di Modul 3, langsung pakai robot_localization EKF node saja Dit. Gabungkan IMU orientation dengan wheel odometry di config yaml-nya biar drift-nya tereliminasi.",
        reactions: [
          { emoji: "👍", count: 6 },
          { emoji: "💡", count: 4 },
        ],
      },
    },
  ]);

  const addStreamItem = (item: StreamItem) => {
    const isOwnItem =
      (item.kind === "message" && item.data.sender.username === CURRENT_USER.username) ||
      (item.kind === "asking-path" && item.data.authorId === CURRENT_USER.id);

    setStreamItems((prev) => [...prev, item]);

    if (isOwnItem) {
      setUnreadCount(0);
      isScrolledUpRef.current = false;
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    } else {
      if (isScrolledUpRef.current) {
        setUnreadCount((prev) => prev + 1);
      } else {
        setTimeout(() => {
          chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 50);
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const currentTime =
      new Date()
        .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false })
        .replace(".", ":") + " WIB";

    if (isReferencingPath) {
      const selected =
        AVAILABLE_MODULES.find((m) => m.value === selectedModule) || AVAILABLE_MODULES[2];

      const newPathMsg: AskingPathData = {
        id: "path-" + Date.now(),
        authorId: CURRENT_USER.id,
        sender: CURRENT_USER,
        time: currentTime,
        pathTitle: selected.pathTitle,
        moduleName: selected.moduleName,
        pathHref: "/dashboard/path",
        question: inputText.trim(),
      };

      addStreamItem({ kind: "asking-path", data: newPathMsg });
      setIsReferencingPath(false);
    } else {
      const newMsg: ChatMessageItem = {
        id: "msg-" + Date.now(),
        type: "outgoing",
        sender: CURRENT_USER,
        time: currentTime,
        content: inputText.trim(),
      };

      addStreamItem({ kind: "message", data: newMsg });
    }

    setInputText("");
  };

  return (
    <div className="flex flex-col h-full w-full min-w-0 overflow-hidden bg-[#F7F8FA]">
      {/* Channel Header Bar */}
        <header className="bg-white border-b border-[#DDE2EC] h-14 px-4 sm:px-6 shrink-0 z-30 flex items-center justify-between shadow-xs">
          {/* Left: Channel Name & Topic Description */}
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="text-base sm:text-lg font-bold text-[#101828]">
                # {activeChannel}
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#2355E0] shrink-0" />
            </div>
            <div className="h-4 w-px bg-[#DDE2EC] hidden sm:block shrink-0" />
            <p className="text-[13px] text-[#5B6478] truncate hidden sm:inline-block">
              Ruang diskusi komunitas UKM Robotika &amp; IoT • Terbuka untuk semua mahasiswa
            </p>
          </div>

          {/* Right: Search, Notifications & Online Status Badge */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative hidden md:block">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#5B6478]">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                className="h-8 pl-8 pr-3 w-40 lg:w-52 text-xs bg-surface-dim border border-[#DDE2EC] rounded-lg text-[#101828] placeholder-[#5B6478] focus:outline-none focus:ring-1 focus:ring-[#2355E0]"
                placeholder={`Cari di #${activeChannel}...`}
                type="text"
              />
            </div>
            <button
              type="button"
              aria-label="Notifikasi"
              className="text-[#5B6478] hover:text-[#101828] transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Pesan Disematkan"
              className="text-[#5B6478] hover:text-[#101828] transition-colors cursor-pointer"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Daftar Anggota"
              className="text-[#5B6478] hover:text-[#101828] transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
            </button>
            <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6ECFD] text-[#2355E0]">
              <span className="w-2 h-2 mr-1.5 bg-[#2355E0] rounded-full animate-pulse" />
              Aktif: 24 Mahasiswa
            </div>
          </div>
        </header>

        {/* Top Pinned Learning Path Progress Strip */}
        <section
          aria-label="Learning Path Aktif"
          className="bg-white border-b border-[#DDE2EC] px-4 sm:px-6 py-2.5 z-20 shrink-0"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3 flex-1 w-full sm:w-auto">
              <span className="p-1.5 bg-[#E6ECFD] text-[#2355E0] rounded-md shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-[#101828]">
                  <span className="truncate">LEARNING PATH AKTIF: ROS2 Nodes &amp; Sensor Fusion</span>
                  <span className="text-[#2355E0] normal-case font-medium whitespace-nowrap">
                    (Modul 3/5 - 60% Selesai)
                  </span>
                </div>
                {/* Progress Track */}
                <div className="w-full bg-[#DDE2EC] h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#2355E0] h-1.5 rounded-full transition-all duration-300"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/path"
              className="self-end sm:self-center shrink-0 h-8 px-3.5 bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] text-white text-xs font-medium rounded-lg inline-flex items-center transition shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0]"
            >
              <span>Buka Modul</span>
              <span className="ml-1 text-[11px]">→</span>
            </Link>
          </div>
        </section>

        {/* Chat Messages Stream */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 py-6 bg-surface"
        >
          <div className="max-w-4xl mx-auto space-y-6 pb-14">
            {/* Date Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-white border border-[#DDE2EC] text-[#5B6478] text-[12px] font-medium px-3.5 py-1 rounded-full shadow-xs">
                HARI INI, 14 OKTOBER 2024
              </div>
            </div>

            {/* Welcome banner */}
            <div className="mb-6 bg-white border border-[#DDE2EC] rounded-2xl p-4 sm:p-5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#E6ECFD] text-[#2355E0] flex items-center justify-center mb-2.5">
                <Hash className="w-5 h-5" />
              </div>
              <h1 className="text-lg font-bold text-[#101828]">
                Selamat datang di #{activeChannel}!
              </h1>
              <p className="text-xs text-[#5B6478] mt-1 leading-relaxed">
                Saluran diskusi resmi UKM Robotika &amp; IoT. Diskusikan progres praktikum,
                debugging ROS2, dan buat pertanyaan kontekstual dengan tombol{" "}
                <strong className="text-[#2355E0]">Ask Path</strong>.
              </p>
            </div>

            {/* Stream Content */}
            {streamItems.map((item) => {
              if (item.kind === "asking-path") {
                return (
                  <div key={item.data.id} className="relative">
                    <AskingPathBubble
                      data={item.data}
                      currentUserId={CURRENT_USER.id}
                      onAvatarClick={(user) =>
                        setActivePopoverUser({ user, messageId: item.data.id })
                      }
                    />
                    {activePopoverUser?.messageId === item.data.id && (
                      <UserProfilePopover
                        user={activePopoverUser.user}
                        onClose={() => setActivePopoverUser(null)}
                      />
                    )}
                  </div>
                );
              }

              if (item.data.type === "incoming") {
                return (
                  <div key={item.data.id} className="relative">
                    <IncomingChatBubble
                      message={item.data}
                      onAvatarClick={(user) =>
                        setActivePopoverUser({ user, messageId: item.data.id })
                      }
                    />
                    {activePopoverUser?.messageId === item.data.id && (
                      <UserProfilePopover
                        user={activePopoverUser.user}
                        onClose={() => setActivePopoverUser(null)}
                      />
                    )}
                  </div>
                );
              }

              return (
                <div key={item.data.id} className="relative">
                  <OutgoingChatBubble message={item.data} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Chat Input Bar with Ask Path Trigger & Unread Badge */}
        <footer className="bg-white border-t border-[#DDE2EC] px-4 sm:px-6 py-3.5 shrink-0 z-20">
          <div className="max-w-4xl mx-auto w-full relative">
            {/* Unread Indicator Floating Pill */}
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={scrollToBottom}
                className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] text-white text-xs font-semibold rounded-full shadow-lg transition-all transform hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0]"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>{unreadCount} pesan baru</span>
              </button>
            )}

            {/* Ask Path Trigger Pill right above input */}
            <div className="absolute -top-10 left-0 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsReferencingPath((prev) => !prev)}
                title="Tautkan referensi modul Learning Path ke pertanyaan"
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0] ${
                  isReferencingPath
                    ? "bg-[#1D47BC] text-white ring-2 ring-[#2355E0]/40"
                    : "bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] text-white"
                }`}
              >
                <span className="mr-1">✨</span> Ask Path
                <span className="ml-1.5 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  {isReferencingPath ? "Aktif" : "Tautkan"}
                </span>
              </button>
              <span className="text-[11px] text-[#5B6478] bg-white border border-[#DDE2EC] px-2 py-0.5 rounded-full hidden sm:inline-block">
                Tanyakan materi atau modul praktikum tertentu
              </span>
            </div>

            {/* Input Form with Inline Reference Bar */}
            <form onSubmit={handleSendMessage} className="space-y-2">
              {/* Inline Path-Reference Bar */}
              {isReferencingPath && (
                <div className="bg-[#E6ECFD]/70 border-l-4 border-[#2355E0] rounded-lg px-3.5 py-2 flex items-center justify-between gap-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <BookOpen className="w-4 h-4 text-[#2355E0] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10.5px] font-semibold text-[#2355E0] uppercase tracking-wider">
                        Merujuk Modul Learning Path:
                      </div>
                      <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className="w-full text-xs font-medium text-[#101828] bg-transparent border-0 p-0 focus:outline-none cursor-pointer truncate"
                      >
                        {AVAILABLE_MODULES.map((mod) => (
                          <option key={mod.value} value={mod.value} className="text-[#101828] bg-white">
                            {mod.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReferencingPath(false)}
                    aria-label="Batalkan tautan path"
                    title="Batal merujuk path"
                    className="p-1 text-[#5B6478] hover:text-[#101828] rounded-md hover:bg-white/60 transition cursor-pointer shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Input Row */}
              <div className="flex items-center gap-2.5">

                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      isReferencingPath
                        ? "Tulis pertanyaanmu mengenai modul ini..."
                        : `Tulis pesan atau tanya path di #${activeChannel}...`
                    }
                    className="w-full h-10 pl-3.5 pr-20 rounded-lg border border-[#DDE2EC] bg-white text-[#101828] text-xs sm:text-sm placeholder-[#5B6478] focus:outline-none focus:ring-2 focus:ring-[#2355E0] focus:border-transparent transition-all"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1 text-[#5B6478]">
                    <button
                      type="button"
                      aria-label="Lampirkan File"
                      className="p-1 hover:text-[#101828] transition-colors cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Tambahkan Emoji"
                      className="p-1 hover:text-[#101828] transition-colors cursor-pointer"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  aria-label="Kirim Pesan"
                  className="h-10 px-4 bg-[#2355E0] hover:bg-[#1D47BC] active:bg-[#1A3DA6] disabled:opacity-40 text-white text-xs font-medium rounded-lg flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2355E0]"
                >
                  <Send className="w-3.5 h-3.5 mr-1" />
                  <span className="hidden sm:inline">Kirim</span>
                </button>
              </div>
            </form>
          </div>
        </footer>
    </div>
  );
}
