"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  Bookmark,
  Gift,
  Hash,
  Plus,
  Search,
  Send,
  Smile,
  Users,
} from "lucide-react";

export default function DashboardChatPage() {
  const [activeChannel, setActiveChannel] = useState("umum");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Aditya Labs",
      role: "Asisten Lab",
      avatar: "AL",
      avatarBg: "bg-primary-container",
      time: "Hari ini pukul 09:15",
      content:
        "Halo kawan-kawan UKM Robotika! Workshop praktikum Modul 3: ROS2 Nodes Publisher & Subscriber akan diadakan via lab fisik dan streaming sore ini pukul 16.00 WIB. Pastikan dependensi rclpy dan simulator Gazebo sudah terpasang ya!",
      reactions: [
        { emoji: "🤖", count: 14 },
        { emoji: "🔥", count: 9 },
      ],
    },
    {
      id: 2,
      sender: "Dimas Surya",
      role: "Anggota",
      avatar: "DS",
      avatarBg: "bg-accent-mint",
      time: "Hari ini pukul 10:22",
      content:
        "Bang Dimas mau tanya, pas coba build package pakai colcon build --symlink-install muncul error CMake target link library buat sensor lidar-nya. Ada yang ngalamin juga kah?",
      codeSnippet: {
        title: "// Terminal Output Error",
        error: "CMake Error at CMakeLists.txt:24 (find_package):",
        desc: 'By not providing "Findrplidar_ros.cmake" in CMAKE_MODULE_PATH this project has asked CMake to find a package configuration file provided by "rplidar_ros"...',
      },
      reactions: [],
    },
    {
      id: 3,
      sender: "Fathur Syarif",
      role: "Ketua UKM",
      avatar: "FS",
      avatarBg: "bg-amber-600",
      time: "Hari ini pukul 10:28",
      content:
        "@Dimas Surya Itu driver lidar ros2-nya belum di-clone ke direktori src/ workspace kamu Dim. Coba run command ini dulu di terminal:",
      commandSnippet:
        "git clone -b ros2 https://github.com/Slamtec/rplidar_ros.git src/rplidar_ros",
      postscript:
        "Setelah itu jalanin rosdep install --from-paths src --ignore-src -r -y baru colcon build lagi. Pasti aman! 👍",
      reactions: [
        { emoji: "🙏", count: 4 },
        { emoji: "💡", count: 7 },
      ],
    },
    {
      id: 4,
      sender: "Rian Pratama",
      role: "Anggota",
      avatar: "RP",
      avatarBg: "bg-primary-container",
      time: "Hari ini pukul 10:45",
      content:
        "Mantap Mas Fathur! Sekalian izin konfirmasi, untuk hardware robot rover yang mau dites nanti sore di Lab 1 baterai LiPo 3S 2200mAh-nya sudah saya charge penuh ya. Sensor IMU MPU6050 juga sudah terpasang di pin I2C ESP32. Siap buat uji coba odometri! 🚀",
      reactions: [],
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "Rian Pratama",
        role: "Anggota",
        avatar: "RP",
        avatarBg: "bg-primary-container",
        time:
          "Hari ini pukul " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: message,
        reactions: [],
      },
    ]);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Channel Header Bar */}
      <header className="h-12 border-b border-line px-4 flex items-center justify-between shrink-0 shadow-xs bg-surface">
        <div className="flex items-center space-x-2 truncate">
          <Hash className="w-5 h-5 text-secondary" />
          <span className="text-on-surface font-bold text-sm">
            {activeChannel}
          </span>
          <span className="w-[1px] h-4 bg-line mx-2" />
          <p className="text-xs text-secondary truncate hidden sm:block">
            Diskusi seputar robotika, modul mingguan, dan proyek riset kampus
          </p>
        </div>

        <div className="flex items-center space-x-3 text-secondary shrink-0">
          <button aria-label="Notifikasi" className="hover:text-on-surface transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button aria-label="Pesan Disematkan" className="hover:text-on-surface transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
          <button aria-label="Daftar Anggota" className="text-on-surface">
            <Users className="w-4 h-4" />
          </button>
          <div className="relative hidden md:block">
            <input
              className="bg-surface-dim text-xs text-on-surface placeholder:text-secondary px-2.5 py-1 pr-6 rounded-md border border-line focus:outline-none focus:border-primary-container w-36 focus:w-48 transition-all"
              placeholder={`Cari di #${activeChannel}`}
              type="text"
            />
            <Search className="w-3.5 h-3.5 absolute right-2 top-1.5 text-secondary" />
          </div>
        </div>
      </header>

      {/* Top Pinned Learning Path Banner */}
      <section
        aria-label="Widget Modul Aktif"
        className="bg-accent-soft/60 border-b border-primary-container/20 px-4 py-2.5 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-container/15 text-primary-container rounded-lg">
            <span className="material-symbols-outlined text-[20px]">
              verified
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary-container">
                Learning Path Aktif UKM
              </span>
              <span className="text-[10px] bg-primary-container/10 text-primary-container px-2 py-0.5 rounded font-mono font-semibold">
                Modul 3 / 5
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-on-surface">
              ROS2 Nodes &amp; Sensor Fusion (LiDAR + IMU)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs text-secondary mb-1">
              Progres Angkatan:{" "}
              <strong className="text-on-surface">60% Selesai</strong>
            </span>
            <div className="w-36 bg-line rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary-container h-full rounded-full"
                style={{ width: "60%" }}
              />
            </div>
          </div>
          <Link
            href="/dashboard/path"
            className="bg-primary-container hover:bg-primary-hover text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
          >
            Buka Modul
          </Link>
        </div>
      </section>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-surface">
        <div className="mt-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-surface-dim flex items-center justify-center text-xl mb-2 text-secondary">
            <Hash className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-on-surface">
            Selamat datang di #{activeChannel}!
          </h1>
          <p className="text-xs text-secondary mt-1">
            Ini adalah saluran diskusi utama mahasiswa UKM Robotika &amp; IoT.
            Diskusikan progres, debugging ROS2, dan proyek riset kampus di
            sini.
          </p>
          <div className="w-full h-[1px] bg-line mt-4" />
        </div>

        {messages.map((msg) => (
          <article
            key={msg.id}
            className="flex items-start space-x-3 group hover:bg-page-canvas -mx-4 px-4 py-2 rounded-lg transition-colors"
          >
            <div
              className={`w-9 h-9 rounded-full ${msg.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5 shadow-xs`}
            >
              <span>{msg.avatar}</span>
            </div>
            <div className="flex-1 min-w-0 leading-relaxed text-xs">
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-on-surface hover:underline cursor-pointer">
                  {msg.sender}
                </span>
                <span className="bg-accent-soft text-primary-container text-[10px] font-bold px-1.5 py-0.5 rounded border border-primary-container/20">
                  {msg.role}
                </span>
                <time className="text-[11px] text-secondary">{msg.time}</time>
              </div>
              <p className="text-on-surface mt-1 leading-normal text-[13px]">
                {msg.content}
              </p>

              {msg.codeSnippet && (
                <div className="mt-2 bg-surface-dim p-3 rounded-xl border border-line font-mono text-xs text-on-surface max-w-xl">
                  <div className="text-secondary text-[10px] uppercase font-bold mb-1">
                    {msg.codeSnippet.title}
                  </div>
                  <p className="text-rose-600 font-semibold">
                    {msg.codeSnippet.error}
                  </p>
                  <p className="text-secondary mt-0.5">{msg.codeSnippet.desc}</p>
                </div>
              )}

              {msg.commandSnippet && (
                <div className="mt-2 bg-surface-dim p-2.5 rounded-xl border border-line font-mono text-xs max-w-xl flex justify-between items-center">
                  <code className="text-on-surface truncate mr-2">
                    {msg.commandSnippet}
                  </code>
                  <button
                    type="button"
                    onClick={() =>
                      navigator.clipboard.writeText(msg.commandSnippet || "")
                    }
                    className="text-secondary hover:text-on-surface hover:bg-surface border border-line px-2 py-1 rounded text-[11px] transition-colors shrink-0"
                  >
                    Salin
                  </button>
                </div>
              )}

              {msg.postscript && (
                <p className="text-on-surface mt-1 text-[13px]">
                  {msg.postscript}
                </p>
              )}

              {msg.reactions.length > 0 && (
                <div className="flex items-center space-x-2 mt-2">
                  {msg.reactions.map((r, i) => (
                    <button
                      key={i}
                      type="button"
                      className="flex items-center space-x-1.5 bg-surface-dim hover:bg-line border border-line px-2 py-0.5 rounded text-xs transition-colors"
                    >
                      <span>{r.emoji}</span>
                      <span className="text-on-surface font-bold">{r.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Message Input Bar */}
      <div className="px-4 pb-4 shrink-0 bg-surface">
        <form
          onSubmit={handleSendMessage}
          className="bg-surface-dim rounded-xl flex items-center px-4 py-2 space-x-3 border border-line shadow-xs focus-within:border-primary-container"
        >
          <button
            type="button"
            aria-label="Unggah File"
            className="bg-surface hover:bg-line p-1.5 rounded-full text-secondary hover:text-on-surface transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <input
            className="bg-transparent border-0 text-on-surface placeholder:text-secondary focus:outline-none w-full text-xs py-1 px-0"
            placeholder={`Kirim pesan ke #${activeChannel}...`}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center space-x-2 text-secondary shrink-0">
            <button
              type="button"
              aria-label="Hadiah Pembelajaran"
              className="hover:text-on-surface transition-colors"
            >
              <Gift className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Pilih Emoji"
              className="hover:text-on-surface transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
            <button
              type="submit"
              aria-label="Kirim Pesan"
              className="text-primary-container hover:text-primary-hover p-1 transition-colors disabled:opacity-40"
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        <div className="text-[11px] text-secondary mt-1 px-1 flex justify-between">
          <span>
            Tekan <strong className="text-on-surface">Enter</strong> untuk kirim
          </span>
          <span>ComtoLearn Guild Platform</span>
        </div>
      </div>
    </div>
  );
}
