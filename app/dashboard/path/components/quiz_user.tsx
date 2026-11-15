"use client";

import React, { useState } from "react";
import {
  Award,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  HelpCircle,
  Lock,
  RotateCcw,
  Sparkles,
  X,
  BookOpen,
} from "lucide-react";

interface Option {
  key: string;
  text: string;
}

interface Question {
  id: number;
  topic: string;
  question: string;
  codeKeyword?: string;
  options: Option[];
  correct: string;
  explanation: string;
  wrongFeedback: string;
}

const quizData: Question[] = [
  {
    id: 1,
    topic: "Sensor Fusion & IMU",
    question:
      "Mengapa pembacaan sensor IMU perlu digabungkan dengan LiDAR menggunakan modul robot_localization pada ROS2?",
    codeKeyword: "robot_localization",
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
    correct: "A",
    explanation:
      "IMU memiliki refresh rate sangat tinggi (100–500Hz) namun rentan terhadap akumulasi drift seiring waktu. Sebaliknya, LiDAR memberikan koreksi geometri lingkungan presisi dengan frekuensi 10–20Hz. Fusi keduanya menstabilkan estimasi pose robot secara kontinu.",
    wrongFeedback:
      "Jawaban belum tepat. Alasan utama sensor fusion adalah kompensasi drift jangka panjang IMU menggunakan akurasi absolut posisi LiDAR.",
  },
  {
    id: 2,
    topic: "Filter Odometri ROS2",
    question:
      "Algoritma filter apa yang paling umum diimplementasikan pada package robot_localization untuk fusi data sensor non-linear pada robot beroda?",
    codeKeyword: "robot_localization",
    options: [
      { key: "A", text: "Simple Moving Average (SMA)" },
      {
        key: "B",
        text: "Extended Kalman Filter (EKF) / Unscented Kalman Filter (UKF)",
      },
      { key: "C", text: "Dijkstra Path Planner Filter" },
      { key: "D", text: "Bubble Sort Array Filter" },
    ],
    correct: "B",
    explanation:
      "Paket robot_localization di ROS2 menyediakan node ekf_node dan ukf_node. Extended Kalman Filter (EKF) menggunakan linearisasi matriks Jacobian untuk menangani dinamika non-linear robot beroda.",
    wrongFeedback:
      "Jawaban salah. robot_localization dibangun khusus dengan implementasi Extended Kalman Filter (EKF) dan Unscented Kalman Filter (UKF) untuk kontinuitas multi-sensor non-linear.",
  },
  {
    id: 3,
    topic: "ROS2 Standard Topics",
    question:
      "Topik ROS2 standar manakah yang digunakan untuk mempublikasikan data pemindaian laser dari sensor LiDAR 2D planar?",
    codeKeyword: "/scan",
    options: [
      { key: "A", text: "/camera/image_raw bertipe sensor_msgs/msg/Image" },
      { key: "B", text: "/cmd_vel bertipe geometry_msgs/msg/Twist" },
      { key: "C", text: "/scan bertipe sensor_msgs/msg/LaserScan" },
      { key: "D", text: "/imu/data_raw bertipe nav_msgs/msg/Odometry" },
    ],
    correct: "C",
    explanation:
      "Sesuai konvensi standar ROS/ROS2 (REP 138), pemindaian laser sudut tunggal LiDAR 2D diterbitkan pada topik /scan dengan tipe message sensor_msgs/msg/LaserScan.",
    wrongFeedback:
      "Jawaban kurang tepat. Topik standar untuk LiDAR 2D adalah /scan bertipe sensor_msgs/msg/LaserScan, sedangkan /cmd_vel untuk perintah gerak roda.",
  },
  {
    id: 4,
    topic: "Transform Tree (TF2)",
    question:
      "Apa fungsi utama dari koordinat frame transform (TF2) seperti odom -> base_link saat memproses data odometri robot?",
    codeKeyword: "odom -> base_link",
    options: [
      {
        key: "A",
        text: "Menghubungkan relasi posisi dan orientasi kerangka acuan sensor ke pusat titik acuan robot secara real-time",
      },
      {
        key: "B",
        text: "Mengubah format data biner menjadi file teks JSON untuk diunduh",
      },
      {
        key: "C",
        text: "Mengatur kecepatan putaran motor DC motor driver tanpa mikrokontroler",
      },
      {
        key: "D",
        text: "Mengompresi bandwidth jaringan Wi-Fi saat robot streaming video 4K",
      },
    ],
    correct: "A",
    explanation:
      "TF2 melacak relasi spasial berhierarki sepanjang waktu. Transform odom -> base_link mendefinisikan posisi tubuh robot terhadap titik mula tanpa diskontinuitas, memungkinkan data frame sensor diproyeksikan akurat ke base robot.",
    wrongFeedback:
      "Jawaban keliru. TF2 bertanggung jawab menghitung koordinat matriks transformasi spasial antar komponen fisik (relasi sensor ke frame pusat base_link).",
  },
  {
    id: 5,
    topic: "Degraded Sensor Handling",
    question:
      "Ketika sensor LiDAR mengalami kondisi featureless environment (misal lorong panjang polos tanpa pembeda), sensor apa yang paling krusial untuk menjaga perkiraan pergerakan sesaat?",
    codeKeyword: "featureless environment",
    options: [
      {
        key: "A",
        text: "Hanya bergantung pada GPS/GNSS di dalam gedung tanpa sinyal satelit",
      },
      {
        key: "B",
        text: "Sensor IMU & Wheel Odometry untuk mempertahankan estimasi pergerakan saat SLAM kehilangan fitur geometri",
      },
      {
        key: "C",
        text: "Mematikan modul navigasi dan menunggu sinyal inframerah remote",
      },
      {
        key: "D",
        text: "Sensor suhu baterai untuk mendeteksi gesekan roda dengan lantai",
      },
    ],
    correct: "B",
    explanation:
      "Saat LiDAR mengalami degenerasi geometric scan-matching (lorong polos simetris), SLAM kehilangan acuan fitur. Perpaduan Dead Reckoning dari Wheel Odometry dan orientasi yaw dari IMU menjaga estimasi pose robot sementara.",
    wrongFeedback:
      "Kurang tepat. Ketika SLAM LiDAR kehilangan fitur geometris, estimasi pose sementara sepenuhnya dijaga oleh kombinasi Wheel Encoders dan IMU (dead reckoning).",
  },
];

interface QuizProps {
  onComplete?: (score: number, passed: boolean) => void;
  onClose?: () => void;
}

export default function Quiz({ onComplete, onClose }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [view, setView] = useState<"quiz" | "summary">("quiz");

  const currentQ = quizData[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isCurrentAnswered = selectedAnswer !== undefined;
  const answeredCount = Object.keys(answers).length;
  const remainingCount = Math.max(0, quizData.length - answeredCount);

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    const percentage = Math.round((correct / quizData.length) * 100);
    const passed = percentage >= 75;
    return { correct, percentage, passed };
  };

  const { correct: totalCorrect, percentage: scorePercentage, passed: isPassed } =
    calculateScore();

  const handleSelectOption = (key: string) => {
    if (isCurrentAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: key }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setView("summary");
      if (onComplete) {
        onComplete(scorePercentage, isPassed);
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setView("quiz");
  };

  const handleSimulate = (preset: "pass100" | "pass80" | "fail60" | "fail40") => {
    if (preset === "pass100") {
      setAnswers({ 0: "A", 1: "B", 2: "C", 3: "A", 4: "B" });
    } else if (preset === "pass80") {
      setAnswers({ 0: "A", 1: "B", 2: "C", 3: "A", 4: "C" });
    } else if (preset === "fail60") {
      setAnswers({ 0: "A", 1: "B", 2: "C", 3: "C", 4: "C" });
    } else if (preset === "fail40") {
      setAnswers({ 0: "A", 1: "B", 2: "A", 3: "C", 4: "C" });
    }
    setView("summary");
  };

  const renderQuestionText = (text: string, keyword?: string) => {
    if (!keyword || !text.includes(keyword)) {
      return <span>{text}</span>;
    }
    const parts = text.split(keyword);
    return (
      <span>
        {parts[0]}
        <code className="px-1.5 py-0.5 rounded bg-surface-dim text-primary-container font-mono text-xs sm:text-sm font-semibold border border-line">
          {keyword}
        </code>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-page-canvas text-on-surface antialiased flex flex-col justify-center items-center p-3 sm:p-6 lg:p-8">
      {/* Main Modal Container */}
      <main className="w-full max-w-[680px] bg-surface rounded-2xl shadow-md border border-line overflow-hidden flex flex-col min-h-[580px]">
        {view === "quiz" ? (
          <div className="flex flex-col flex-1">
            {/* Modal Header */}
            <header className="px-5 sm:px-6 pt-5 pb-4 border-b border-line bg-surface">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container-soft text-primary-container flex items-center justify-center border border-primary-container/20 shadow-xs shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-bold tracking-wider text-secondary uppercase">
                        KUIS EVALUASI PEMAHAMAN
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary-container-soft text-primary-container border border-primary-container/20">
                        Target Kelulusan: 75%
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-on-surface mt-0.5">
                      Modul 3: ROS2 Nodes &amp; Sensor Fusion (LiDAR + IMU)
                    </h2>
                  </div>
                </div>

                {onClose && (
                  <button
                    onClick={onClose}
                    type="button"
                    aria-label="Tutup kuis"
                    className="w-8 h-8 rounded-lg text-secondary hover:text-on-surface hover:bg-surface-dim flex items-center justify-center transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Progress Tracker & Step Tabs */}
              <div className="mt-4 pt-3 border-t border-line-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-secondary">
                    Progres Kuis:
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    Soal {currentIndex + 1} dari {quizData.length}
                  </span>
                  <span className="text-[11px] font-medium bg-surface-dim text-secondary px-2 py-0.5 rounded-full ml-1 border border-line">
                    {answeredCount}/{quizData.length} Terjawab
                  </span>
                </div>

                {/* Step Indicators */}
                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Navigasi Nomor Soal"
                >
                  {quizData.map((q, idx) => {
                    const isCurrent = idx === currentIndex;
                    const isAnswered = answers[idx] !== undefined;
                    const isCorrect = isAnswered && answers[idx] === q.correct;

                    let btnClass =
                      "w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ";

                    if (isCurrent) {
                      btnClass +=
                        "bg-primary-container text-white shadow-xs ring-2 ring-primary-container/30 font-bold scale-105";
                    } else if (isAnswered) {
                      if (isCorrect) {
                        btnClass +=
                          "bg-accent-mint-soft text-accent-mint border border-accent-mint/40 hover:bg-accent-mint-soft/80";
                      } else {
                        btnClass +=
                          "bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20";
                      }
                    } else {
                      btnClass +=
                        "bg-surface-dim text-secondary hover:bg-surface border border-line";
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Menuju Soal ${idx + 1}`}
                        className={btnClass}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </header>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto max-h-[60vh] space-y-4 flex-1">
              {/* Question Header */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-container uppercase tracking-wider">
                    Pertanyaan {currentIndex + 1} / {quizData.length}
                  </span>
                  <span className="text-[11px] font-medium text-secondary bg-surface-dim px-2 py-0.5 rounded border border-line">
                    Topik: {currentQ.topic}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface leading-snug">
                  {renderQuestionText(currentQ.question, currentQ.codeKeyword)}
                </h3>
              </div>

              {/* Unanswered Hint */}
              {!isCurrentAnswered && (
                <div className="text-xs text-secondary bg-surface-dim border border-line rounded-lg px-3 py-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary-container shrink-0" />
                  <span>
                    Pilih salah satu jawaban (A, B, C, atau D) di bawah untuk
                    membuka pembahasan dan melanjutkan.
                  </span>
                </div>
              )}

              {/* Options List */}
              <div className="space-y-2.5 pt-0.5">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.key;
                  const isThisCorrect = opt.key === currentQ.correct;

                  let cardClass =
                    "group relative flex items-start p-3.5 rounded-xl border transition-all ";

                  if (!isCurrentAnswered) {
                    cardClass +=
                      "cursor-pointer border-line hover:border-primary-container hover:bg-accent-soft/40 bg-surface shadow-xs";
                  } else {
                    cardClass += "cursor-default select-none ";
                    if (isSelected && isThisCorrect) {
                      cardClass +=
                        "border-2 border-accent-mint bg-accent-mint-soft/70 shadow-xs";
                    } else if (isSelected && !isThisCorrect) {
                      cardClass +=
                        "border-2 border-destructive bg-destructive/10 shadow-xs";
                    } else if (!isSelected && isThisCorrect) {
                      cardClass +=
                        "border-2 border-accent-mint/60 bg-accent-mint-soft/30";
                    } else {
                      cardClass += "border-line bg-surface-dim/50 opacity-60";
                    }
                  }

                  let badgeClass =
                    "flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs shrink-0 mt-0.5 shadow-xs transition-colors ";
                  if (isSelected && isThisCorrect) {
                    badgeClass += "bg-accent-mint text-white";
                  } else if (isSelected && !isThisCorrect) {
                    badgeClass += "bg-destructive text-white";
                  } else if (isCurrentAnswered && isThisCorrect) {
                    badgeClass += "bg-accent-mint text-white";
                  } else if (!isCurrentAnswered) {
                    badgeClass +=
                      "border border-line bg-surface-dim text-secondary group-hover:border-primary-container group-hover:text-primary-container";
                  } else {
                    badgeClass += "border border-line bg-surface-dim text-secondary";
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => !isCurrentAnswered && handleSelectOption(opt.key)}
                      role="button"
                      aria-disabled={isCurrentAnswered}
                      className={cardClass}
                    >
                      <div className={badgeClass}>{opt.key}</div>
                      <div className="ml-3.5 pr-6 flex-1">
                        <p
                          className={`text-sm ${isSelected
                            ? "font-medium text-on-surface"
                            : "font-normal text-secondary"
                            } leading-relaxed`}
                        >
                          {opt.text}
                        </p>
                      </div>

                      {/* Right Status Badge */}
                      <div className="absolute right-3.5 top-3.5">
                        {isSelected && isThisCorrect && (
                          <div className="w-6 h-6 rounded-full bg-accent-mint-soft text-accent-mint flex items-center justify-center border border-accent-mint/30">
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}
                        {isSelected && !isThisCorrect && (
                          <div className="w-6 h-6 rounded-full bg-destructive/15 text-destructive flex items-center justify-center border border-destructive/30">
                            <X className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        )}
                        {!isSelected && isCurrentAnswered && isThisCorrect && (
                          <span className="text-[11px] font-semibold text-accent-mint bg-accent-mint-soft border border-accent-mint/30 px-2 py-0.5 rounded">
                            Kunci Jawaban
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Feedback Explanation Box */}
              {isCurrentAnswered && (
                <section
                  className={`rounded-xl border p-4 relative overflow-hidden transition-all ${selectedAnswer === currentQ.correct
                    ? "border-accent-mint/40 bg-accent-mint-soft/60"
                    : "border-destructive/30 bg-destructive/10"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${selectedAnswer === currentQ.correct
                        ? "bg-accent-mint text-white"
                        : "bg-destructive text-white"
                        }`}
                    >
                      {selectedAnswer === currentQ.correct ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <X className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                    <div className="space-y-1.5 flex-1 text-on-surface">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold text-sm ${selectedAnswer === currentQ.correct
                            ? "text-accent-mint"
                            : "text-destructive"
                            }`}
                        >
                          {selectedAnswer === currentQ.correct
                            ? "Jawaban Tepat!"
                            : "Pilihan Kurang Tepat"}
                        </span>
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${selectedAnswer === currentQ.correct
                            ? "bg-accent-mint-soft text-accent-mint border-accent-mint/30"
                            : "bg-destructive/15 text-destructive border-destructive/30"
                            }`}
                        >
                          {selectedAnswer === currentQ.correct
                            ? "Pembahasan Lengkap"
                            : "Koreksi Solusi"}
                        </span>
                      </div>

                      {selectedAnswer === currentQ.correct ? (
                        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                          {currentQ.explanation}
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          <p className="text-xs sm:text-sm text-on-surface font-medium leading-relaxed">
                            {currentQ.wrongFeedback}
                          </p>
                          <div className="pt-2 border-t border-destructive/20 text-xs text-secondary leading-relaxed">
                            <strong className="text-accent-mint block mb-0.5 font-semibold">
                              Kunci Jawaban ({currentQ.correct}):
                            </strong>
                            {currentQ.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Modal Footer */}
            <footer className="p-4 sm:px-6 bg-surface-dim border-t border-line flex items-center justify-between gap-3">
              <div className="text-xs text-secondary flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                {remainingCount === 0 ? (
                  <span className="text-accent-mint font-semibold">
                    Semua soal telah terjawab!
                  </span>
                ) : (
                  <span>
                    Tersisa{" "}
                    <strong className="text-on-surface font-semibold">
                      {remainingCount}
                    </strong>{" "}
                    soal evaluasi
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-secondary hover:text-on-surface hover:bg-surface active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 border border-transparent hover:border-line"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  disabled={!isCurrentAnswered}
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-primary-container hover:bg-primary-hover active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2 disabled:bg-surface-dim disabled:text-secondary disabled:border disabled:border-line disabled:cursor-not-allowed"
                >
                  <span>
                    {currentIndex === quizData.length - 1
                      ? "Selesaikan Kuis & Evaluasi"
                      : "Soal Berikutnya"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </footer>
          </div>
        ) : (
          /* Evaluation Result Summary Screen */
          <div className="flex flex-col flex-1">
            {/* Summary Top Bar */}
            <div className="px-6 py-4 border-b border-line flex items-center justify-between bg-surface">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Hasil Evaluasi Akhir
                </span>
              </div>
              <span className="text-xs bg-surface-dim font-semibold px-2.5 py-1 rounded-full text-secondary border border-line">
                Standar Kelulusan: 75%
              </span>
            </div>

            {/* Summary Content Body */}
            <div className="p-6 sm:p-7 overflow-y-auto max-h-[64vh] space-y-6 flex-1 bg-surface">
              {/* Status Banner */}
              <div
                className={`rounded-2xl p-5 border text-center relative overflow-hidden transition-all ${isPassed
                  ? "border-accent-mint/40 bg-accent-mint-soft/80"
                  : "border-destructive/30 bg-destructive/10"
                  }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs ${isPassed
                    ? "bg-accent-mint text-white"
                    : "bg-destructive text-white"
                    }`}
                >
                  {isPassed ? (
                    <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-8 h-8 stroke-[2.5]" />
                  )}
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-1 tracking-wide ${isPassed
                    ? "bg-accent-mint text-white"
                    : "bg-destructive text-white"
                    }`}
                >
                  {isPassed
                    ? "🏆 LULUS EVALUASI PEMAHAMAN"
                    : "⚠️ BELUM MEMENUHI SYARAT KELULUSAN"}
                </span>

                <h3 className="text-xl font-bold text-on-surface mt-1">
                  {isPassed
                    ? "Selamat! Anda Menguasai Modul 3"
                    : "Skor Di Bawah Passing Grade 75%"}
                </h3>

                <p className="text-xs sm:text-sm text-secondary mt-1 max-w-md mx-auto leading-relaxed">
                  {isPassed
                    ? "Kemampuan Anda dalam konsep Sensor Fusion, ROS2 TF2, dan filter odometri EKF telah memenuhi standar kelulusan akademik."
                    : `Anda menjawab ${totalCorrect} dari ${quizData.length} soal dengan benar (${scorePercentage}%). Untuk membuka modul berikutnya, diperlukan minimal 4 jawaban benar (75%).`}
                </p>
              </div>

              {/* Metric Badges Grid: Non-point Informative Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-surface-dim border border-line rounded-xl p-3.5 text-center">
                  <span className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    Skor Akhir
                  </span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                    {scorePercentage}%
                  </span>
                  <span className="text-[11px] text-secondary block mt-0.5">
                    {totalCorrect} dari {quizData.length} Benar
                  </span>
                </div>

                <div className="bg-surface-dim border border-line rounded-xl p-3.5 text-center">
                  <span className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    Status Kriteria
                  </span>
                  <span
                    className={`inline-flex items-center text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full mt-1.5 border ${isPassed
                      ? "bg-accent-mint-soft text-accent-mint border-accent-mint/30"
                      : "bg-destructive/15 text-destructive border-destructive/30"
                      }`}
                  >
                    {isPassed ? "LULUS (>= 75%)" : "BELUM LULUS (< 75%)"}
                  </span>
                  <span className="text-[10px] text-secondary block mt-1">
                    Passing Grade 75%
                  </span>
                </div>

                <div className="bg-surface-dim border border-line rounded-xl p-3.5 text-center">
                  <span className="block text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                    Akurasi Jawaban
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-primary-container flex items-center justify-center gap-1 mt-0.5">
                    <span>{scorePercentage}%</span>
                  </span>
                  <span className="text-[10px] text-secondary block mt-1">
                    {isPassed
                      ? "Memenuhi Standar Kelulusan"
                      : "Di Bawah Target Standar"}
                  </span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Rincian Jawaban 5 Soal:
                  </h4>
                  <span className="text-[11px] text-secondary">
                    Klik nomor untuk meninjau
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {quizData.map((q, idx) => {
                    const userAns = answers[idx];
                    const isCorrect = userAns === q.correct;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentIndex(idx);
                          setView("quiz");
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition hover:scale-[1.02] ${isCorrect
                          ? "bg-accent-mint-soft border-accent-mint/40 text-on-surface"
                          : "bg-destructive/10 border-destructive/30 text-on-surface"
                          }`}
                      >
                        <div>
                          <span className="font-bold block text-on-surface">
                            Soal #{idx + 1}
                          </span>
                          <span className="text-[10px] text-secondary">
                            {userAns || "-"} (
                            {isCorrect ? "Benar" : `Kunci: ${q.correct}`})
                          </span>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full text-white flex items-center justify-center text-[10px] font-bold ${isCorrect ? "bg-accent-mint" : "bg-destructive"
                            }`}
                        >
                          {isCorrect ? "✓" : "✕"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Guidance Box */}
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed border ${isPassed
                  ? "border-accent-mint/30 bg-accent-mint-soft/50 text-on-surface"
                  : "border-line bg-surface-dim text-secondary"
                  }`}
              >
                {isPassed ? (
                  <p>
                    <strong className="text-accent-mint font-semibold">
                      Kesiapan Praktikum:
                    </strong>{" "}
                    Modul 4 (Navigation2 Stack &amp; Costmaps) sekarang terbuka! Anda
                    dapat melanjutkan ke jalur pembelajaran robotika berikutnya.
                  </p>
                ) : (
                  <p>
                    <strong className="text-on-surface font-semibold">
                      Rekomendasi Belajar:
                    </strong>{" "}
                    Pelajari kembali materi modul dan catatan tentang{" "}
                    <em>Transform Tree (TF2)</em> dan{" "}
                    <em>Extended Kalman Filter</em> sebelum mencoba kuis ulang.
                  </p>
                )}
              </div>
            </div>

            {/* Summary Footer */}
            <footer className="p-4 sm:px-6 bg-surface-dim border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-on-surface bg-surface border border-line hover:bg-surface-dim transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4 text-secondary" />
                  <span>Ulangi Kuis</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentIndex(0);
                    setView("quiz");
                  }}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-secondary hover:text-on-surface hover:bg-surface border border-transparent hover:border-line transition"
                >
                  Lihat Pembahasan
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {!isPassed && (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentIndex(0);
                      setView("quiz");
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-secondary bg-surface border border-line hover:text-on-surface hover:bg-surface-dim transition flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Pelajari Ulang Materi</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={!isPassed}
                  onClick={() => {
                    alert("Selamat! Mengarahkan ke Modul 4: Navigation2 Stack & Costmaps...");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-primary-container hover:bg-primary-hover shadow-xs transition flex items-center justify-center gap-2 disabled:bg-surface-dim disabled:text-secondary disabled:border disabled:border-line disabled:cursor-not-allowed"
                >
                  <span>
                    {isPassed
                      ? "Lanjut ke Modul Berikutnya"
                      : "🔒 Modul Berikutnya Terkunci"}
                  </span>
                  {isPassed ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </button>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

