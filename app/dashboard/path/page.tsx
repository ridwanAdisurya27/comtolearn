"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Lock,
  PlayCircle,
} from "lucide-react";

export default function LearningPathPage() {
  const modules = [
    {
      id: 1,
      title: "Modul 1: Dasar Linux & Konfigurasi ROS2 Humble",
      status: "completed",
      duration: "2 Jam",
      tasks: "4/4 Tugas",
      desc: "Instalasi Ubuntu 22.04 LTS, setting bashrc colcon workspace, dan pengenalan ROS2 CLI.",
    },
    {
      id: 2,
      title: "Modul 2: Komunikasi Antar Node (Topics & Services)",
      status: "completed",
      duration: "3 Jam",
      tasks: "5/5 Tugas",
      desc: "Pembuatan Node publisher & subscriber C++/Python, interface custom msg, dan logging.",
    },
    {
      id: 3,
      title: "Modul 3: ROS2 Nodes & Sensor Fusion (LiDAR + IMU)",
      status: "active",
      duration: "4 Jam",
      tasks: "3/5 Selesai",
      desc: "Integrasi driver RPLidar A1, filtering noise accelerometer MPU6050, dan publish odometri robot.",
    },
    {
      id: 4,
      title: "Modul 4: Pemetaan SLAM & Navigasi Autonomous Nav2",
      status: "locked",
      duration: "5 Jam",
      tasks: "0/6 Tugas",
      desc: "Cartographer SLAM, costmap tuning 2D, dan implementasi waypoints planner rover.",
    },
    {
      id: 5,
      title: "Modul 5: Proyek Akhir: Uji Coba Navigasi Lapangan",
      status: "locked",
      duration: "6 Jam",
      tasks: "0/3 Proyek",
      desc: "Demonstrasi robot rover otonom menghindari rintangan statis dan dinamis di arena lab.",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">
      {/* Top Header */}
      <header className="h-12 border-b border-line px-4 flex items-center justify-between shrink-0 shadow-xs bg-surface">
        <div className="flex items-center space-x-3 truncate">
          <Link
            href="/dashboard"
            className="text-secondary hover:text-on-surface p-1 rounded-md hover:bg-surface-dim transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="w-[1px] h-4 bg-line" />
          <h1 className="text-on-surface font-bold text-sm truncate">
            Syllabus: Autonomous Rover v2 (ROS2 Humble)
          </h1>
          <span className="bg-accent-soft text-primary-container text-[10px] font-bold px-2 py-0.5 rounded-full border border-primary-container/20">
            Path Aktif
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="text-xs text-primary-container hover:underline font-semibold flex items-center gap-1"
          >
            <span>Kembali ke Chat</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Path Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Progress Overview Card */}
        <section className="bg-gradient-to-r from-primary to-primary-container text-white p-6 rounded-2xl shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                UKM Robotika &amp; IoT • Jalur Keahlian
              </span>
              <h2 className="text-xl font-extrabold mt-1">
                Autonomous Rover &amp; Sensor Fusion
              </h2>
              <p className="text-xs text-white/85 mt-1 max-w-xl">
                Kurikulum terstruktur untuk mahasiswa yang ingin menguasai ROS2,
                sistem kontrol navigasi robotika otonom, dan pemetaan SLAM.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl text-center shrink-0">
              <span className="text-[11px] block text-white/80 uppercase font-semibold">
                Total Progres
              </span>
              <span className="text-2xl font-black">60%</span>
              <span className="text-[10px] block text-accent-mint font-bold mt-0.5">
                Modul 3 Aktif
              </span>
            </div>
          </div>
        </section>

        {/* Modules Timeline List */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-secondary px-1">
            Daftar Modul Pembelajaran
          </h3>

          <div className="space-y-3">
            {modules.map((m) => (
              <div
                key={m.id}
                className={`p-4 rounded-xl border transition-all ${
                  m.status === "active"
                    ? "bg-accent-soft/40 border-primary-container/40 shadow-xs ring-1 ring-primary-container/20"
                    : m.status === "completed"
                    ? "bg-surface border-line"
                    : "bg-surface-dim/60 border-line opacity-75"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {m.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-accent-mint" />
                      ) : m.status === "active" ? (
                        <PlayCircle className="w-5 h-5 text-primary-container" />
                      ) : (
                        <Lock className="w-5 h-5 text-secondary" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-on-surface">
                        {m.title}
                      </h4>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">
                        {m.desc}
                      </p>

                      <div className="flex items-center gap-4 mt-2.5 text-[11px] text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {m.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          {m.tasks}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {m.status === "active" ? (
                      <button className="px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors">
                        Lanjutkan
                      </button>
                    ) : m.status === "completed" ? (
                      <span className="text-[11px] font-semibold text-accent-mint bg-accent-mint-soft px-2.5 py-1 rounded-full">
                        Selesai
                      </span>
                    ) : (
                      <span className="text-[11px] text-secondary">Terkunci</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

