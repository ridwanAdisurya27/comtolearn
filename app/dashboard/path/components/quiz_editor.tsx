"use client";

import React, { useState } from "react";
import {
  Award,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  FileCode,
  HelpCircle,
  ImageIcon,
  ListOrdered,
  Plus,
  Save,
  Search,
  Sliders,
  Trash2,
  X,
  Tag,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export interface QuizOption {
  key: string;
  text: string;
}

export interface QuizQuestionItem {
  id: number;
  question: string;
  type: string;
  topic: string;
  correctKeys: string[];
  options: QuizOption[];
  explanation: string;
  attachmentName?: string;
  attachmentType?: string;
}

interface QuizEditorProps {
  onClose?: () => void;
  onSave?: (questions: QuizQuestionItem[], passingGrade: number) => void;
}

const initialQuestions: QuizQuestionItem[] = [
  {
    id: 1,
    question:
      "Mengapa pembacaan sensor IMU perlu digabungkan dengan LiDAR menggunakan modul `robot_localization` pada ROS2?",
    type: "Pilihan Ganda",
    topic: "Sensor Fusion & IMU",
    correctKeys: ["A"],
    attachmentName: "arsitektur_sensor_fusion.png",
    attachmentType: "LiDAR + IMU EKF Graph • 412 KB",
    options: [
      {
        key: "A",
        text: "IMU memiliki drift jangka panjang yang perlu dikoreksi oleh data posisi LiDAR",
      },
      {
        key: "B",
        text: "LiDAR hanya berfungsi jika IMU memberikan sinyal daya listrik 5V",
      },
      {
        key: "C",
        text: "Sensor fusion hanya untuk mempercantik visualisasi koordinat pada RViz2",
      },
      {
        key: "D",
        text: "Kecepatan transmisi UART LiDAR tidak kompatibel dengan arsitektur CPU robot",
      },
    ],
    explanation:
      "IMU memiliki refresh rate sangat tinggi (100–500Hz) namun rentan terhadap akumulasi drift seiring waktu. Sebaliknya, LiDAR memberikan koreksi geometri presisi dengan frekuensi 10–20Hz. Fusi keduanya menstabilkan estimasi pose robot secara kontinu.",
  },
  {
    id: 2,
    question:
      "Manakah matriks kovarians dalam filter Kalman (EKF) yang harus dikonfigurasi untuk menyesuaikan estimasi error sensor fisik?",
    type: "Pilihan Ganda Kompleks",
    topic: "EKF Matrices",
    correctKeys: ["A", "C"],
    options: [
      { key: "A", text: "Matriks R (Measurement Noise Covariance) sensor langsung" },
      { key: "B", text: "Baud rate serial UART mikrokontroler 115200 bps" },
      { key: "C", text: "Matriks Q (Process Noise Covariance) model dinamika robot" },
      { key: "D", text: "Lebar bandwidth jaringan Ethernet LiDAR" },
    ],
    explanation:
      "Parameter kunci EKF adalah Matriks Q (Process Noise) yang merepresentasikan ketidakpastian gerak model mekanik robot, dan Matriks R (Measurement Noise) yang mencerminkan tingkat ketidakpastian pembacaan sensor individual.",
  },
  {
    id: 3,
    question:
      "Transform frame ROS2 `odom -> base_link` wajib bersifat continuous (kontinu) tanpa adanya lompatan posisi diskret.",
    type: "Benar / Salah (Boolean)",
    topic: "TF2 Conventions",
    correctKeys: ["A"],
    options: [
      { key: "A", text: "Benar" },
      { key: "B", text: "Salah" },
    ],
    explanation:
      "Benar. Frame `odom -> base_link` diproduksi secara halus oleh odometri. Lompatan diskret akan memicu lonjakan diferensial kecepatan pada controller roda.",
  },
  {
    id: 4,
    question:
      "Berdasarkan topologi node ROS2 yang ditampilkan pada diagram, jalur topik manakah yang mengalirkan odometri hasil filtering?",
    type: "Pilihan Ganda",
    topic: "ROS2 Architecture",
    correctKeys: ["B"],
    attachmentName: "ekf_node_graph.png",
    attachmentType: "rqt_graph node pipeline • 280 KB",
    options: [
      { key: "A", text: "Topic `/imu/data_raw` langsung ke DWB controller" },
      { key: "B", text: "Topic `/odometry/filtered` dari node ekf_node ke Nav2" },
      { key: "C", text: "Topic `/scan` dikirim langsung ke mikrokontroler motor" },
      { key: "D", text: "Topic `/cmd_vel` langsung ke RViz2 tanpa perantara" },
    ],
    explanation:
      "Node `robot_localization` (ekf_node) menggabungkan sumber odometri mentah dan menerbitkan hasil fusi terfilter ke topik `/odometry/filtered` untuk dikonsumsi Nav2.",
  },
  {
    id: 5,
    question:
      "Bagaimana strategi mitigasi jika robot melewati lorong tanpa fitur di mana LiDAR mengalami degradasi pengukuran?",
    type: "Pilihan Ganda",
    topic: "SLAM Robustness",
    correctKeys: ["A"],
    options: [
      { key: "A", text: "Memanfaatkan dead reckoning dari IMU dan Wheel Odometry untuk mempertahankan estimasi gerak sesaat" },
      { key: "B", text: "Mematikan seluruh sensor dan mengandalkan koneksi satelit GPS di dalam gedung" },
      { key: "C", text: "Mengabaikan pembacaan IMU dan menaikkan resolusi scan laser menjadi 3600 sample" },
      { key: "D", text: "Menghentikan total sistem operasi Ubuntu dan me-reboot mikrokontroler robot" },
    ],
    explanation:
      "Saat scan-matching LiDAR mengalami degenerasi geometris (misal lorong simetris panjang), filter EKF bergantung pada integrasi kecepatan angular gyro IMU dan encoder roda untuk navigasi sementara.",
  },
];

export default function QuizEditor({ onClose, onSave }: QuizEditorProps) {
  const [questions, setQuestions] = useState<QuizQuestionItem[]>(initialQuestions);
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [passingGrade, setPassingGrade] = useState<number>(75);
  const [isLinear, setIsLinear] = useState<boolean>(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewSelectedKeys, setPreviewSelectedKeys] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(
    null
  );

  const activeQuestion =
    questions.find((q) => q.id === activeQuestionId) || questions[0];

  const isMultiChoice = activeQuestion.type === "Pilihan Ganda Kompleks";
  const isBooleanType = activeQuestion.type === "Benar / Salah (Boolean)";

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateActiveQuestion = (patch: Partial<QuizQuestionItem>) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === activeQuestion.id ? { ...q, ...patch } : q))
    );
  };

  const handleTypeChange = (newType: string) => {
    if (newType === "Benar / Salah (Boolean)") {
      const booleanOptions: QuizOption[] = [
        { key: "A", text: "Benar" },
        { key: "B", text: "Salah" },
      ];
      const newCorrect = activeQuestion.correctKeys.includes("B") ? ["B"] : ["A"];
      handleUpdateActiveQuestion({
        type: newType,
        options: booleanOptions,
        correctKeys: newCorrect,
      });
      showToast("Tipe Diubah", "Format diubah menjadi Benar / Salah (2 Opsi).");
    } else if (newType === "Pilihan Ganda Kompleks") {
      handleUpdateActiveQuestion({
        type: newType,
      });
      showToast("Tipe Diubah", "Format diubah ke Pilihan Ganda Kompleks (Bisa pilih >1).");
    } else {
      const newCorrect =
        activeQuestion.correctKeys.length > 0 ? [activeQuestion.correctKeys[0]] : ["A"];
      handleUpdateActiveQuestion({
        type: newType,
        correctKeys: newCorrect,
      });
      showToast("Tipe Diubah", "Format diubah ke Pilihan Tunggal (1 Kunci).");
    }
  };

  const handleOptionTextChange = (key: string, newText: string) => {
    const updatedOptions = activeQuestion.options.map((opt) =>
      opt.key === key ? { ...opt, text: newText } : opt
    );
    handleUpdateActiveQuestion({ options: updatedOptions });
  };

  const handleToggleCorrectKey = (key: string) => {
    if (!isMultiChoice) {
      handleUpdateActiveQuestion({ correctKeys: [key] });
      return;
    }
    const current = activeQuestion.correctKeys;
    if (current.includes(key)) {
      if (current.length <= 1) {
        showToast("Perhatian", "Pilihan Ganda Kompleks membutuhkan minimal 1 kunci jawaban.");
        return;
      }
      handleUpdateActiveQuestion({ correctKeys: current.filter((k) => k !== key) });
    } else {
      handleUpdateActiveQuestion({ correctKeys: [...current, key].sort() });
    }
  };

  const handleAddOption = () => {
    if (isBooleanType) {
      showToast("Terkunci", "Tipe Benar / Salah hanya mendukung 2 opsi.");
      return;
    }
    if (activeQuestion.options.length >= 5) {
      showToast("Batas Tercapai", "Maksimal 5 pilihan jawaban per butir soal.");
      return;
    }
    const letters = ["A", "B", "C", "D", "E"];
    const nextKey = letters[activeQuestion.options.length];
    const newOptions = [...activeQuestion.options, { key: nextKey, text: "" }];
    handleUpdateActiveQuestion({ options: newOptions });
    showToast("Opsi Ditambahkan", `Pilihan ${nextKey} berhasil ditambahkan.`);
  };

  const handleDeleteOption = (key: string) => {
    if (isBooleanType) {
      showToast("Terkunci", "Soal Benar / Salah harus memiliki tepat 2 opsi.");
      return;
    }
    if (activeQuestion.options.length <= 2) {
      showToast("Perhatian", "Kuis membutuhkan minimal 2 pilihan jawaban.");
      return;
    }
    const remaining = activeQuestion.options.filter((o) => o.key !== key);
    const letters = ["A", "B", "C", "D", "E"];
    const reindexed = remaining.map((opt, i) => ({
      key: letters[i],
      text: opt.text,
    }));
    let updatedCorrect = activeQuestion.correctKeys.filter((k) => k !== key);
    if (updatedCorrect.length === 0) {
      updatedCorrect = [reindexed[0].key];
    }
    handleUpdateActiveQuestion({ options: reindexed, correctKeys: updatedCorrect });
  };

  const handleAddNewQuestion = () => {
    const newId = Date.now();
    const newQuestion: QuizQuestionItem = {
      id: newId,
      question: "Ketik teks pertanyaan baru di sini...",
      type: "Pilihan Ganda",
      topic: "Topik Baru",
      correctKeys: ["A"],
      options: [
        { key: "A", text: "Opsi jawaban A" },
        { key: "B", text: "Opsi jawaban B" },
        { key: "C", text: "Opsi jawaban C" },
        { key: "D", text: "Opsi jawaban D" },
      ],
      explanation: "Uraikan pembahasan dan kunci jawaban di sini.",
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setActiveQuestionId(newId);
    showToast("Soal Baru Ditambahkan", `Soal #${questions.length + 1} siap diedit.`);
  };

  const handleDuplicateQuestion = (id: number) => {
    const target = questions.find((q) => q.id === id);
    if (!target) return;
    const duplicated: QuizQuestionItem = {
      ...target,
      id: Date.now(),
      question: `${target.question} (Salinan)`,
    };
    setQuestions((prev) => [...prev, duplicated]);
    setActiveQuestionId(duplicated.id);
    showToast("Soal Diduplikasi", "Salinan soal baru berhasil dibuat.");
  };

  const handleDeleteQuestion = (id: number) => {
    if (questions.length <= 1) {
      showToast("Gagal Hapus", "Kuis minimal harus memiliki 1 butir soal.");
      return;
    }
    const filtered = questions.filter((q) => q.id !== id);
    setQuestions(filtered);
    setActiveQuestionId(filtered[0].id);
    showToast("Soal Dihapus", "Butir soal berhasil dihapus dari daftar.");
  };

  const handleSaveDraft = () => {
    showToast("Draf Tersimpan", "Seluruh perubahan kuis evaluasi berhasil disimpan.");
  };

  const handlePublish = () => {
    showToast(
      "Kuis Berhasil Dipublikasikan!",
      `Modul 3 sekarang dibuka dengan evaluasi passing grade ${passingGrade}%.`
    );
    if (onSave) {
      onSave(questions, passingGrade);
    }
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full font-sans bg-page-canvas text-on-surface antialiased p-3 sm:p-5 md:p-8 flex items-center justify-center overflow-y-auto">
      {/* Centered Modal Window Wrapper */}
      <div className="relative w-full max-w-[1080px] max-h-[92vh] flex flex-col bg-surface rounded-2xl shadow-md border border-line overflow-hidden my-auto shrink-0">
        {/* MODAL HEADER */}
        <header className="px-6 py-4 border-b border-line bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-primary-container-soft flex items-center justify-center text-primary-container shrink-0 border border-primary-container/20">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-[18px] sm:text-[20px] font-bold text-on-surface leading-snug">
                  Editor Kuis Evaluasi Modul
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-surface-dim text-primary-container font-semibold flex items-center gap-1.5 border border-line">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                  <span>{questions.length} Soal Terdaftar</span>
                </span>
              </div>
              <p className="text-xs text-secondary truncate mt-0.5">
                Modul 3: ROS2 Nodes &amp; Sensor Fusion (LiDAR + IMU) •{" "}
                <span className="font-semibold text-primary-container">
                  Passing Grade: {passingGrade}%
                </span>
              </p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setPreviewSelectedKeys([]);
                setIsPreviewOpen(true);
              }}
              className="h-9 px-3.5 rounded-lg bg-surface hover:bg-surface-dim text-on-surface text-xs font-semibold border border-line shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4 text-secondary" />
              <span>Pratinjau Kuis</span>
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

        {/* MODAL BODY: 2-COLUMN SCROLLABLE WORKSPACE */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line bg-page-canvas">
          {/* KOLOM KIRI: Daftar Soal (4 cols) */}
          <aside className="lg:col-span-4 p-4 lg:p-5 flex flex-col gap-4 bg-surface/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-primary-container" />
                <span className="text-[15px] font-bold text-on-surface">Daftar Soal</span>
              </div>
              <span className="px-2 py-0.5 text-xs rounded-full bg-surface-dim text-secondary font-medium border border-line">
                {questions.length} Soal
              </span>
            </div>

            {/* Quick Filter Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-2 text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari soal atau tag..."
                className="w-full h-8 pl-8 pr-3 text-xs rounded-lg bg-surface border border-line text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              />
            </div>

            {/* Question Nav Cards List */}
            <div className="flex flex-col gap-2.5 max-h-[440px] overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const isActive = q.id === activeQuestion.id;
                return (
                  <article
                    key={q.id}
                    onClick={() => setActiveQuestionId(q.id)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all flex flex-col gap-2 border ${
                      isActive
                        ? "bg-primary-container-soft/60 border-primary-container shadow-xs"
                        : "bg-surface border-line hover:border-line hover:bg-surface-dim/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`text-xs font-bold shrink-0 ${
                            isActive ? "text-primary-container" : "text-on-surface"
                          }`}
                        >
                          Soal {idx + 1}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-dim text-secondary border border-line truncate">
                          {q.type}
                        </span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-accent-mint text-white flex items-center gap-0.5 font-bold shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Kunci: {q.correctKeys.join(", ")}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-secondary text-[11px]">
                      <span className="flex items-center gap-1 text-secondary truncate">
                        <Tag className="w-3 h-3 text-primary-container shrink-0" />
                        <span className="truncate">{q.topic}</span>
                      </span>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDuplicateQuestion(q.id);
                          }}
                          title="Duplikat Soal"
                          className="p-1 rounded hover:bg-surface-dim text-secondary hover:text-on-surface transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(q.id);
                          }}
                          title="Hapus Soal"
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

            {/* Add Question Button */}
            <button
              type="button"
              onClick={handleAddNewQuestion}
              className="w-full h-9 rounded-lg bg-surface hover:bg-surface-dim text-primary-container text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-line shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>

            {/* Summary Indicator Box */}
            <div className="p-3 rounded-xl bg-surface border border-line flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-primary-container text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Standar Penilaian Kuis</span>
              </div>
              <p className="text-[11px] text-secondary leading-relaxed">
                Passing grade {passingGrade}% • Tanpa Poin EXP (Murni Kompetensi).
                Seluruh butir soal harus valid sebelum evaluasi modul dibuka.
              </p>
            </div>
          </aside>

          {/* KOLOM KANAN: Editor Soal & Pilihan Jawaban Aktif (8 cols) */}
          <main className="lg:col-span-8 p-4 lg:p-6 flex flex-col gap-5 bg-surface">
            {/* Header Editor Soal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-primary-container text-white text-xs flex items-center justify-center font-bold">
                  {questions.findIndex((q) => q.id === activeQuestion.id) + 1}
                </span>
                <div>
                  <span className="text-[11px] text-secondary uppercase tracking-wider block">
                    Editor Soal Aktif
                  </span>
                  <h3 className="text-[16px] font-bold text-on-surface">
                    Mengedit Soal{" "}
                    {questions.findIndex((q) => q.id === activeQuestion.id) + 1} dari{" "}
                    {questions.length}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {/* Tipe Soal */}
                <div className="flex flex-col">
                  <label className="text-[10px] text-secondary uppercase tracking-wider mb-0.5">
                    Tipe Soal
                  </label>
                  <select
                    value={activeQuestion.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    className="h-8 px-2.5 rounded-lg bg-surface border border-line text-xs text-on-surface focus:outline-none focus:border-primary-container"
                  >
                    <option value="Pilihan Ganda">Pilihan Ganda</option>
                    <option value="Pilihan Ganda Kompleks">Pilihan Ganda Kompleks</option>
                    <option value="Benar / Salah (Boolean)">Benar / Salah (Boolean)</option>
                  </select>
                </div>

                {/* Tag Topik */}
                <div className="flex flex-col">
                  <label className="text-[10px] text-secondary uppercase tracking-wider mb-0.5">
                    Tag Topik
                  </label>
                  <div className="h-8 px-2.5 rounded-lg bg-surface border border-line flex items-center gap-1.5 text-xs text-on-surface">
                    <Tag className="w-3.5 h-3.5 text-primary-container" />
                    <input
                      type="text"
                      value={activeQuestion.topic}
                      onChange={(e) =>
                        handleUpdateActiveQuestion({ topic: e.target.value })
                      }
                      className="bg-transparent focus:outline-none w-28 sm:w-36 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Teks Pertanyaan & Formatting Toolbar */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-bold text-on-surface flex items-center gap-1">
                  <span>Teks Pertanyaan</span>
                  <span className="text-destructive">*</span>
                </label>
                <span className="text-[11px] text-secondary">
                  Mendukung sintaks Markdown &amp; Math
                </span>
              </div>

              {/* Mini Toolbar */}
              <div className="flex items-center gap-1 p-1 rounded-t-lg bg-surface-dim border border-b-0 border-line flex-wrap">
                <button
                  type="button"
                  title="Tebal"
                  onClick={() =>
                    handleUpdateActiveQuestion({
                      question: `${activeQuestion.question} **teks**`,
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
                    handleUpdateActiveQuestion({
                      question: `${activeQuestion.question} *teks*`,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center italic text-xs"
                >
                  I
                </button>
                <button
                  type="button"
                  title="Code"
                  onClick={() =>
                    handleUpdateActiveQuestion({
                      question: `${activeQuestion.question} \`kode\``,
                    })
                  }
                  className="w-7 h-7 rounded hover:bg-surface text-on-surface flex items-center justify-center text-[11px] font-mono"
                >
                  &lt;/&gt;
                </button>
                <span className="w-[1px] h-3.5 bg-line mx-1" />
                <button
                  type="button"
                  title="Sisipkan Diagram"
                  onClick={() =>
                    handleUpdateActiveQuestion({
                      attachmentName: "diagram_sensor.png",
                      attachmentType: "Visual Node Graph • 380 KB",
                    })
                  }
                  className="px-2 h-7 rounded hover:bg-surface text-primary-container flex items-center gap-1 text-xs font-medium"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Sisipkan Diagram</span>
                </button>
              </div>

              <textarea
                rows={3}
                value={activeQuestion.question}
                onChange={(e) =>
                  handleUpdateActiveQuestion({ question: e.target.value })
                }
                className="w-full p-3 rounded-b-lg border border-line bg-surface text-on-surface text-xs sm:text-sm focus:outline-none focus:border-primary-container leading-relaxed resize-y"
              />

              {/* Lampiran Diagram Teknis */}
              {activeQuestion.attachmentName && (
                <div className="mt-1 p-2.5 rounded-xl bg-surface-dim border border-line flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-line overflow-hidden shrink-0 flex items-center justify-center text-primary-container">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface truncate">
                        {activeQuestion.attachmentName}
                      </span>
                      <span className="text-[11px] text-secondary truncate">
                        {activeQuestion.attachmentType || "Gambar Diagram Disematkan"}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateActiveQuestion({
                        attachmentName: undefined,
                        attachmentType: undefined,
                      })
                    }
                    title="Hapus Lampiran"
                    className="p-1.5 rounded hover:bg-destructive/15 text-secondary hover:text-destructive transition-colors shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 2. Pilihan Jawaban (A, B, C, D) */}
            <div className="flex flex-col gap-2.5 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="text-[14px] font-bold text-on-surface flex items-center gap-2">
                  <span>Pilihan Jawaban</span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-dim text-[11px] text-secondary border border-line">
                    {activeQuestion.options.length} Pilihan
                  </span>
                </h4>
                <span className="text-[11px] text-secondary">
                  {isMultiChoice ? (
                    <>
                      Pilih checkbox di samping untuk menetapkan{" "}
                      <strong className="text-accent-mint font-semibold">
                        1 atau lebih Kunci Jawaban Benar
                      </strong>
                      .
                    </>
                  ) : isBooleanType ? (
                    <>
                      Pilih radio di samping untuk menetapkan kunci{" "}
                      <strong className="text-accent-mint font-semibold">
                        Benar atau Salah
                      </strong>
                      .
                    </>
                  ) : (
                    <>
                      Pilih radio di samping untuk menetapkan{" "}
                      <strong className="text-accent-mint font-semibold">
                        1 Kunci Jawaban Benar
                      </strong>
                      .
                    </>
                  )}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {activeQuestion.options.map((opt) => {
                  const isCorrect = activeQuestion.correctKeys.includes(opt.key);
                  return (
                    <div
                      key={opt.key}
                      className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-2.5 transition-all ${
                        isCorrect
                          ? "bg-accent-mint-soft/50 border-2 border-accent-mint shadow-xs"
                          : "bg-surface-dim/40 border-line hover:border-line"
                      }`}
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <label className="cursor-pointer flex items-center gap-1.5">
                          {isMultiChoice ? (
                            <input
                              type="checkbox"
                              checked={isCorrect}
                              onChange={() => handleToggleCorrectKey(opt.key)}
                              className="w-4 h-4 rounded accent-accent-mint cursor-pointer"
                            />
                          ) : (
                            <input
                              type="radio"
                              name={`correct_key_radio_${activeQuestion.id}`}
                              checked={isCorrect}
                              onChange={() => handleToggleCorrectKey(opt.key)}
                              className="w-4 h-4 accent-accent-mint cursor-pointer"
                            />
                          )}
                          <span
                            className={`w-6 h-6 rounded-md text-xs flex items-center justify-center font-bold ${
                              isCorrect
                                ? "bg-accent-mint text-white"
                                : "bg-surface text-secondary border border-line"
                            }`}
                          >
                            {opt.key}
                          </span>
                        </label>

                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-accent-mint text-white flex items-center gap-1 font-bold">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>KUNCI BENAR</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-surface text-secondary border border-line">
                            Distraktor
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={opt.text}
                          disabled={isBooleanType}
                          onChange={(e) => handleOptionTextChange(opt.key, e.target.value)}
                          placeholder={`Ketik opsi pilihan ${opt.key}...`}
                          className={`w-full h-8 px-2.5 rounded-lg border text-xs text-on-surface focus:outline-none ${
                            isBooleanType
                              ? "bg-surface-dim border-line text-on-surface cursor-not-allowed font-medium"
                              : isCorrect
                              ? "bg-surface border-accent-mint/40 focus:border-accent-mint"
                              : "bg-surface border-line focus:border-primary-container"
                          }`}
                        />
                      </div>

                      {!isBooleanType ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteOption(opt.key)}
                          title="Hapus Opsi"
                          className="w-7 h-7 self-end sm:self-center rounded hover:bg-destructive/15 text-secondary hover:text-destructive flex items-center justify-center transition-colors shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-secondary/60 px-1.5 hidden sm:inline-block">
                          Terkunci
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-1">
                {!isBooleanType ? (
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="h-8 px-3 rounded-lg bg-surface hover:bg-surface-dim text-primary-container text-xs font-semibold flex items-center gap-1.5 transition-all border border-line shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Opsi Jawaban</span>
                  </button>
                ) : (
                  <span className="text-xs text-secondary font-medium">
                    Format 2 pilihan (Benar / Salah) telah dikunci
                  </span>
                )}
                <span className="text-[11px] text-secondary">
                  {isMultiChoice
                    ? "Bisa memilih lebih dari 1 kunci jawaban"
                    : "Hanya 1 kunci jawaban yang aktif"}
                </span>
              </div>
            </div>

            {/* 3. Box Pembahasan Lengkap */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[13px] font-bold text-on-surface flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-primary-container" />
                  <span>Pembahasan Lengkap (Umpan balik mahasiswa setelah menjawab)</span>
                </label>
                <span className="text-[11px] text-accent-mint font-semibold">
                  Umpan Balik Aktif
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                Uraikan rasionalisasi teknis secara mendalam guna memicu retensi materi algoritma navigasi.
              </p>
              <textarea
                rows={3}
                value={activeQuestion.explanation}
                onChange={(e) =>
                  handleUpdateActiveQuestion({ explanation: e.target.value })
                }
                className="w-full p-3 rounded-lg border border-line bg-surface text-on-surface text-xs focus:outline-none focus:border-primary-container leading-relaxed resize-y"
              />
            </div>

            {/* 4. Parameter Gerbang (Gatekeeper) */}
            <div className="p-3.5 rounded-xl bg-surface-dim/50 border border-line flex flex-col gap-3">
              <div className="flex items-center gap-1.5 text-on-surface text-xs font-bold">
                <Sliders className="w-4 h-4 text-primary-container" />
                <span>Parameter Gerbang Modul (Gatekeeper)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Passing Grade */}
                <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-secondary uppercase tracking-wider block">
                      Passing Grade
                    </span>
                    <span className="text-[11px] text-secondary">Ambang kelulusan modul</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min={50}
                      max={100}
                      value={passingGrade}
                      onChange={(e) => setPassingGrade(Number(e.target.value))}
                      className="w-14 h-8 px-2 rounded bg-surface-dim text-center font-bold text-sm text-primary-container border border-line focus:outline-none focus:border-primary-container"
                    />
                    <span className="font-bold text-xs text-on-surface">%</span>
                  </div>
                </div>

                {/* Linear Quiz Toggle */}
                <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-secondary uppercase tracking-wider block">
                      Linear Kuis
                    </span>
                    <span className="text-[11px] text-secondary">Wajib jawab berurutan</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLinear}
                      onChange={(e) => setIsLinear(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-line peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-mint" />
                  </label>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* MODAL FOOTER */}
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
              <span>Simpan &amp; Publikasikan Kuis</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Pratinjau Kuis Dialog Modal (Nested / Secondary) */}
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
                  Modul 3: {activeQuestion.topic} •{" "}
                  <strong className="text-on-surface">
                    {isMultiChoice
                      ? "Pilihan Ganda Kompleks (Bisa pilih >1)"
                      : "Pilihan Tunggal"}
                  </strong>
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

            <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-surface-dim">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary-container text-white text-[11px] flex items-center justify-center font-bold">
                  {questions.findIndex((q) => q.id === activeQuestion.id) + 1}
                </span>
                <span className="text-xs font-bold text-on-surface">
                  Pertanyaan {questions.findIndex((q) => q.id === activeQuestion.id) + 1} dari{" "}
                  {questions.length}
                </span>
              </div>
              <span className="text-[11px] text-secondary">
                Passing Grade: {passingGrade}%
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className="text-xs sm:text-sm text-on-surface font-semibold leading-relaxed">
                {activeQuestion.question}
              </p>

              {activeQuestion.attachmentName && (
                <div className="p-2.5 rounded-lg bg-surface-dim border border-line flex items-center gap-2.5 text-xs text-on-surface">
                  <ImageIcon className="w-4 h-4 text-primary-container" />
                  <span className="font-medium truncate">{activeQuestion.attachmentName}</span>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-1 text-xs">
                {activeQuestion.options.map((opt) => {
                  const isSelected = previewSelectedKeys.includes(opt.key);
                  return (
                    <label
                      key={opt.key}
                      onClick={() => {
                        if (isMultiChoice) {
                          if (isSelected) {
                            setPreviewSelectedKeys(
                              previewSelectedKeys.filter((k) => k !== opt.key)
                            );
                          } else {
                            setPreviewSelectedKeys(
                              [...previewSelectedKeys, opt.key].sort()
                            );
                          }
                        } else {
                          setPreviewSelectedKeys([opt.key]);
                        }
                      }}
                      className={`p-2.5 rounded-lg cursor-pointer flex items-center gap-2.5 transition-colors border ${
                        isSelected
                          ? "bg-primary-container-soft border-primary-container font-medium text-on-surface"
                          : "bg-surface-dim/40 hover:bg-surface-dim border-line text-secondary"
                      }`}
                    >
                      {isMultiChoice ? (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer"
                        />
                      ) : (
                        <input
                          type="radio"
                          name="preview_choice"
                          checked={isSelected}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 accent-primary-container cursor-pointer"
                        />
                      )}
                      <span className="w-5 h-5 rounded bg-surface border border-line text-[11px] font-bold flex items-center justify-center shrink-0">
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-line">
              <button
                type="button"
                onClick={() => {
                  if (previewSelectedKeys.length === 0) {
                    alert("Pilih setidaknya satu jawaban untuk simulasi.");
                    return;
                  }
                  const sortedSelected = [...previewSelectedKeys].sort();
                  const sortedCorrect = [...activeQuestion.correctKeys].sort();
                  const isMatch =
                    sortedSelected.length === sortedCorrect.length &&
                    sortedSelected.every((k, i) => k === sortedCorrect[i]);

                  if (isMatch) {
                    alert(
                      `Jawaban Benar! (Kunci: ${sortedCorrect.join(", ")})`
                    );
                  } else {
                    alert(
                      `Jawaban Belum Tepat. Pilihan Anda: [${sortedSelected.join(
                        ", "
                      )}], Kunci Sebenarnya: [${sortedCorrect.join(", ")}].`
                    );
                  }
                }}
                className="h-8 px-4 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Simulasi Jawab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
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

