"use client";

import React, { useState } from "react";
import {
    BookOpen,
    Check,
    ExternalLink,
    Lock,
    Play,
    RotateCcw,
    Sliders,
    ArrowRight,
    X,
} from "lucide-react";

interface VerificationModalProps {
    onComplete?: () => void;
    onClose?: () => void;
}

export default function VerificationModal({
    onComplete,
    onClose,
}: VerificationModalProps) {
    const [videoWatched, setVideoWatched] = useState<boolean>(false);
    const [linkOpened, setLinkOpened] = useState<boolean>(false);

    const isVerified = videoWatched || linkOpened;

    const handleVideoClick = () => {
        setVideoWatched(true);
    };

    const handleLinkClick = () => {
        setLinkOpened(true);
        window.open("https://docs.nav2.org", "_blank", "noopener,noreferrer");
    };

    const handleReset = () => {
        setVideoWatched(false);
        setLinkOpened(false);
    };

    const handleSubmit = () => {
        if (!isVerified) return;
        if (onComplete) {
            onComplete();
        } else {
            alert("Tahap praktikum berikutnya telah dibuka.");
        }
    };

    return (
        <div className="h-full w-full font-sans bg-page-canvas text-on-surface antialiased p-3 sm:p-6 flex flex-col items-center justify-center overflow-y-auto">
            {/* Main Modal Card */}
            <main className="w-full max-w-[620px] bg-surface rounded-2xl shadow-md border border-line overflow-hidden relative flex flex-col max-h-[92vh] my-auto shrink-0">
                {/* Modal Header */}
                <section className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-line bg-surface shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-primary-container-soft text-primary-container flex items-center justify-center shrink-0 border border-primary-container/20">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold tracking-wider text-secondary uppercase">
                                Referensi &amp; Tautan Praktikum
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                                <h2 className="text-base font-bold text-on-surface leading-none">
                                    Materi Sensor Fusion ROS2
                                </h2>
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-dim text-secondary border border-line">
                                    Wajib Selesai
                                </span>
                            </div>
                        </div>
                    </div>

                    {onClose && (
                        <button
                            onClick={onClose}
                            type="button"
                            aria-label="Tutup Modal"
                            className="text-secondary hover:text-on-surface hover:bg-surface-dim p-1.5 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </section>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                    <p className="text-sm text-secondary leading-relaxed">
                        Tonton video tutorial integrasi ROS2 Bag &amp; LiDAR di bawah ini atau baca dokumentasi resmi sebelum membuka modul selanjutnya.
                    </p>

                    {/* YouTube Preview Card */}
                    <div
                        onClick={handleVideoClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleVideoClick();
                            }
                        }}
                        className="border border-line rounded-xl overflow-hidden bg-surface-dim/40 hover:border-primary-container hover:shadow-xs transition-all shadow-xs cursor-pointer group"
                    >
                        <div className="relative aspect-video w-full bg-brand-dark overflow-hidden">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY_5vPYoAVYD8LbKZl0VVLfFEfD91nwHhKG_VBJLgA6YcIIj-ZKkiJ3_0ReBcQLn1oQulbYMcqJy4TLjjlEOyT05k5WEJKX1amvGlEH4gPl6yJy5vw3a1t8OJHb7TSjFS1Qr03QGUgVQkQV2i_9roMpG57lf0qA1iJrI2Jj3iJ6udyWIOY-9VxYHJLGmBwWA9mdA-_nyoqxwvHGYw5Xwb2smAoDfdKiNqNALjjrA"
                                alt="Thumbnail Video Tutorial ROS2"
                                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/30 transition-colors" />

                            {/* YouTube Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-10 bg-destructive group-hover:bg-destructive/90 text-white rounded-xl flex items-center justify-center shadow-md transition-transform transform group-hover:scale-110">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                </div>
                            </div>

                            {/* Timestamp Badge */}
                            <div className="absolute bottom-2.5 right-2.5 bg-brand-dark/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                                12:45
                            </div>
                        </div>

                        <div className="p-3.5 bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-line">
                            <div className="space-y-1">
                                <h3 className="text-sm font-semibold text-on-surface line-clamp-1 group-hover:text-primary-container transition-colors">
                                    Tutorial ROS2 Sensor Fusion: Menggabungkan RPLiDAR &amp; MPU6050
                                </h3>
                                <p className="text-xs text-secondary">
                                    UKM Robotika Lab • 1.2k views
                                </p>
                            </div>

                            <span
                                className={`inline-flex items-center gap-1.5 self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 transition-all ${videoWatched
                                    ? "bg-accent-mint-soft text-accent-mint border-accent-mint/30"
                                    : "bg-surface-dim text-secondary border border-line"
                                    }`}
                            >
                                {videoWatched ? (
                                    <>
                                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                        <span>Sudah Ditonton</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-2 h-2 rounded-full bg-secondary/50" />
                                        <span>Belum Ditonton</span>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Article Link Card */}
                    <div className="p-3.5 rounded-xl border border-line bg-surface hover:bg-surface-dim/70 hover:border-line transition-all flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-surface-dim text-secondary flex items-center justify-center shrink-0 border border-line">
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                                <div className="flex items-center gap-2">
                                    <h4 className="text-xs font-semibold text-on-surface truncate">
                                        Dokumentasi Resmi Navigation2 (Nav2) Sensor Tuning Guide
                                    </h4>
                                    <span
                                        className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${linkOpened
                                            ? "bg-accent-mint-soft text-accent-mint border-accent-mint/30"
                                            : "bg-surface-dim text-secondary border border-line"
                                            }`}
                                    >
                                        {linkOpened ? "Sudah Diakses" : "Belum Dibuka"}
                                    </span>
                                </div>
                                <p className="text-[11px] text-secondary truncate">
                                    docs.nav2.org • Rujukan Tambahan
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleLinkClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary-container bg-primary-container-soft hover:bg-primary-container-soft/80 transition-colors shrink-0"
                        >
                            <span>Buka Tautan</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Modal Footer */}
                <footer className="px-5 sm:px-6 py-3.5 sm:py-4 bg-surface-dim border-t border-line flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 shrink-0">
                    <button
                        type="button"
                        disabled={!isVerified}
                        onClick={handleSubmit}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 select-none bg-primary-container hover:bg-primary-hover text-white shadow-xs disabled:bg-surface-dim disabled:text-secondary disabled:border disabled:border-line disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {isVerified ? (
                            <>
                                <span>Selesaikan &amp; Lanjut</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        ) : (
                            <>
                                <Lock className="w-3.5 h-3.5" />
                                <span>Selesaikan &amp; Lanjut</span>
                            </>
                        )}
                    </button>
                </footer>
            </main>
        </div>
    );
}

