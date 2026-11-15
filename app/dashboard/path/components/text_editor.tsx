"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  FileCode,
  ImageIcon,
  List,
  Plus,
  RefreshCw,
  Save,
  Shield,
  Trash2,
  X,
  Clock,
  History,
  CheckSquare,
  Network,
  Sigma,
} from "lucide-react";

export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  typeSubtitle: string;
  typeIcon: "schema" | "code" | "functions" | "checklist";
  content: string;
  wordCount: number;
  diagramName?: string;
  diagramSize?: string;
  diagramDimensions?: string;
  scrollGateEnabled: boolean;
  minScrollPercent: number;
  minReadTimeSeconds: number;
}

interface TextEditorProps {
  onClose?: () => void;
  onSave?: (slides: SlideItem[]) => void;
}

const initialSlides: SlideItem[] = [
  {
    id: 1,
    slideNumber: 1,
    title: "Prinsip Sensor Fusion dengan Extended Kalman Filter (EKF)",
    typeSubtitle: "Teks & Diagram Arsitektur",
    typeIcon: "schema",
    wordCount: 380,
    content: `### 1. Pendahuluan Extended Kalman Filter (EKF)
Pada sistem robotika otonom, estimasi pose (posisi dan orientasi) yang hanya mengandalkan data Wheel Odometry kerap mengalami drifting kumulatif akibat slippage mekanis. Modul \`robot_localization\` memanfaatkan algoritma EKF berulang 15-state untuk memadukan vektor percepatan sudut dari modul IMU 9-DOF dengan pembacaan pose odometri dari LiDAR scan matcher.

### 2. Tiga Komponen Kunci Arsitektur Fusion:
- **State Prediction Step:** Menggunakan model kinematika diferensial untuk menghitung probabilitas apriori.
- **Measurement Update Matrix:** Memetakan sensor observasi ke ruang koordinat \`odom\` dan \`base_link\`.
- **Covariance Tuning (Q & R):** Menyeimbangkan sensitivitas noise pengukuran aktual lapangan.`,
    diagramName: "arsitektur_sensor_fusion.png",
    diagramSize: "412 KB",
    diagramDimensions: "Dimensi: 1920 × 1080 px • Monokrom Kontras Tinggi",
    scrollGateEnabled: true,
    minScrollPercent: 100,
    minReadTimeSeconds: 30,
  },
  {
    id: 2,
    slideNumber: 2,
    title: "Konfigurasi robot_localization (ekf.yaml)",
    typeSubtitle: "Code Snippet & YAML",
    typeIcon: "code",
    wordCount: 420,
    content: `### Konfigurasi Node EKF ROS2
Parameter Kalman Filter disematkan dalam file launch YAML. Pastikan differential mode diaktifkan untuk IMU guna mengeliminasi akumulasi bias sudut yaw secara berkala.

\`\`\`yaml
ekf_filter_node:
  ros__parameters:
    frequency: 30.0
    sensor_timeout: 0.1
    two_d_mode: true
    publish_tf: true
    odom_frame: odom
    base_link_frame: base_link
    world_frame: odom
\`\`\``,
    scrollGateEnabled: true,
    minScrollPercent: 100,
    minReadTimeSeconds: 25,
  },
  {
    id: 3,
    slideNumber: 3,
    title: "Kovarians Matriks IMU & Odometri",
    typeSubtitle: "Teks & Persamaan LaTeX",
    typeIcon: "functions",
    wordCount: 290,
    content: `### Perhitungan Kovarians EKF
Formulasi matematika Extended Kalman Filter memperhitungkan matriks kovarians proses Q dan pengukuran R:

$$x_k = F_k x_{k-1} + B_k u_k + w_k$$
$$P_k = F_k P_{k-1} F_k^T + Q_k$$

Nilai kovarians diagonal yang terlalu kecil pada IMU akan menyebabkan filter terlalu percaya pada orientasi gyro yang rentan getaran.`,
    scrollGateEnabled: true,
    minScrollPercent: 100,
    minReadTimeSeconds: 20,
  },
  {
    id: 4,
    slideNumber: 4,
    title: "Troubleshooting & Parameter Tuning",
    typeSubtitle: "Teks & Checklist Validasi",
    typeIcon: "checklist",
    wordCount: 180,
    content: `### Checklist Validasi Sistem
Sebelum menjalankan navigasi autonomous Nav2 di lapangan nyata:

- [ ] Pastikan frame transform tree \`odom -> base_link\` dipublikasikan secara kontinyu tanpa diskontinuitas.
- [ ] Verifikasi frekuensi publikasi topik \`/imu/data\` stabil pada minimal 100 Hz.
- [ ] Lakukan kalibrasi bias sensor akselerometer diam selama 30 detik sebelum rover bergerak.`,
    scrollGateEnabled: true,
    minScrollPercent: 90,
    minReadTimeSeconds: 15,
  },
];

export default function TextEditor({ onClose, onSave }: TextEditorProps) {
  const [slides, setSlides] = useState<SlideItem[]>(initialSlides);
  const [activeSlideId, setActiveSlideId] = useState<number>(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(
    null
  );

  const activeSlide = slides.find((s) => s.id === activeSlideId) || slides[0];

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateActiveSlide = (patch: Partial<SlideItem>) => {
    setSlides((prev) =>
      prev.map((s) => {
        if (s.id !== activeSlide.id) return s;
        const updated = { ...s, ...patch };
        if (patch.content !== undefined) {
          updated.wordCount = patch.content.trim().split(/\s+/).filter(Boolean).length;
        }
        return updated;
      })
    );
  };

  const handleAddSlide = () => {
    const nextNumber = slides.length + 1;
    const newId = Date.now();
    const newSlide: SlideItem = {
      id: newId,
      slideNumber: nextNumber,
      title: `Sub-Materi Baru ${nextNumber}`,
      typeSubtitle: "Teks Pembelajaran",
      typeIcon: "schema",
      wordCount: 0,
      content: "### Judul Pembahasan Baru\nTuliskan uraian materi di sini...",
      scrollGateEnabled: true,
      minScrollPercent: 100,
      minReadTimeSeconds: 20,
    };
    setSlides((prev) => [...prev, newSlide]);
    setActiveSlideId(newId);
    showToast("Slide Ditambahkan", `Slide ${nextNumber} berhasil dibuat.`);
  };

  const handleDuplicateSlide = (id: number) => {
    const target = slides.find((s) => s.id === id);
    if (!target) return;
    const newId = Date.now();
    const duplicated: SlideItem = {
      ...target,
      id: newId,
      slideNumber: slides.length + 1,
      title: `${target.title} (Salinan)`,
    };
    setSlides((prev) => [...prev, duplicated]);
    setActiveSlideId(newId);
    showToast("Slide Diduplikasi", "Salinan materi berhasil dibuat.");
  };

  const handleDeleteSlide = (id: number) => {
    if (slides.length <= 1) {
      showToast("Gagal Hapus", "Materi harus memiliki minimal 1 slide.");
      return;
    }
    const filtered = slides.filter((s) => s.id !== id);
    const reindexed = filtered.map((s, index) => ({
      ...s,
      slideNumber: index + 1,
    }));
    setSlides(reindexed);
    setActiveSlideId(reindexed[0].id);
    showToast("Slide Dihapus", "Slide berhasil dihapus dari modul.");
  };

  const handleSaveDraft = () => {
    showToast("Draf Tersimpan", "Perubahan materi slide berhasil disimpan.");
  };

  const handlePublish = () => {
    showToast("Modul Diperbarui", "Materi slide teks dan diagram berhasil dipublikasikan.");
    if (onSave) {
      onSave(slides);
    }
  };

  const renderTypeIcon = (iconType: SlideItem["typeIcon"]) => {
    switch (iconType) {
      case "code":
        return <FileCode className="w-3.5 h-3.5" />;
      case "functions":
        return <Sigma className="w-3.5 h-3.5" />;
      case "checklist":
        return <CheckSquare className="w-3.5 h-3.5" />;
      default:
        return <Network className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="h-full w-full font-sans bg-page-canvas text-on-surface antialiased p-3 sm:p-5 md:p-8 flex items-center justify-center overflow-y-auto">
      <div className="relative w-full max-w-[1080px] max-h-[92vh] flex flex-col bg-surface rounded-2xl shadow-md border border-line overflow-hidden my-auto shrink-0">
        <header className="px-6 py-4 border-b border-line bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-container-soft flex items-center justify-center text-primary-container shrink-0 border border-primary-container/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-on-surface leading-snug">
                  Editor Materi Teks, Slide &amp; Diagram
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-surface-dim text-primary-container font-semibold flex items-center gap-1.5 border border-line">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                  <span>{slides.length} Slide Terdaftar</span>
                </span>
              </div>
              <p className="text-xs text-secondary truncate mt-0.5 flex items-center gap-2">
                <span>Modul 3: ROS2 Nodes &amp; Sensor Fusion (LiDAR + IMU)</span>
                <span>•</span>
                <span className="text-accent-mint font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Gatekeeper Scroll Aktif</span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="h-9 px-3.5 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-secondary" />
              <span>Pratinjau Baca</span>
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
                <h3 className="text-[14px] font-bold text-on-surface">Daftar Sub-materi</h3>
                <p className="text-[11px] text-secondary">Urutan linier membaca mahasiswa</p>
              </div>
              <button
                type="button"
                onClick={handleAddSlide}
                className="h-8 px-2.5 rounded-lg bg-primary-container-soft text-primary-container hover:bg-primary-container hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors border border-primary-container/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 max-h-[480px] overflow-y-auto pr-1">
              {slides.map((s, idx) => {
                const isActive = s.id === activeSlide.id;
                return (
                  <article
                    key={s.id}
                    onClick={() => setActiveSlideId(s.id)}
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
                        Slide {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-dim text-secondary border border-line">
                        {s.wordCount} kata
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-on-surface truncate">
                      {s.title}
                    </h4>

                    <div className="flex items-center gap-1 text-[11px] text-secondary">
                      {renderTypeIcon(s.typeIcon)}
                      <span className="truncate">{s.typeSubtitle}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-secondary border-t border-line/60">
                      <span className="flex items-center gap-1 text-accent-mint font-medium text-[10px]">
                        <Shield className="w-3 h-3" />
                        <span>Scroll Gate</span>
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateSlide(s.id);
                          }}
                          title="Duplikasi Slide"
                          className="p-1 rounded hover:bg-surface-dim text-secondary hover:text-on-surface transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSlide(s.id);
                          }}
                          title="Hapus Slide"
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
                  Mengedit Slide {activeSlide.slideNumber} dari {slides.length}
                </span>
                <span className="text-xs text-secondary">Topik: #Sensor Fusion ROS2</span>
              </div>
              <span className="text-xs text-secondary flex items-center gap-1">
                <History className="w-3.5 h-3.5" />
                <span>Revisi materi</span>
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-on-surface">
                Judul Sub-Materi (Slide Title)
              </label>
              <input
                type="text"
                value={activeSlide.title}
                onChange={(e) => handleUpdateActiveSlide({ title: e.target.value })}
                className="w-full h-10 px-3 rounded-lg bg-surface border border-line text-xs sm:text-sm font-semibold text-on-surface focus:outline-none focus:border-primary-container"
              />
            </div>

            <div className="rounded-xl border border-line overflow-hidden flex flex-col">
              <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-dim border-b border-line">
                <button
                  type="button"
                  title="Tebal"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content} **teks**`,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center font-bold text-xs"
                >
                  B
                </button>
                <button
                  type="button"
                  title="Miring"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content} *teks*`,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center italic text-xs"
                >
                  I
                </button>
                <button
                  type="button"
                  title="Heading 2"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content}\n\n### Judul Seksi`,
                    })
                  }
                  className="px-1.5 h-7 rounded hover:bg-surface text-on-surface text-xs font-bold"
                >
                  H2
                </button>
                <button
                  type="button"
                  title="List Poin"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content}\n- Poin materi baru`,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Code Snippet"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content}\n\`\`\`yaml\n# snippet config\n\`\`\``,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center"
                >
                  <FileCode className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Rumus LaTeX"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      content: `${activeSlide.content}\n$$x_k = F_k x_{k-1} + Q_k$$`,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center"
                >
                  <Sigma className="w-3.5 h-3.5" />
                </button>

                <div className="w-[1px] h-4 bg-line mx-1" />

                <button
                  type="button"
                  onClick={() =>
                    handleUpdateActiveSlide({
                      diagramName: "arsitektur_sensor_fusion.png",
                      diagramSize: "412 KB",
                      diagramDimensions: "Dimensi: 1920 × 1080 px • Monokrom Kontras Tinggi",
                    })
                  }
                  className="h-7 px-2 rounded hover:bg-surface text-primary-container text-xs font-medium flex items-center gap-1"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Sisipkan Diagram</span>
                </button>
              </div>

              <div className="p-3 bg-surface flex flex-col gap-1.5">
                <label className="text-[11px] text-secondary">
                  Isi Teks Pembelajaran (Mendukung sintaks Markdown &amp; MathJax)
                </label>
                <textarea
                  rows={7}
                  value={activeSlide.content}
                  onChange={(e) => handleUpdateActiveSlide({ content: e.target.value })}
                  placeholder="Tulis uraian materi pembelajaran teknis di sini..."
                  className="w-full p-2.5 rounded-lg border border-line bg-surface text-on-surface text-xs leading-relaxed focus:outline-none focus:border-primary-container resize-y font-mono"
                />
              </div>
            </div>

            {activeSlide.diagramName && (
              <div className="rounded-xl border border-line p-3.5 bg-surface flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-primary-container" />
                    <span>Diagram Teknis Tersemat</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-container-soft text-primary-container border border-primary-container/20">
                    Format PNG/SVG
                  </span>
                </div>

                <div className="rounded-lg bg-surface-dim/60 border border-line p-3 flex flex-col sm:flex-row items-center gap-3">
                  <div className="w-full sm:w-28 h-20 rounded bg-surface border border-line flex flex-col items-center justify-center shrink-0 text-primary-container">
                    <Network className="w-6 h-6" />
                    <span className="text-[10px] text-secondary mt-1 font-medium">Node Graph</span>
                  </div>

                  <div className="flex-1 min-w-0 w-full flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-on-surface truncate">
                        {activeSlide.diagramName}
                      </span>
                      <span className="text-[11px] text-secondary shrink-0">
                        {activeSlide.diagramSize}
                      </span>
                    </div>
                    <span className="text-[11px] text-secondary truncate">
                      {activeSlide.diagramDimensions}
                    </span>

                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          showToast("Ganti Diagram", "Dialog pemilihan berkas gambar siap.")
                        }
                        className="h-7 px-2.5 rounded bg-surface hover:bg-surface-dim border border-line text-xs font-medium text-on-surface flex items-center gap-1 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3 text-secondary" />
                        <span>Ganti</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateActiveSlide({
                            diagramName: undefined,
                            diagramSize: undefined,
                            diagramDimensions: undefined,
                          })
                        }
                        className="h-7 px-2.5 rounded hover:bg-destructive/15 text-destructive text-xs font-medium flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="rounded-xl border border-line p-3.5 bg-surface-dim/40 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-on-surface">
                    <Shield className="w-4 h-4 text-primary-container" />
                    <span>Aturan Gatekeeper Gulir Penuh (Scroll-to-Bottom)</span>
                  </div>
                  <p className="text-[11px] text-secondary leading-relaxed">
                    Mencegah mahasiswa melompati materi. Tombol lanjut menuju slide berikutnya
                    terkunci hingga batas gulir terpenuhi di layar.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={activeSlide.scrollGateEnabled}
                    onChange={(e) =>
                      handleUpdateActiveSlide({ scrollGateEnabled: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-line peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-mint" />
                </label>
              </div>

              {activeSlide.scrollGateEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-surface border border-line flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Batas Gulir Minimal</span>
                      <span className="text-primary-container font-semibold">
                        {activeSlide.minScrollPercent}% (Ujung Bawah)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={100}
                      value={activeSlide.minScrollPercent}
                      onChange={(e) =>
                        handleUpdateActiveSlide({ minScrollPercent: Number(e.target.value) })
                      }
                      className="w-full accent-primary-container h-1.5 bg-line rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-secondary">
                      Mahasiswa wajib menggulir hingga ke ujung bawah halaman.
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-surface border border-line flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-on-surface">Waktu Minimum Baca</span>
                      <span className="text-on-surface font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary-container" />
                        <span>{activeSlide.minReadTimeSeconds} Detik</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={5}
                        max={120}
                        value={activeSlide.minReadTimeSeconds}
                        onChange={(e) =>
                          handleUpdateActiveSlide({
                            minReadTimeSeconds: Number(e.target.value),
                          })
                        }
                        className="w-20 h-7 px-2 rounded bg-surface-dim border border-line text-xs font-bold text-center text-on-surface focus:outline-none focus:border-primary-container"
                      />
                      <span className="text-[11px] text-secondary">detik jeda penahanan</span>
                    </div>
                    <span className="text-[10px] text-secondary">
                      Tombol lanjut baru aktif setelah jeda waktu terpenuhi.
                    </span>
                  </div>
                </div>
              )}
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
              <span>Simpan &amp; Perbarui Modul</span>
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
            className="bg-surface rounded-2xl max-w-2xl w-full p-5 shadow-xl flex flex-col gap-4 border border-line max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary-container-soft text-primary-container text-[11px] font-bold uppercase tracking-wider border border-primary-container/20">
                  Pratinjau Mahasiswa
                </span>
                <span className="text-xs text-secondary truncate">
                  Slide {activeSlide.slideNumber}: {activeSlide.title}
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
              <h3 className="text-base font-bold text-on-surface">
                {activeSlide.title}
              </h3>

              {activeSlide.diagramName && (
                <div className="p-3 rounded-xl bg-surface-dim border border-line flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-surface flex items-center justify-center text-primary-container border border-line shrink-0">
                    <Network className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">
                      {activeSlide.diagramName}
                    </span>
                    <span className="text-[11px] text-secondary">
                      {activeSlide.diagramDimensions}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-surface-dim/40 border border-line text-xs leading-relaxed text-on-surface whitespace-pre-line font-sans">
                {activeSlide.content}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-line text-xs">
              <span className="text-secondary">
                Gatekeeper: {activeSlide.scrollGateEnabled ? `${activeSlide.minScrollPercent}% Gulir • ${activeSlide.minReadTimeSeconds}d Jeda` : "Tidak Aktif"}
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="h-8 px-4 rounded-lg bg-primary-container text-white font-bold"
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

