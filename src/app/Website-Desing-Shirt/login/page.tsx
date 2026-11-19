
"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Shirtwhite from "@/src/public/เสื้อสีขาว.webp";
import Shirtblack from "@/src/public/เสื้อสีดำ.png";
import Shirtblue from "@/src/public/เสื้อสีฟ้า.png";
import styles from "@/src/styles/login.module.css";

// รายการรูปภาพเสื้อ
const shirtImages = [
  {
    image: Shirtwhite,
    name: "WHITE",
    color: "#FFFFFF",
  },
  {
    image: Shirtblack,
    name: "BLACK",
    color: "#171717",
  },
  {
    image: Shirtblue,
    name: "CYAN",
    color: "#06B6D4",
  },
];

const MailIcon = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = ({
  className = "h-4 w-4",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // สถานะควบคุมสไลด์เสื้อ
  const [shirtIndex, setShirtIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  // เปลี่ยนเสื้ออัตโนมัติทุก 3 วินาที
  useEffect(() => {
    const interval = setInterval(() => {
      setShirtIndex((current) => current + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // เมื่อเลื่อนถึงรูปสุดท้ายที่เป็นรูปซ้ำ
  // ให้กลับไปเริ่มรูปแรกโดยไม่มี Animation
  const handleSlideEnd = () => {
    if (shirtIndex === shirtImages.length) {
      setEnableTransition(false);
      setShirtIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  };

  // ระบบเข้าสู่ระบบ
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("กำลังเข้าสู่ระบบ:", { email, password });
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsSubmitting(false);
    }
  };

  // คลาสกรอบ Input แบบกระจก
  const glassInputWrapperClass =
    "group relative flex h-[50px] w-full items-center rounded-full border border-white/85 bg-gradient-to-b from-white/60 to-white/25 px-4 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(15,23,42,0.08),0_10px_22px_-5px_rgba(15,23,42,0.15),0_4px_8px_-2px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-200 focus-within:-translate-y-[1px] focus-within:border-cyan-400 focus-within:from-white/80 focus-within:to-white/45 focus-within:shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_14px_28px_-6px_rgba(6,182,212,0.28)] focus-within:ring-2 focus-within:ring-cyan-400/35";

  const glassInputFieldClass =
    `${styles.input} peer h-full w-full bg-transparent pl-9 pr-3 text-[13px] font-medium text-gray-900 placeholder-transparent focus:outline-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-complete-button]:hidden`;

  const floatingLabelClass =
    "pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 cursor-text rounded-full px-2 text-[13px] font-medium text-gray-500 transition-all duration-200 ease-out peer-focus:left-4 peer-focus:top-0 peer-focus:bg-gradient-to-r peer-focus:from-cyan-500 peer-focus:to-teal-500 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-white peer-focus:shadow-[0_2px_8px_rgba(6,182,212,0.35)] peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-gray-800 peer-[:not(:placeholder-shown)]:shadow-sm";

  // ปุ่มเข้าสู่ระบบ
  const loginBtnClass =
    `${styles.loginBtn} h-[46px] w-full cursor-pointer rounded-full border-2 border-cyan-500 bg-gradient-to-b from-white/90 to-white/65 text-[13px] font-bold tracking-wide text-cyan-700 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),0_10px_20px_-6px_rgba(6,182,212,0.28)] backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-gradient-to-b hover:from-cyan-400 hover:via-cyan-500 hover:to-teal-600 hover:text-white hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_16px_28px_-5px_rgba(6,182,212,0.55)] active:translate-y-[1px] active:border-teal-600 active:bg-gradient-to-b active:from-cyan-500 active:to-teal-700 active:text-white active:shadow-[inset_0_2px_6px_rgba(15,118,110,0.45)] disabled:cursor-not-allowed disabled:opacity-65`;

  // ปุ่ม Google / Facebook
  const glassSocialBtnClass =
    `${styles.socialBtn} group flex h-[46px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/90 bg-gradient-to-b from-white/65 to-white/30 px-3 text-[13px] font-semibold text-gray-900 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(15,23,42,0.09),0_10px_22px_-5px_rgba(15,23,42,0.16),0_4px_8px_-2px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:from-white/85 hover:to-white/50 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_14px_26px_-5px_rgba(15,23,42,0.22)] active:translate-y-[1px] active:shadow-[inset_0_2px_5px_rgba(15,23,42,0.14),0_4px_10px_rgba(15,23,42,0.1)]`;

  return (
    <div
      className={`${styles.Container} flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-300 via-gray-200 to-cyan-200/80 p-4 md:p-6`}
    >
      {/* กรอบการ์ดหลัก */}
      <div
        className={`${styles.FormContainer} grid w-full max-w-[1040px] grid-cols-1 overflow-hidden rounded-3xl border border-white/80 bg-white/75 shadow-[0_28px_60px_-12px_rgba(15,23,42,0.28),0_12px_24px_-8px_rgba(15,23,42,0.14)] backdrop-blur-lg md:min-h-[620px] md:grid-cols-[1fr_1.15fr]`}
      >
        {/* ฝั่งรูปเสื้อ 3D (ซ้าย) */}
        <div
          className={`${styles.imageSide} relative flex min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-100 via-white to-cyan-100 md:rounded-l-3xl md:rounded-tr-none`}
        >
          {/* แสงตกแต่งด้านหลัง */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/50 blur-3xl" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-cyan-200/20" />

          {/* พื้นที่สไลด์เสื้อ */}
          <div className="relative z-10 h-[90%] min-h-[260px] w-[90%] overflow-hidden">
            <div
              onTransitionEnd={handleSlideEnd}
              className="flex h-full"
              style={{
                width: `${(shirtImages.length + 1) * 100}%`,
                transform: `translateX(-${
                  shirtIndex * (100 / (shirtImages.length + 1))
                }%)`,
                transition: enableTransition
                  ? "transform 750ms cubic-bezier(0.65, 0, 0.35, 1)"
                  : "none",
              }}
            >
              {[...shirtImages, shirtImages[0]].map((shirt, index) => (
                <div
                  key={index}
                  className="relative h-full shrink-0"
                  style={{
                    width: `${100 / (shirtImages.length + 1)}%`,
                  }}
                >
                  <Image
                    src={shirt.image}
                    alt={`เสื้อ 3D สี ${shirt.name}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-contain drop-shadow-[0_20px_25px_rgba(15,23,42,0.15)]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ชื่อสีเสื้อ */}
          <div className="relative z-20 -mt-1 flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full border border-gray-300 shadow-sm"
              style={{
                backgroundColor:
                  shirtImages[shirtIndex % shirtImages.length].color,
              }}
            />

            <span className="text-xs font-bold tracking-[3px] text-cyan-800">
              {shirtImages[shirtIndex % shirtImages.length].name}
            </span>
          </div>
        </div>

        {/* ฝั่งฟอร์ม (ขวา) */}
        <div
          className={`${styles.formSide} relative flex w-full items-center justify-center bg-gradient-to-br from-slate-100/90 via-white/75 to-cyan-100/70 px-6 py-10 md:px-12`}
        >
          {/* แสงตกแต่งด้านหลัง */}
          <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-cyan-300/45 blur-2xl" />

          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-sky-300/45 blur-2xl" />

          <div className={`${styles.formBox} relative z-10 w-full max-w-[390px]`}>
            {/* หัวข้อ */}
            <div className="mb-7 text-center">
              <h1 className="mb-2.5 -translate-y-2 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-[28px]">
                เข้าสู่ระบบ
              </h1>

              <p className="text-xs font-medium text-gray-600">
                เว็บไซต์ออกแบบเสื้อผ้าออนไลน์ Design Shirt
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              {/* ช่องอีเมล */}
              <div className={glassInputWrapperClass}>
                <MailIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className={glassInputFieldClass}
                />

                <label htmlFor="email" className={floatingLabelClass}>
                  อีเมล
                </label>
              </div>

              {/* ช่องรหัสผ่าน */}
              <div className={glassInputWrapperClass}>
                <LockIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />

                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className={glassInputFieldClass}
                />

                <label htmlFor="password" className={floatingLabelClass}>
                  รหัสผ่าน
                </label>
              </div>

              {/* ลืมรหัสผ่าน */}
              <div className="flex justify-end px-1">
                <Link
                  href="/forgot-password"
                  className="text-[11px] font-medium text-gray-600 transition-colors hover:text-cyan-700 hover:underline"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>

              {/* ปุ่มเข้าสู่ระบบ */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={loginBtnClass}
                >
                  {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </button>
              </div>

              {/* เส้นแบ่ง */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-300/80" />

                <span className="text-[11px] text-gray-500">
                  หรือใช้ช่องทางอื่นในการเข้าสู่ระบบ
                </span>

                <div className="h-px flex-1 bg-gray-300/80" />
              </div>

              {/* ปุ่ม Google และ Facebook */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={glassSocialBtnClass}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(15,23,42,0.14)] transition-transform group-hover:scale-105">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="h-4 w-4"
                      alt="Google"
                    />
                  </span>

                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className={glassSocialBtnClass}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(15,23,42,0.14)] transition-transform group-hover:scale-105">
                    <img
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      className="h-4 w-4 rounded-full"
                      alt="Facebook"
                    />
                  </span>

                  <span>Facebook</span>
                </button>
              </div>

              {/* สมัครสมาชิก */}
              <p className="pt-4 text-center text-[11px] text-gray-700">
                ยังไม่มีบัญชี?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-red-600 transition-colors hover:text-red-700 hover:underline"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
