"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Link2,
  Play,
  Plus,
  Save,
  Shield,
  Trash2,
  Video,
  X,
  Sliders,
} from "lucide-react";

export type LinkType = "video" | "documentation" | "github" | "article";

export interface LinkItem {
  id: number;
  title: string;
  url: string;
  type: LinkType;
  description: string;
  verificationType: "click" | "watch_time" | "either";
  minWatchSeconds: number;
  platformName: string;
  isRequired: boolean;
}

interface LinkEditorProps {
  onClose?: () => void;
  onSave?: (links: LinkItem[]) => void;
}

const initialLinks: LinkItem[] = [
  {
    id: 1,
    title: "Tutorial Integrasi LiDAR & IMU Sensor Fusion di ROS2 Humble",
    url: "https://www.youtube.com/watch?v=sample-ros2-fusion",
    type: "video",
    platformName: "YouTube Video",
    description:
      "Tonton rekaman hands-on sensor fusion menggunakan EKF ROS2 Bag sebelum memulai praktikum simulasi di RViz2.",
    verificationType: "watch_time",
    minWatchSeconds: 60,
    isRequired: true,
  },
  {
    id: 2,
    title: "Dokumentasi Resmi Navigation2 (Nav2) - Configuring EKF",
    url: "https://docs.nav2.org/configuration/packages/configuring-ekf.html",
    type: "documentation",
    platformName: "Dokumentasi Resmi",
    description:
      "Pelajari panduan parameter matriks kovarians Process Noise Q dan Measurement Noise R pada modul robot_localization.",
    verificationType: "click",
    minWatchSeconds: 0,
    isRequired: true,
  },
  {
    id: 3,
    title: "Repositori Source Package robot_localization",
    url: "https://github.com/cra-ros-pkg/robot_localization",
    type: "github",
    platformName: "GitHub Repository",
    description:
      "Kode sumber driver ekf_node untuk referensi struktur launch file YAML dan transformasi TF2.",
    verificationType: "click",
    minWatchSeconds: 0,
    isRequired: false,
  },
];

export default function LinkEditor({ onClose, onSave }: LinkEditorProps) {
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [activeLinkId, setActiveLinkId] = useState<number>(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [simulatedVerified, setSimulatedVerified] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(
    null
  );

  const activeLink = links.find((l) => l.id === activeLinkId) || links[0];

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateActiveLink = (patch: Partial<LinkItem>) => {
    setLinks((prev) =>
      prev.map((item) => (item.id === activeLink.id ? { ...item, ...patch } : item))
    );
  };

  const handleAddLink = () => {
    const newId = Date.now();
    const newLink: LinkItem = {
      id: newId,
      title: "Tautan Referensi Baru",
      url: "https://example.com/docs",
      type: "documentation",
      platformName: "Dokumentasi Web",
      description: "Tuliskan instruksi materi referensi bagi mahasiswa di sini...",
      verificationType: "click",
      minWatchSeconds: 0,
      isRequired: true,
    };
    setLinks((prev) => [...prev, newLink]);
    setActiveLinkId(newId);
    showToast("Tautan Ditambahkan", `Tautan baru berhasil dibuat.`);
  };

  const handleDuplicateLink = (id: number) => {
    const target = links.find((l) => l.id === id);
    if (!target) return;
    const duplicated: LinkItem = {
      ...target,
      id: Date.now(),
      title: `${target.title} (Salinan)`,
    };
    setLinks((prev) => [...prev, duplicated]);
    setActiveLinkId(duplicated.id);
    showToast("Tautan Diduplikasi", "Salinan tautan berhasil dibuat.");
  };

  const handleDeleteLink = (id: number) => {
    if (links.length <= 1) {
      showToast("Gagal Hapus", "Modul harus memiliki minimal 1 tautan referensi.");
      return;
    }
    const filtered = links.filter((l) => l.id !== id);
    setLinks(filtered);
    setActiveLinkId(filtered[0].id);
    showToast("Tautan Dihapus", "Tautan referensi berhasil dihapus.");
  };

  const handleSaveDraft = () => {
    showToast("Draf Tersimpan", "Seluruh konfigurasi tautan berhasil disimpan.");
  };

  const handlePublish = () => {
    showToast("Modul Dipublikasikan", "Daftar referensi dan tautan modul telah diperbarui.");
    if (onSave) {
      onSave(links);
    }
  };

  const renderTypeIcon = (type: LinkType) => {
    switch (type) {
      case "video":
        return <Video className="w-3.5 h-3.5" />;
      case "github":
        return <Globe className="w-3.5 h-3.5" />;
      case "article":
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="h-full w-full font-sans bg-page-canvas text-on-surface antialiased p-3 sm:p-5 md:p-8 flex items-center justify-center overflow-y-auto">
      <div className="relative w-full max-w-[1080px] max-h-[92vh] flex flex-col bg-surface rounded-2xl shadow-md border border-line overflow-hidden my-auto shrink-0">
        <header className="px-6 py-4 border-b border-line bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-container-soft flex items-center justify-center text-primary-container shrink-0 border border-primary-container/20">
              <Link2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-on-surface leading-snug">
                  Editor Tautan &amp; Referensi Eksternal
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-surface-dim text-primary-container font-semibold flex items-center gap-1.5 border border-line">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                  <span>{links.length} Tautan Terdaftar</span>
                </span>
              </div>
              <p className="text-xs text-secondary mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="shrink-0">Modul 3: ROS2 Nodes &amp; Sensor Fusion (LiDAR + IMU)</span>
                <span className="shrink-0">•</span>
                <span className="text-accent-mint font-semibold flex items-center gap-1 shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Gatekeeper Kunjungan Aktif</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setSimulatedVerified(false);
                setIsPreviewOpen(true);
              }}
              className="h-9 px-3.5 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-secondary" />
              <span>Pratinjau Mahasiswa</span>
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="h-9 px-3.5 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4 text-secondary" />
              <span>Simpan Draf</span>
            </button>

            {onClose && (
              <>
                <div className="h-6 w-[1px] bg-line mx-0.5 hidden sm:block" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup Editor"
                  className="w-9 h-9 rounded-lg hover:bg-surface-dim text-secondary hover:text-on-surface flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-line bg-page-canvas min-h-0">
          <aside className="md:col-span-4 p-4 flex flex-col gap-3 bg-surface/50 min-h-0">
            <div className="flex items-center justify-between pb-1">
              <div>
                <h3 className="text-[14px] font-bold text-on-surface">Daftar Tautan Materi</h3>
                <p className="text-[11px] text-secondary">Urutan referensi eksternal modul</p>
              </div>
              <button
                type="button"
                onClick={handleAddLink}
                className="h-8 px-2.5 rounded-lg bg-primary-container-soft text-primary-container hover:bg-primary-container hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors border border-primary-container/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
              {links.map((link, idx) => {
                const isActive = link.id === activeLink.id;
                return (
                  <article
                    key={link.id}
                    onClick={() => setActiveLinkId(link.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 border relative ${
                      isActive
                        ? "bg-primary-container-soft/60 border-primary-container shadow-xs"
                        : "bg-surface border-line hover:border-line hover:bg-surface-dim/40"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary-container rounded-r" />
                    )}
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-bold ${
                          isActive ? "text-primary-container" : "text-on-surface"
                        }`}
                      >
                        Tautan {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-dim text-secondary border border-line">
                        {link.platformName}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-on-surface truncate">
                      {link.title}
                    </h4>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-secondary border-t border-line/60">
                      <span className="flex items-center gap-1 text-accent-mint font-medium text-[10px]">
                        <Shield className="w-3 h-3" />
                        <span>
                          {link.verificationType === "watch_time"
                            ? `Tonton ${link.minWatchSeconds}d`
                            : "Verifikasi Klik"}
                        </span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateLink(link.id);
                          }}
                          title="Duplikasi Tautan"
                          className="p-1 rounded hover:bg-surface-dim text-secondary hover:text-on-surface transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLink(link.id);
                          }}
                          title="Hapus Tautan"
                          className="p-1 rounded hover:bg-destructive/15 text-secondary hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between text-[11px] text-secondary mt-auto">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-mint" />
                <span>Penyimpanan Otomatis Aktif</span>
              </span>
              <span>Tersimpan</span>
            </div>
          </aside>

          <main className="md:col-span-8 p-4 md:p-6 flex flex-col gap-5 bg-surface overflow-y-auto min-h-0">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary-container-soft text-primary-container text-xs font-bold border border-primary-container/20">
                  Mengedit Tautan {links.findIndex((l) => l.id === activeLink.id) + 1} dari{" "}
                  {links.length}
                </span>
                <span className="text-xs text-secondary">Tipe: {activeLink.platformName}</span>
              </div>
              <span className="text-xs text-secondary flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-accent-mint" />
                <span>Status Gerbang Aktif</span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Judul Tautan / Materi
              </label>
              <input
                type="text"
                value={activeLink.title}
                onChange={(e) => handleUpdateActiveLink({ title: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface border border-line text-xs sm:text-sm font-semibold text-on-surface focus:outline-none focus:border-primary-container"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface flex items-center justify-between">
                <span>URL Tujuan (Web / YouTube / GitHub)</span>
                <a
                  href={activeLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-container hover:underline text-[11px] font-normal flex items-center gap-1"
                >
                  <span>Buka Uji Coba</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <div className="relative flex items-center">
                <input
                  type="url"
                  value={activeLink.url}
                  onChange={(e) => handleUpdateActiveLink({ url: e.target.value })}
                  placeholder="https://..."
                  className="w-full h-10 pl-3 pr-9 rounded-lg bg-surface border border-line text-xs font-mono text-on-surface focus:outline-none focus:border-primary-container"
                />
                <ExternalLink className="w-4 h-4 absolute right-3 text-secondary pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Kategori Sumber</label>
                <select
                  value={activeLink.type}
                  onChange={(e) => {
                    const newType = e.target.value as LinkType;
                    let defaultPlatform = "Dokumentasi Web";
                    if (newType === "video") defaultPlatform = "YouTube Video";
                    if (newType === "github") defaultPlatform = "GitHub Repository";
                    if (newType === "article") defaultPlatform = "Artikel Teknis";

                    handleUpdateActiveLink({
                      type: newType,
                      platformName: defaultPlatform,
                      verificationType: newType === "video" ? "watch_time" : "click",
                      minWatchSeconds: newType === "video" ? 60 : 0,
                    });
                  }}
                  className="h-10 px-3 rounded-lg bg-surface border border-line text-xs text-on-surface focus:outline-none focus:border-primary-container"
                >
                  <option value="video">Video Tutorial (YouTube / Streaming)</option>
                  <option value="documentation">Dokumentasi Resmi / Panduan</option>
                  <option value="github">Repositori GitHub / Kode Sumber</option>
                  <option value="article">Paper / Artikel Jurnal Teknis</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-on-surface">Status Kelulusan</label>
                <div className="h-10 px-3 rounded-lg bg-surface-dim border border-line flex items-center justify-between">
                  <span className="text-xs text-on-surface">Wajib dikerjakan</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeLink.isRequired}
                      onChange={(e) =>
                        handleUpdateActiveLink({ isRequired: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-line peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-container" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Instruksi &amp; Uraian Referensi
              </label>
              <textarea
                rows={3}
                value={activeLink.description}
                onChange={(e) => handleUpdateActiveLink({ description: e.target.value })}
                placeholder="Jelaskan ringkasan materi atau bagian penting yang harus diperhatikan mahasiswa..."
                className="w-full p-3 rounded-lg border border-line bg-surface text-on-surface text-xs leading-relaxed focus:outline-none focus:border-primary-container resize-y"
              />
            </div>

            <div className="rounded-xl border border-line p-3.5 bg-surface-dim/40 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                    <Shield className="w-4 h-4 text-primary-container" />
                    <span>Aturan Gatekeeper Verifikasi Tautan</span>
                  </div>
                  <p className="text-[11px] text-secondary leading-relaxed">
                    Mengharuskan mahasiswa melakukan interaksi nyata dengan tautan sebelum tombol
                    modul praktikum berikutnya dapat terbuka.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 rounded-lg bg-surface border border-line flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-on-surface">Metode Verifikasi</label>
                  <select
                    value={activeLink.verificationType}
                    onChange={(e) =>
                      handleUpdateActiveLink({
                        verificationType: e.target.value as LinkItem["verificationType"],
                      })
                    }
                    className="h-8 px-2 rounded bg-surface border border-line text-xs text-on-surface focus:outline-none focus:border-primary-container"
                  >
                    <option value="click">Verifikasi Klik (Buka Tautan)</option>
                    <option value="watch_time">Tonton Video (Durasi Minimal)</option>
                    <option value="either">Fleksibel (Salah Satu Terpenuhi)</option>
                  </select>
                  <span className="text-[10px] text-secondary">
                    {activeLink.verificationType === "watch_time"
                      ? "Mahasiswa wajib memutar video hingga target durasi."
                      : "Sistem mencatat pembukaan tab/tautan eksternal."}
                  </span>
                </div>

                {activeLink.verificationType !== "click" && (
                  <div className="p-2.5 rounded-lg bg-surface border border-line flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Target Minimal Tonton</span>
                      <span className="text-primary-container font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{activeLink.minWatchSeconds} Detik</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={180}
                      step={5}
                      value={activeLink.minWatchSeconds}
                      onChange={(e) =>
                        handleUpdateActiveLink({ minWatchSeconds: Number(e.target.value) })
                      }
                      className="w-full accent-primary-container h-1.5 bg-line rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-secondary">
                      Validasi terpenuhi setelah mahasiswa menonton video selama durasi ini.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        <footer className="px-6 py-3.5 border-t border-line bg-surface flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-lg bg-surface hover:bg-surface-dim text-secondary hover:text-on-surface text-xs font-semibold border border-line transition-all"
          >
            Batal / Tutup
          </button>

          <div className="flex items-center gap-2.5 justify-end">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="h-9 px-4 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line shadow-xs transition-all"
            >
              Simpan Draf
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="h-9 px-5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan &amp; Publikasikan Tautan</span>
            </button>
          </div>
        </footer>
      </div>

      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 bg-brand-dark/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-surface rounded-2xl max-w-xl w-full p-5 shadow-xl flex flex-col gap-4 border border-line"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary-container-soft text-primary-container text-[11px] font-bold uppercase tracking-wider border border-primary-container/20">
                  Pratinjau Mahasiswa
                </span>
                <span className="text-xs text-secondary truncate">
                  {activeLink.platformName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-surface-dim text-secondary flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold text-on-surface">
                {activeLink.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {activeLink.description}
              </p>

              <div className="p-3.5 rounded-xl bg-surface-dim border border-line flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    {renderTypeIcon(activeLink.type)}
                    <span>Akses Sumber Belajar</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-surface text-secondary border border-line">
                    {activeLink.isRequired ? "Wajib Selesai" : "Opsional"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <a
                    href={activeLink.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setSimulatedVerified(true)}
                    className="h-8 px-3.5 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Kunjungi Tautan</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {activeLink.verificationType === "watch_time" && (
                    <button
                      type="button"
                      onClick={() => setSimulatedVerified(true)}
                      className="h-8 px-3 rounded-lg bg-surface hover:bg-surface-dim border border-line text-xs font-medium text-on-surface flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-primary-container" />
                      <span>Simulasi Tonton ({activeLink.minWatchSeconds}s)</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between text-xs">
                <span className="text-secondary">Status Verifikasi Sistem:</span>
                {simulatedVerified ? (
                  <span className="text-accent-mint font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Lolos Verifikasi (Modul Terbuka)</span>
                  </span>
                ) : (
                  <span className="text-secondary font-medium">Belum diverifikasi</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="h-8 px-4 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-dark text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 border border-white/10 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-accent-mint shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white">{toastMessage.title}</span>
            <span className="text-[11px] text-white/80">{toastMessage.desc}</span>
          </div>
        </div>
      )}
    </div>
  );
}

