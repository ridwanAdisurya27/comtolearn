"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import {
    ArrowLeft,
    Check,
    ChevronDown,
    Loader2,
    School,
    Upload,
    User,
} from "lucide-react";

const STEPS = [
    { id: 1, label: "Identitas" },
    { id: 2, label: "Foto Profil" },
    { id: 3, label: "Minat" },
    { id: 4, label: "Selesai" },
] as const;

const FACULTIES = [
    "Fakultas Ilmu Komputer",
    "Sekolah Teknik Elektro & Informatika",
    "Fakultas Seni Rupa & Desain",
    "Sekolah Bisnis & Manajemen",
    "Fakultas Teknik Sipil & Lingkungan",
    "Fakultas Matematika & Ilmu Pengetahuan Alam",
];

const INTEREST_OPTIONS = [
    "Game Development",
    "Robotika & IoT",
    "UI/UX Design",
    "Kecerdasan Buatan (AI)",
    "Web Development",
    "Mobile App Dev",
    "Fotografi & Sinematografi",
    "Aeromodelling",
    "Sains Data",
    "Cyber Security",
    "Game Design",
];

const DEFAULT_AVATAR =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDsFBIeb4NHXrDjhqEs0A_Z2vZMkJbWsazsuptICjTWdSSESW4s0nw908cZtpp_faePul8Rp3_uty9rKj1_ajhya5XwUnwixNNyWeqmCMh-KaFD1WiOU_jn-WSt-m_qFrLX-cyYjuos2qG0yZJyhKHU6V-KRkq4-znpbxnBGFizKUybhoK4l597jjIL_w3Qiec1FGM42b1kyumeKIn0FxpJF6EQ4aweI1LCEb9Sb7I";

export default function NewUserOnboardingPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const nicknameInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState<number>(1);
    const [maxStepReached, setMaxStepReached] = useState<number>(1);
    const [activeField, setActiveField] = useState<"nickname" | "username" | "faculty" | null>("faculty");

    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [faculty, setFaculty] = useState("Fakultas Ilmu Komputer");

    const [avatarUrl, setAvatarUrl] = useState<string>(DEFAULT_AVATAR);
    const [useDefaultAvatar, setUseDefaultAvatar] = useState(true);

    const [selectedInterests, setSelectedInterests] = useState<string[]>([
        "Game Development",
        "UI/UX Design",
    ]);

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [submitState, setSubmitState] = useState<"idle" | "loading" | "saved">("idle");

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Campus usernames only permit lowercase alphanumerics, dots, and underscores.
        const cleaned = e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, "");
        setUsername(cleaned);
        if (errorMsg) setErrorMsg(null);
    };

    const handleAvatarFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setErrorMsg("Ukuran foto maksimal 5MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setAvatarUrl(event.target.result as string);
                setUseDefaultAvatar(false);
                setErrorMsg(null);
            }
        };
        reader.readAsDataURL(file);
    };

    const toggleInterest = (interest: string) => {
        setErrorMsg(null);
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((item) => item !== interest)
                : [...prev, interest]
        );
    };

    const validateStep = (stepToCheck: number) => {
        if (stepToCheck === 1) {
            if (!nickname.trim()) {
                setStep(1);
                setActiveField("nickname");
                setErrorMsg("Isi nama panggilan kamu terlebih dahulu.");
                return false;
            }
            if (username.trim().length < 3) {
                setStep(1);
                setActiveField("username");
                setErrorMsg("Username minimal 3 karakter.");
                return false;
            }
        }

        if (stepToCheck === 3 && selectedInterests.length < 2) {
            setStep(3);
            setErrorMsg("Pilih minimal 2 minat belajar agar rekomendasi UKM akurat.");
            return false;
        }

        return true;
    };

    const handleNextStep = () => {
        setErrorMsg(null);
        if (!validateStep(step)) return;

        if (step < 4) {
            const nextStep = step + 1;
            setStep(nextStep);
            setMaxStepReached((prev) => Math.max(prev, nextStep));
            return;
        }

        setSubmitState("loading");
        setTimeout(() => {
            setSubmitState("saved");
            router.push("/dashboard");
        }, 600);
    };

    const handlePrevStep = () => {
        setErrorMsg(null);
        if (step > 1) setStep((s) => s - 1);
    };

    const handleStepClick = (targetStep: number) => {
        if (submitState === "loading" || targetStep > maxStepReached || targetStep === step) {
            return;
        }
        setErrorMsg(null);

        if (targetStep > step) {
            for (let s = step; s < targetStep; s += 1) {
                if (!validateStep(s)) return;
            }
        }

        setStep(targetStep);
    };

    const isNicknameOpen = activeField === "nickname" || nickname.length > 0;
    const isUsernameOpen = activeField === "username" || username.length > 0;

    return (
        <div className="min-h-screen bg-surface text-on-surface antialiased flex flex-col px-4 py-8 sm:py-12">
            <div className="w-full max-w-[420px] mx-auto flex-1 flex flex-col items-center">
                <header className="w-full flex flex-col items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-7 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 min-h-[44px]"
                    >
                        <span className="w-7 h-7 rounded-md bg-primary-container flex items-center justify-center text-white font-bold text-sm leading-none transition-transform group-hover:scale-105">
                            C
                        </span>
                        <span className="font-bold text-lg text-on-surface tracking-tight">
                            ComtoLearn
                        </span>
                    </Link>

                    <nav aria-label="Tahapan pendaftaran" className="w-full flex items-center justify-center mb-7">
                        <ol className="flex items-center justify-center">
                            {STEPS.map((item, idx) => {
                                const isActive = step === item.id;
                                const isUnlocked = item.id <= maxStepReached;
                                const isCompleted = item.id < step;

                                return (
                                    <li key={item.id} className="flex items-center">
                                        {isActive ? (
                                            <div
                                                aria-current="step"
                                                aria-label={`Tahap ${item.id}: ${item.label}`}
                                                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mx-1.5 select-none cursor-default"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-primary-container text-white text-xs font-semibold flex items-center justify-center transition-colors">
                                                    {item.id}
                                                </span>
                                            </div>
                                        ) : isUnlocked ? (
                                            <button
                                                type="button"
                                                disabled={submitState === "loading"}
                                                onClick={() => handleStepClick(item.id)}
                                                aria-label={`Pindah ke Tahap ${item.id}: ${item.label}`}
                                                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mx-1.5 rounded-full cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-primary-container-soft text-primary border border-primary/20 hover:border-primary/50 text-xs font-semibold flex items-center justify-center transition-colors">
                                                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : item.id}
                                                </span>
                                            </button>
                                        ) : (
                                            <div
                                                aria-label={`Tahap ${item.id}: ${item.label} (belum selesai)`}
                                                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] -mx-1.5 select-none cursor-not-allowed"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-surface text-secondary border border-line opacity-70 text-xs font-semibold flex items-center justify-center transition-colors">
                                                    {item.id}
                                                </span>
                                            </div>
                                        )}
                                        {idx < STEPS.length - 1 && (
                                            <div
                                                aria-hidden="true"
                                                className={`w-8 sm:w-10 h-[1px] transition-colors ${item.id < maxStepReached ? "bg-primary-container/40" : "bg-line"
                                                    }`}
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </header>

                <main className="w-full flex-1">
                    {step === 1 && (
                        <section className="w-full text-center">
                            <h1 className="text-2xl font-bold text-on-surface tracking-tight">
                                Mulai Profil Belajarmu!
                            </h1>
                            <p className="text-sm text-secondary mt-2 mb-7">
                                Kamu selalu bisa mengubahnya nanti.
                            </p>

                            <form
                                className="w-full space-y-3 text-left"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleNextStep();
                                }}
                            >
                                <div
                                    onClick={() => {
                                        setActiveField("nickname");
                                        nicknameInputRef.current?.focus();
                                    }}
                                    className={`rounded-lg px-4 transition-all cursor-text ${isNicknameOpen
                                            ? "bg-surface border-[1.5px] border-primary-container ring-3 ring-primary-container-soft/60 py-2.5"
                                            : "bg-surface-dim border border-transparent py-3.5 hover:bg-line-subtle"
                                        }`}
                                >
                                    <label
                                        htmlFor="nicknameInput"
                                        className={`block transition-all cursor-text ${isNicknameOpen
                                                ? "text-[11px] font-medium text-secondary mb-0.5"
                                                : "text-sm font-normal text-secondary"
                                            }`}
                                    >
                                        Siapa nama panggilan kamu?
                                    </label>
                                    <input
                                        ref={nicknameInputRef}
                                        id="nicknameInput"
                                        type="text"
                                        value={nickname}
                                        onFocus={() => setActiveField("nickname")}
                                        onChange={(e) => {
                                            setNickname(e.target.value);
                                            if (errorMsg) setErrorMsg(null);
                                        }}
                                        maxLength={32}
                                        placeholder="Contoh: Andra Seto"
                                        className={`w-full bg-transparent text-sm font-semibold text-on-surface placeholder:text-secondary/50 placeholder:font-normal focus:outline-none ${isNicknameOpen ? "h-5 opacity-100" : "h-0 opacity-0 pointer-events-none"
                                            }`}
                                    />
                                </div>

                                <div
                                    onClick={() => {
                                        setActiveField("username");
                                        usernameInputRef.current?.focus();
                                    }}
                                    className={`rounded-lg px-4 transition-all cursor-text ${isUsernameOpen
                                            ? "bg-surface border-[1.5px] border-primary-container ring-3 ring-primary-container-soft/60 py-2.5"
                                            : "bg-surface-dim border border-transparent py-3.5 hover:bg-line-subtle"
                                        }`}
                                >
                                    <label
                                        htmlFor="usernameInput"
                                        className={`block transition-all cursor-text ${isUsernameOpen
                                                ? "text-[11px] font-medium text-secondary mb-0.5"
                                                : "text-sm font-normal text-secondary"
                                            }`}
                                    >
                                        Apa username kampus kamu?
                                    </label>
                                    <div
                                        className={`flex items-center ${isUsernameOpen ? "h-5 opacity-100" : "h-0 opacity-0 pointer-events-none overflow-hidden"
                                            }`}
                                    >
                                        <span className="text-sm font-semibold text-secondary mr-0.5">@</span>
                                        <input
                                            ref={usernameInputRef}
                                            id="usernameInput"
                                            type="text"
                                            value={username}
                                            onFocus={() => setActiveField("username")}
                                            onChange={handleUsernameChange}
                                            maxLength={24}
                                            placeholder="andra_seto"
                                            autoComplete="off"
                                            className="w-full bg-transparent text-sm font-semibold text-on-surface placeholder:text-secondary/50 placeholder:font-normal focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div
                                    onClick={() => setActiveField("faculty")}
                                    className={`relative rounded-lg px-4 transition-all cursor-pointer ${activeField === "faculty"
                                            ? "bg-surface border-[1.5px] border-primary-container ring-3 ring-primary-container-soft/60 py-2.5"
                                            : "bg-surface-dim border border-transparent py-2.5 hover:bg-line-subtle"
                                        }`}
                                >
                                    <label
                                        htmlFor="facultySelect"
                                        className="block text-[11px] font-medium text-secondary mb-0.5 cursor-pointer"
                                    >
                                        Dari fakultas mana kamu berasal?
                                    </label>
                                    <div className="relative flex items-center">
                                        <select
                                            id="facultySelect"
                                            value={faculty}
                                            onFocus={() => setActiveField("faculty")}
                                            onChange={(e) => setFaculty(e.target.value)}
                                            className="w-full appearance-none bg-transparent pr-6 text-sm font-semibold text-on-surface focus:outline-none cursor-pointer"
                                        >
                                            {FACULTIES.map((fac) => (
                                                <option key={fac} value={fac}>
                                                    {fac}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-secondary pointer-events-none absolute right-0" />
                                    </div>
                                </div>

                                {errorMsg && (
                                    <p role="alert" className="text-xs text-destructive font-medium pt-1">
                                        {errorMsg}
                                    </p>
                                )}

                                <div className="pt-3">
                                    <button
                                        type="submit"
                                        className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        Lanjutkan
                                    </button>
                                </div>
                            </form>
                        </section>
                    )}

                    {step === 2 && (
                        <section className="w-full text-center">
                            <h1 className="text-2xl font-bold text-on-surface tracking-tight">
                                Pasang Foto Profil
                            </h1>
                            <p className="text-sm text-secondary mt-2 mb-7">
                                Agar teman diskusi dan mentor UKM mudah mengenalimu.
                            </p>

                            <div className="w-full space-y-3 text-left">
                                <div className="bg-surface-dim rounded-lg p-4 flex items-center gap-4 border border-line-subtle">
                                    <div className="w-16 h-16 rounded-full bg-primary-container-soft flex items-center justify-center overflow-hidden shrink-0 border border-line">
                                        {useDefaultAvatar ? (
                                            <User className="w-8 h-8 text-primary" />
                                        ) : (
                                            <Image
                                                src={avatarUrl}
                                                alt="Pratinjau foto profil"
                                                width={64}
                                                height={64}
                                                unoptimized
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-on-surface truncate">
                                            {nickname || "Mahasiswa"}
                                        </p>
                                        <p className="text-xs text-secondary truncate">@{username || "username"}</p>
                                        <p className="text-[11px] text-secondary mt-1">
                                            Format .jpg atau .png, maks 5MB.
                                        </p>
                                    </div>
                                </div>

                                <label className="w-full h-11 px-4 rounded-lg bg-surface border-[1.5px] border-primary-container text-primary text-sm font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-accent-soft transition-colors focus-within:ring-2 focus-within:ring-primary">
                                    <Upload className="w-4 h-4" />
                                    <span>Pilih Foto dari Perangkat</span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className="sr-only"
                                        onChange={handleAvatarFileChange}
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setUseDefaultAvatar(true);
                                        setErrorMsg(null);
                                    }}
                                    className={`w-full h-11 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${useDefaultAvatar
                                            ? "bg-primary-container-soft text-primary"
                                            : "bg-surface-dim text-secondary hover:text-on-surface"
                                        }`}
                                >
                                    <User className="w-4 h-4" />
                                    <span>Gunakan Avatar Default Kampus</span>
                                </button>

                                {errorMsg && (
                                    <p role="alert" className="text-xs text-destructive font-medium pt-1">
                                        {errorMsg}
                                    </p>
                                )}

                                <div className="pt-3 space-y-2">
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        Lanjutkan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="w-full min-h-[44px] rounded-lg text-secondary hover:text-on-surface text-xs font-medium inline-flex items-center justify-center gap-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Kembali</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {step === 3 && (
                        <section className="w-full text-center">
                            <h1 className="text-2xl font-bold text-on-surface tracking-tight">
                                Pilih Minat Belajarmu
                            </h1>
                            <p className="text-sm text-secondary mt-2 mb-7">
                                Pilih minimal 2 topik riset atau UKM ({selectedInterests.length} dipilih).
                            </p>

                            <div className="w-full space-y-4">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {INTEREST_OPTIONS.map((interest) => {
                                        const selected = selectedInterests.includes(interest);
                                        return (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => toggleInterest(interest)}
                                                aria-pressed={selected}
                                                className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${selected
                                                        ? "bg-surface border-[1.5px] border-primary-container text-primary ring-2 ring-primary-container-soft/60"
                                                        : "bg-surface-dim border border-transparent text-secondary hover:text-on-surface hover:bg-line-subtle"
                                                    }`}
                                            >
                                                {selected && <Check className="w-3.5 h-3.5 text-primary stroke-[2.5]" />}
                                                <span>{interest}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {errorMsg && (
                                    <p role="alert" className="text-xs text-destructive font-medium">
                                        {errorMsg}
                                    </p>
                                )}

                                <div className="pt-3 space-y-2">
                                    <button
                                        type="button"
                                        onClick={handleNextStep}
                                        className="w-full h-11 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        Lanjutkan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handlePrevStep}
                                        className="w-full min-h-[44px] rounded-lg text-secondary hover:text-on-surface text-xs font-medium inline-flex items-center justify-center gap-1 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Kembali</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {step === 4 && (
                        <section className="w-full text-center">
                            <h1 className="text-2xl font-bold text-on-surface tracking-tight">
                                Profil Siap Digunakan!
                            </h1>
                            <p className="text-sm text-secondary mt-2 mb-7">
                                Pastikan detail kartu mahasiswa kamu sudah sesuai.
                            </p>

                            <div className="w-full space-y-3 text-left">
                                <div className="bg-surface border-[1.5px] border-primary-container ring-3 ring-primary-container-soft/60 rounded-lg p-4 space-y-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-full bg-primary-container-soft flex items-center justify-center overflow-hidden shrink-0 border border-line">
                                            {useDefaultAvatar ? (
                                                <User className="w-6 h-6 text-primary" />
                                            ) : (
                                                <Image
                                                    src={avatarUrl}
                                                    alt="Avatar akhir"
                                                    width={48}
                                                    height={48}
                                                    unoptimized
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-on-surface truncate">
                                                {nickname}
                                            </p>
                                            <p className="text-xs text-secondary truncate">@{username}</p>
                                            <p className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                                                <School className="w-3.5 h-3.5 shrink-0" />
                                                <span className="truncate">{faculty}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-line-subtle">
                                        <p className="text-[11px] font-medium text-secondary mb-2">
                                            Minat Terpilih:
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedInterests.map((interest) => (
                                                <span
                                                    key={interest}
                                                    className="px-2.5 py-0.5 rounded-md bg-primary-container-soft text-primary text-xs font-medium"
                                                >
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 space-y-2">
                                    <button
                                        type="button"
                                        disabled={submitState === "loading"}
                                        onClick={handleNextStep}
                                        className={`w-full h-11 rounded-lg text-white text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${submitState === "saved"
                                                ? "bg-accent-mint"
                                                : "bg-primary-container hover:bg-primary-hover"
                                            }`}
                                    >
                                        {submitState === "loading" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Menyimpan Profil...</span>
                                            </>
                                        ) : submitState === "saved" ? (
                                            <>
                                                <Check className="w-4 h-4 stroke-[2.5]" />
                                                <span>Profil Tersimpan</span>
                                            </>
                                        ) : (
                                            <span>Masuk ke Dashboard</span>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={submitState === "loading"}
                                        onClick={handlePrevStep}
                                        className="w-full min-h-[44px] rounded-lg text-secondary hover:text-on-surface text-xs font-medium inline-flex items-center justify-center gap-1 transition-colors cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        <span>Ubah Pilihan</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}
