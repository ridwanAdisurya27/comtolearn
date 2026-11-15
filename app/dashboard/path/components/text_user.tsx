"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    ArrowDown,
    ArrowRight,
    Check,
    CheckCircle2,
    ChevronLeft,
    Code2,
    Cpu,
    Layers,
    Lock,
    Network,
    RotateCcw,
    Sliders,
    Sparkles,
    X,
} from "lucide-react";

interface TextUserProps {
    onComplete?: () => void;
    onClose?: () => void;
    onPrev?: () => void;
}

export default function TextUser({ onComplete, onClose, onPrev }: TextUserProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [scrollPercent, setScrollPercent] = useState<number>(0);
    const [unlockedSlides, setUnlockedSlides] = useState<Record<number, boolean>>({});

    const totalSlides = 4;
    const isCurrentUnlocked = Boolean(unlockedSlides[currentSlide]);

    const handleScroll = useCallback(() => {
        const el = scrollAreaRef.current;
        if (!el) return;

        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        if (scrollHeight <= 0) {
            setScrollPercent(100);
            setUnlockedSlides((prev) => ({ ...prev, [currentSlide]: true }));
            return;
        }

        const percent = Math.min(
            100,
            Math.max(0, Math.round((scrollTop / scrollHeight) * 100))
        );
        setScrollPercent(percent);

        if (scrollHeight - scrollTop <= 25) {
            setUnlockedSlides((prev) => ({ ...prev, [currentSlide]: true }));
        }
    }, [currentSlide]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = 0;
        }
        handleScroll();
    }, [currentSlide, handleScroll]);

    const handleNextClick = () => {
        if (!isCurrentUnlocked) return;

        if (currentSlide < totalSlides - 1) {
            setCurrentSlide((prev) => prev + 1);
        } else {
            if (onComplete) {
                onComplete();
            } else {
                alert("Selamat! Anda telah menyelesaikan seluruh materi Modul 3.");
            }
        }
    };

    const handlePrevClick = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        } else if (onPrev) {
            onPrev();
        }
    };

    const handleSimulateLocked = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        setUnlockedSlides((prev) => ({ ...prev, [currentSlide]: false }));
        setScrollPercent(0);
    };

    const handleSimulateUnlocked = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
        setUnlockedSlides((prev) => ({ ...prev, [currentSlide]: true }));
        setScrollPercent(100);
    };

    const handleResetPosition = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        setTimeout(() => {
            handleScroll();
        }, 150);
    };

    return (
        <div className="h-full w-full font-sans bg-page-canvas text-on-surface antialiased p-3 sm:p-6 flex flex-col items-center justify-center overflow-y-auto">
            {/* Main Modal Card */}
            <section
                aria-labelledby="modal-headline"
                aria-modal="true"
                role="dialog"
                className="w-full max-w-[640px] bg-surface rounded-2xl border border-line shadow-md overflow-hidden flex flex-col max-h-[90vh] my-auto shrink-0 relative"
            >
                {/* Modal Header */}
                <header className="pt-5 px-6 pb-4 border-b border-line bg-surface shrink-0">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-primary-container-soft text-primary-container border border-primary-container/20">
                                Modul 3: ROS2 &amp; Sensor Fusion
                            </span>
                            <span className="text-xs font-medium text-secondary/40">•</span>
                            <span className="text-xs font-semibold text-secondary">
                                Slide {currentSlide + 1} dari {totalSlides}
                            </span>
                        </div>

                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                aria-label="Tutup modal pembelajaran"
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-dim transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Segmented Progress Bar (4 Slides) */}
                    <div
                        aria-label="Progress Pembelajaran Slide"
                        className="w-full bg-surface-dim h-1.5 rounded-full overflow-hidden flex gap-1 p-[1px] border border-line"
                    >
                        {[0, 1, 2, 3].map((idx) => (
                            <div
                                key={idx}
                                className={`h-full rounded-full transition-all duration-300 w-1/4 ${idx <= currentSlide ? "bg-primary-container" : "bg-line"
                                    }`}
                            />
                        ))}
                    </div>
                </header>

                {/* Reading Progress Tracker Strip (Sub-Header) */}
                <div
                    className={`px-6 py-2 border-b flex items-center justify-between transition-colors duration-200 shrink-0 ${isCurrentUnlocked
                        ? "bg-accent-mint-soft/70 border-accent-mint/30"
                        : "bg-surface-dim border-line"
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${isCurrentUnlocked
                                ? "bg-accent-mint text-white"
                                : "bg-primary-container-soft text-primary-container"
                                }`}
                        >
                            {isCurrentUnlocked ? (
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                            ) : (
                                <ArrowDown className="w-2.5 h-2.5 animate-bounce stroke-[2.5]" />
                            )}
                        </span>
                        <span
                            className={`text-[11px] font-semibold ${isCurrentUnlocked ? "text-accent-mint" : "text-secondary"
                                }`}
                        >
                            {isCurrentUnlocked
                                ? `Materi Slide ${currentSlide + 1} selesai dibaca`
                                : "Gulir ke bawah untuk membuka slide berikutnya"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-20 bg-line rounded-full h-1.5 overflow-hidden">
                            <div
                                style={{ width: `${scrollPercent}%` }}
                                className={`h-full transition-all duration-150 ${isCurrentUnlocked ? "bg-accent-mint" : "bg-primary-container"
                                    }`}
                            />
                        </div>
                        <span className="text-[11px] font-bold text-on-surface font-mono w-8 text-right">
                            {scrollPercent}%
                        </span>
                    </div>
                </div>

                {/* Modal Body (Vertically Scrollable Container) */}
                <div
                    ref={scrollAreaRef}
                    onScroll={handleScroll}
                    className="p-5 sm:p-6 overflow-y-auto max-h-[58vh] space-y-6 scroll-smooth flex-1"
                >
                    {/* SLIDE 1: PRINSIP SENSOR FUSION DENGAN EKF */}
                    {currentSlide === 0 && (
                        <>
                            <figure className="relative rounded-xl border border-line bg-surface-dim/40 p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-line text-[11px] font-semibold text-on-surface shadow-xs">
                                        <Cpu className="w-3.5 h-3.5 text-primary-container" />
                                        <span>Visual Diagram: Sensor Fusion Arsitektur</span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-secondary font-mono tracking-tight">
                                        EKF_NODE_v2
                                    </span>
                                </div>

                                <div className="w-full py-4 px-3 bg-surface rounded-lg border border-line shadow-xs flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 520 170"
                                        className="w-full max-h-48"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <pattern id="grid-1" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="#E2E6ED" />
                                        </pattern>
                                        <rect width="520" height="170" fill="url(#grid-1)" opacity="0.6" />

                                        <g>
                                            <rect x="24" y="24" width="112" height="48" rx="8" fill="#F5F6F9" stroke="#CBD5E1" strokeWidth="1.5" />
                                            <text x="80" y="44" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">RPLiDAR A1</text>
                                            <text x="80" y="58" textAnchor="middle" fill="#576071" fontSize="9">/scan (2D Cloud)</text>
                                        </g>

                                        <g>
                                            <rect x="24" y="98" width="112" height="48" rx="8" fill="#F5F6F9" stroke="#CBD5E1" strokeWidth="1.5" />
                                            <text x="80" y="118" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">IMU MPU6050</text>
                                            <text x="80" y="132" textAnchor="middle" fill="#576071" fontSize="9">/imu/data_raw</text>
                                        </g>

                                        <path d="M 136 48 L 194 48 L 222 75" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                                        <path d="M 136 122 L 194 122 L 222 95" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

                                        <g>
                                            <rect x="224" y="50" width="144" height="70" rx="10" fill="#EEF2FF" stroke="#2355E0" strokeWidth="2" />
                                            <text x="296" y="76" textAnchor="middle" fill="#003DBB" fontSize="11" fontWeight="800">ROBOT_LOCALIZATION</text>
                                            <text x="296" y="92" textAnchor="middle" fill="#2355E0" fontSize="10" fontWeight="600">EKF Node Filter</text>
                                            <text x="296" y="106" textAnchor="middle" fill="#576071" fontSize="8">Covariance Estimation</text>
                                        </g>

                                        <path d="M 368 85 L 416 85" stroke="#2355E0" strokeWidth="2.2" strokeLinecap="round" />
                                        <polygon fill="#2355E0" points="418,85 410,80 410,90" />

                                        <g>
                                            <rect x="420" y="61" width="82" height="48" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
                                            <text x="461" y="81" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="700">/odometry</text>
                                            <text x="461" y="95" textAnchor="middle" fill="#059669" fontSize="8.5">/filtered</text>
                                        </g>
                                    </svg>
                                </div>
                                <figcaption className="mt-2 text-center text-[11px] text-secondary">
                                    Alur data publisher multi-sensor menuju satu state estimator node pada ekosistem ROS2 Humble.
                                </figcaption>
                            </figure>

                            <article className="space-y-4">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-on-surface leading-snug">
                                        Prinsip Sensor Fusion dengan Extended Kalman Filter (EKF)
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
                                        Pada sistem navigasi robot otonom, mengandalkan satu sensor roda (<em className="italic">wheel encoder</em>) dapat menghasilkan slip dan akumulasi drift yang tinggi. Melalui package{" "}
                                        <code className="px-1.5 py-0.5 rounded bg-surface-dim text-on-surface text-[11px] font-mono border border-line">
                                            robot_localization
                                        </code>
                                        , kita memadukan observasi spasial LiDAR dan inersia IMU untuk menghitung posisi robot yang presisi secara probabilistik.
                                    </p>
                                </div>

                                <section className="space-y-2 pt-1">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                        3 Komponen Kunci Arsitektur:
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-[13px]">
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                                            <div>
                                                <span className="font-bold text-on-surface">LiDAR 2D (RPLiDAR A1):</span>
                                                <span className="text-secondary"> Memberikan data pemindaian rintangan dan pemetaan kontur bidang secara kontinu untuk meminimalisir drift jangka panjang pada odometri roda.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Inertial Measurement Unit (IMU):</span>
                                                <span className="text-secondary"> Menyediakan frekuensi tinggi terhadap akselerasi linear dan kecepatan sudut yaw agar robot tetap responsif saat manuver rotasi mendadak.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                                            <div>
                                                <span className="font-bold text-on-surface">EKF Node Fusion:</span>
                                                <span className="text-secondary"> Mengombinasikan kedua matriks kovariansi guna memprediksi nilai pose 2D (<code className="font-mono text-[11px] text-on-surface">x, y, theta</code>) yang stabil.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>

                                <section className="space-y-3 pt-2 border-t border-line">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                        <Code2 className="w-4 h-4 text-primary-container" />
                                        <span>Formulasi Matematis EKF State Estimation</span>
                                    </h3>
                                    <div className="p-3.5 bg-brand-dark text-white rounded-lg font-mono text-xs space-y-2 border border-line">
                                        <div className="text-secondary text-[10px] uppercase font-sans font-semibold tracking-wider">Tahap Prediksi (Time Update):</div>
                                        <div className="text-primary-container-soft font-semibold">x̂⁻[k] = f(x̂[k-1], u[k])</div>
                                        <div className="text-accent-mint">P⁻[k] = F[k] · P[k-1] · F[k]ᵀ + Q[k]</div>
                                        <div className="pt-2 text-secondary text-[10px] uppercase font-sans font-semibold tracking-wider border-t border-white/10">Tahap Koreksi (Measurement Update):</div>
                                        <div className="text-amber-300">K[k] = P⁻[k] · H[k]ᵀ · (H[k] · P⁻[k] · H[k]ᵀ + R[k])⁻¹</div>
                                        <div className="text-white">x̂[k] = x̂⁻[k] + K[k] · (z[k] - h(x̂⁻[k]))</div>
                                    </div>
                                </section>
                            </article>
                        </>
                    )}

                    {/* SLIDE 2: INTEGRASI NAV2 STACK & COSTMAP */}
                    {currentSlide === 1 && (
                        <>
                            <figure className="relative rounded-xl border border-line bg-surface-dim/40 p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-line text-[11px] font-semibold text-on-surface shadow-xs">
                                        <Layers className="w-3.5 h-3.5 text-primary-container" />
                                        <span>Visual Pipeline: Nav2 Costmap &amp; Controller</span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-secondary font-mono tracking-tight">
                                        NAV2_STACK_v1
                                    </span>
                                </div>

                                <div className="w-full py-4 px-3 bg-surface rounded-lg border border-line shadow-xs flex items-center justify-center">
                                    <svg viewBox="0 0 520 150" className="w-full max-h-44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <circle cx="2" cy="2" r="1" fill="#E2E6ED" />
                                        </pattern>
                                        <rect width="520" height="150" fill="url(#grid-2)" opacity="0.6" />

                                        <g>
                                            <rect x="24" y="20" width="110" height="45" rx="8" fill="#F5F6F9" stroke="#CBD5E1" strokeWidth="1.5" />
                                            <text x="79" y="40" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">/odometry/filtered</text>
                                            <text x="79" y="54" textAnchor="middle" fill="#576071" fontSize="8.5">State EKF Robot</text>
                                        </g>
                                        <g>
                                            <rect x="24" y="80" width="110" height="45" rx="8" fill="#F5F6F9" stroke="#CBD5E1" strokeWidth="1.5" />
                                            <text x="79" y="100" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="700">/scan (LiDAR)</text>
                                            <text x="79" y="114" textAnchor="middle" fill="#576071" fontSize="8.5">Obstacle Layer</text>
                                        </g>

                                        <path d="M 134 42 L 194 42 L 210 65" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />
                                        <path d="M 134 102 L 194 102 L 210 80" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

                                        <g>
                                            <rect x="210" y="40" width="150" height="65" rx="10" fill="#EEF2FF" stroke="#2355E0" strokeWidth="2" />
                                            <text x="285" y="66" textAnchor="middle" fill="#003DBB" fontSize="11" fontWeight="800">NAV2 CONTROLLER</text>
                                            <text x="285" y="82" textAnchor="middle" fill="#2355E0" fontSize="10" fontWeight="600">DWB Path Planner</text>
                                            <text x="285" y="96" textAnchor="middle" fill="#576071" fontSize="8">Costmap 2D Inflation</text>
                                        </g>

                                        <path d="M 360 72 L 410 72" stroke="#2355E0" strokeWidth="2.2" strokeLinecap="round" />
                                        <polygon fill="#2355E0" points="412,72 404,67 404,77" />

                                        <g>
                                            <rect x="414" y="48" width="85" height="48" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
                                            <text x="456" y="68" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="700">/cmd_vel</text>
                                            <text x="456" y="82" textAnchor="middle" fill="#059669" fontSize="8.5">Motor Speed (vx, wz)</text>
                                        </g>
                                    </svg>
                                </div>
                                <figcaption className="mt-2 text-center text-[11px] text-secondary">
                                    Arsitektur transmisi data sensor fusion menuju modul navigasi otonom Nav2 stack.
                                </figcaption>
                            </figure>

                            <article className="space-y-4">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-on-surface leading-snug">
                                        Integrasi Hasil Fusi Sensor dengan Nav2 Stack
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
                                        Setelah topik <code className="px-1.5 py-0.5 rounded bg-surface-dim font-mono text-xs">/odometry/filtered</code> stabil, data ini diumpankan ke stack navigasi <strong>Navigation2 (Nav2)</strong> untuk membangun Local Costmap dan menghitung perintah kendali motor robot.
                                    </p>
                                </div>

                                <section className="space-y-2 pt-1">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                        3 Komponen Utama Nav2:
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-[13px]">
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Global Costmap:</span>
                                                <span className="text-secondary"> Memetakan seluruh arena dari data SLAM untuk merencanakan rute global terpendek menuju waypoint tujuan.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Local Costmap &amp; Inflation:</span>
                                                <span className="text-secondary"> Jendela pandang lokal 3x3 meter dengan radius inflasi pengaman untuk mencegah robot menabrak rintangan dinamis.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                                            <div>
                                                <span className="font-bold text-on-surface">DWB Controller Server:</span>
                                                <span className="text-secondary"> Menghitung kecepatan linier dan angular <code className="font-mono text-[11px]">(vx, wz)</code> yang dikirim ke topik <code className="font-mono text-[11px]">/cmd_vel</code>.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>

                                <section className="space-y-2.5 pt-2 border-t border-line">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                        <Code2 className="w-4 h-4 text-primary-container" />
                                        <span>Konfigurasi Parameter Inti (nav2_params.yaml)</span>
                                    </h3>
                                    <div className="p-3.5 bg-brand-dark text-white rounded-lg font-mono text-xs space-y-1.5 border border-line">
                                        <div className="text-secondary text-[10px] uppercase font-sans font-semibold tracking-wider">controller_server:</div>
                                        <div className="text-blue-300">controller_frequency: 20.0</div>
                                        <div className="text-emerald-300">inflation_radius: 0.55</div>
                                        <div className="text-amber-300">robot_radius: 0.22</div>
                                        <div className="text-white">max_vel_x: 0.45 # Kecepatan jelajah maksimal m/s</div>
                                    </div>
                                </section>
                            </article>
                        </>
                    )}

                    {/* SLIDE 3: KALIBRASI TF2 & SINKRONISASI WAKTU */}
                    {currentSlide === 2 && (
                        <>
                            <figure className="relative rounded-xl border border-line bg-surface-dim/40 p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-line text-[11px] font-semibold text-on-surface shadow-xs">
                                        <Network className="w-3.5 h-3.5 text-primary-container" />
                                        <span>Pohon Spasial TF2 (Transform Frames)</span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-secondary font-mono tracking-tight">
                                        TF2_TREE_ROS2
                                    </span>
                                </div>

                                <div className="w-full py-4 px-3 bg-surface rounded-lg border border-line shadow-xs flex items-center justify-center">
                                    <svg viewBox="0 0 520 120" className="w-full max-h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="20" y="40" width="85" height="40" rx="8" fill="#F5F6F9" stroke="#CBD5E1" strokeWidth="1.5" />
                                        <text x="62" y="65" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">map</text>

                                        <path d="M 105 60 L 150 60" stroke="#2355E0" strokeWidth="2" markerEnd="url(#arrow)" />

                                        <rect x="155" y="40" width="85" height="40" rx="8" fill="#EEF2FF" stroke="#2355E0" strokeWidth="1.5" />
                                        <text x="197" y="65" textAnchor="middle" fill="#003DBB" fontSize="11" fontWeight="700">odom</text>

                                        <path d="M 240 60 L 285 60" stroke="#2355E0" strokeWidth="2" />

                                        <rect x="290" y="40" width="95" height="40" rx="8" fill="#EEF2FF" stroke="#2355E0" strokeWidth="2" />
                                        <text x="337" y="65" textAnchor="middle" fill="#003DBB" fontSize="11" fontWeight="800">base_link</text>

                                        <path d="M 385 50 L 425 30" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <rect x="428" y="12" width="75" height="34" rx="6" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
                                        <text x="465" y="33" textAnchor="middle" fill="#059669" fontSize="9.5" fontWeight="700">laser_frame</text>

                                        <path d="M 385 70 L 425 90" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <rect x="428" y="74" width="75" height="34" rx="6" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
                                        <text x="465" y="95" textAnchor="middle" fill="#059669" fontSize="9.5" fontWeight="700">imu_link</text>
                                    </svg>
                                </div>
                                <figcaption className="mt-2 text-center text-[11px] text-secondary">
                                    Hierarki pohon TF2: dari peta global, frame odometri kontinu, hingga frame fisik sensor.
                                </figcaption>
                            </figure>

                            <article className="space-y-4">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-on-surface leading-snug">
                                        Kalibrasi Transform Tree (TF2) &amp; Sinkronisasi Waktu
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
                                        Agar data sensor LiDAR yang berada di <code className="px-1 py-0.5 rounded bg-surface-dim font-mono text-xs">laser_frame</code> dapat diproyeksikan akurat ke pusat bodi robot <code className="px-1 py-0.5 rounded bg-surface-dim font-mono text-xs">base_link</code>, posisi statis mount harus dipublikasikan secara konsisten.
                                    </p>
                                </div>

                                <section className="space-y-2 pt-1">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                        3 Rantai Transform Utama:
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-[13px]">
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                                            <div>
                                                <span className="font-bold text-on-surface">map -&gt; odom:</span>
                                                <span className="text-secondary"> Diterbitkan oleh modul AMCL/SLAM untuk mengoreksi akumulasi error drift global secara periodik.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                                            <div>
                                                <span className="font-bold text-on-surface">odom -&gt; base_link:</span>
                                                <span className="text-secondary"> Diterbitkan oleh filter EKF secara kontinu dengan frekuensi tinggi tanpa lonjakan diskontinu.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                                            <div>
                                                <span className="font-bold text-on-surface">base_link -&gt; laser_frame:</span>
                                                <span className="text-secondary"> Menggunakan <code className="font-mono text-[11px]">static_transform_publisher</code> sesuai koordinat fisik pemasangan bracket sensor pada bodi rover.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>

                                <section className="space-y-2.5 pt-2 border-t border-line">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                                        <Code2 className="w-4 h-4 text-primary-container" />
                                        <span>Perintah Static Transform Publisher</span>
                                    </h3>
                                    <div className="p-3 bg-brand-dark text-white rounded-lg font-mono text-[11px] space-y-1.5 border border-line">
                                        <div className="text-blue-300"># Offset LiDAR: x=0.15m depan, z=0.20m atas</div>
                                        <div className="text-white">ros2 run tf2_ros static_transform_publisher 0.15 0 0.20 0 0 0 base_link laser_frame</div>
                                        <div className="pt-1 text-emerald-300"># Offset IMU: z=0.05m di pusat bodi</div>
                                        <div className="text-white">ros2 run tf2_ros static_transform_publisher 0 0 0.05 0 0 0 base_link imu_link</div>
                                    </div>
                                </section>
                            </article>
                        </>
                    )}

                    {/* SLIDE 4: PENGUJIAN LAPANGAN & VERIFIKASI DRIFT */}
                    {currentSlide === 3 && (
                        <>
                            <figure className="relative rounded-xl border border-line bg-surface-dim/40 p-4 overflow-hidden">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface border border-line text-[11px] font-semibold text-on-surface shadow-xs">
                                        <Sparkles className="w-3.5 h-3.5 text-accent-mint" />
                                        <span>Checklist &amp; Evaluasi Kesiapan Akhir</span>
                                    </span>
                                    <span className="text-[10px] font-semibold text-secondary font-mono tracking-tight">
                                        FINAL_VALIDATION
                                    </span>
                                </div>

                                <div className="p-4 bg-surface rounded-lg border border-line shadow-xs space-y-2.5">
                                    <div className="flex items-center justify-between text-xs font-semibold text-on-surface border-b border-line pb-2">
                                        <span>Metrik Evaluasi Sistem</span>
                                        <span>Status Uji</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-secondary">
                                        <span>Frekuensi /odometry/filtered</span>
                                        <span className="font-mono font-bold text-accent-mint">&gt;= 50 Hz (Stabil)</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-secondary">
                                        <span>Maksimal Latensi Transform TF</span>
                                        <span className="font-mono font-bold text-accent-mint">&lt; 15 ms</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-secondary">
                                        <span>Drift Akumulasi Rotasi 360°</span>
                                        <span className="font-mono font-bold text-accent-mint">&lt; 2.5 Derajat</span>
                                    </div>
                                </div>
                                <figcaption className="mt-2 text-center text-[11px] text-secondary">
                                    Standar kelulusan praktikum robot otonom UKM Robotika &amp; IoT.
                                </figcaption>
                            </figure>

                            <article className="space-y-4">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold tracking-tight text-on-surface leading-snug">
                                        Pengujian Lapangan &amp; Evaluasi Kestabilan Pose
                                    </h2>
                                    <p className="mt-2 text-xs sm:text-sm text-secondary leading-relaxed">
                                        Sebelum melakukan uji coba navigasi otonom penuh di arena lab, robot harus melalui tiga pengujian ketahanan terhadap skenario wheel slip dan koridor polos (featureless).
                                    </p>
                                </div>

                                <section className="space-y-2 pt-1">
                                    <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                                        3 Skenario Uji Validasi:
                                    </h3>
                                    <ul className="space-y-2 text-xs sm:text-[13px]">
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Uji Wheel Slip di Lantai Licin:</span>
                                                <span className="text-secondary"> Memastikan orientasi robot di RViz2 tidak berputar liar saat roda rover mengalami selip.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Uji Degenerasi Fitur LiDAR:</span>
                                                <span className="text-secondary"> Di lorong panjang polos simetris, estimasi pergerakan dijaga oleh dead reckoning IMU dan odometri roda.</span>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-dim/50 border border-line">
                                            <span className="w-5 h-5 rounded-full bg-primary-container-soft text-primary-container flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                                            <div>
                                                <span className="font-bold text-on-surface">Uji Recovery Behavior:</span>
                                                <span className="text-secondary"> Ketika rintangan tak terduga menghalangi jalur, robot otomatis berhenti dan memutar sensor untuk mencari jalur alternatif.</span>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </article>
                        </>
                    )}
                </div>

                {/* Modal Footer */}
                <footer className="px-5 sm:px-6 py-3.5 sm:py-4 bg-surface-dim border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                    <button
                        type="button"
                        disabled={currentSlide === 0}
                        onClick={handlePrevClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-line bg-surface text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-dim disabled:cursor-not-allowed disabled:opacity-40 transition-colors shadow-xs"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Sebelumnya</span>
                    </button>

                    <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
                        {/* Gatekeeper Status Badge */}
                        <div
                            className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md border transition-all duration-200 ${isCurrentUnlocked
                                ? "text-accent-mint bg-accent-mint-soft border-accent-mint/30"
                                : "text-secondary bg-surface border-line"
                                }`}
                        >
                        </div>

                        {/* Next Slide / Finish Button */}
                        <button
                            type="button"
                            disabled={!isCurrentUnlocked}
                            onClick={handleNextClick}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 select-none bg-primary-container hover:bg-primary-hover text-white shadow-xs disabled:bg-surface-dim disabled:text-secondary disabled:border disabled:border-line disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <span>
                                {currentSlide < totalSlides - 1
                                    ? `Lanjut ke Slide ${currentSlide + 2}`
                                    : "Selesaikan Materi Modul"}
                            </span>
                            {isCurrentUnlocked ? (
                                <ArrowRight className="w-4 h-4" />
                            ) : (
                                <Lock className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </footer>
            </section>
        </div>
    );
}
