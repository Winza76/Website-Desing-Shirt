"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Shirtwhite from "@/src/public/เสื้อสีขาว.webp";
import Shirtblack from "@/src/public/เสื้อสีดำ.png";
import Shirtblue from "@/src/public/เสื้อสีฟ้า.png";
import styles from "@/src/styles/register.module.css";

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

const UserIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
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

const PhoneIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LockIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
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

const EyeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
    <path d="m2 2 20 20" />
  </svg>
);

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // สถานะควบคุมสไลด์เสื้อ
  const [shirtIndex, setShirtIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShirtIndex((current) => current + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      console.log("กำลังสมัครสมาชิก:", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsSubmitting(false);
    }
  };

  // คลาสกรอบ Input แบบกระจก (เหมือนหน้า Login)
  const glassInputWrapperClass =
    "group relative flex h-[48px] w-full items-center rounded-full border border-white/85 bg-gradient-to-b from-white/60 to-white/25 px-4 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(15,23,42,0.08),0_10px_22px_-5px_rgba(15,23,42,0.15),0_4px_8px_-2px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-200 focus-within:-translate-y-[1px] focus-within:border-cyan-400 focus-within:from-white/80 focus-within:to-white/45 focus-within:shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_14px_28px_-6px_rgba(6,182,212,0.28)] focus-within:ring-2 focus-within:ring-cyan-400/35";

  const glassInputFieldClass = `${styles.input} peer h-full w-full bg-transparent pl-9 pr-3 text-[13px] font-medium text-gray-900 placeholder-transparent focus:outline-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-complete-button]:hidden`;

  const passwordInputFieldClass = `${styles.input} peer h-full w-full bg-transparent pl-9 pr-10 text-[13px] font-medium text-gray-900 placeholder-transparent focus:outline-none [&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-complete-button]:hidden`;

  const floatingLabelClass =
    "pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 cursor-text rounded-full px-2 text-[13px] font-medium text-gray-500 transition-all duration-200 ease-out peer-focus:left-4 peer-focus:top-0 peer-focus:bg-gradient-to-r peer-focus:from-cyan-500 peer-focus:to-teal-500 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-white peer-focus:shadow-[0_2px_8px_rgba(6,182,212,0.35)] peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-gray-800 peer-[:not(:placeholder-shown)]:shadow-sm";

  // ปุ่มยืนยัน / สมัครสมาชิก
  const submitBtnClass = `${styles.SubmitButton} h-[46px] w-full cursor-pointer rounded-full border-2 border-cyan-500 bg-gradient-to-b from-white/90 to-white/65 text-[13px] font-bold tracking-wide text-cyan-700 shadow-[inset_0_2px_3px_rgba(255,255,255,0.95),0_10px_20px_-6px_rgba(6,182,212,0.28)] backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:border-cyan-400 hover:bg-gradient-to-b hover:from-cyan-400 hover:via-cyan-500 hover:to-teal-600 hover:text-white hover:shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_16px_28px_-5px_rgba(6,182,212,0.55)] active:translate-y-[1px] active:border-teal-600 active:bg-gradient-to-b active:from-cyan-500 active:to-teal-700 active:text-white active:shadow-[inset_0_2px_6px_rgba(15,118,110,0.45)] disabled:cursor-not-allowed disabled:opacity-65`;

  return (
    <div
      className={`${styles.Container} flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-300 via-gray-200 to-cyan-200/80 p-4 md:p-6`}
    >
      {/* กรอบการ์ดหลัก */}
      <div
        className={`${styles.FormContainer} grid w-full max-w-[1080px] grid-cols-1 overflow-hidden rounded-3xl border border-white/80 bg-white/75 shadow-[0_28px_60px_-12px_rgba(15,23,42,0.28),0_12px_24px_-8px_rgba(15,23,42,0.14)] backdrop-blur-lg md:min-h-[640px] md:grid-cols-[1.15fr_1fr]`}
      >
        {/* ฝั่งฟอร์ม (ซ้ายบน desktop) */}
        <div
          className={`${styles.FormLeft} relative flex w-full items-center justify-center bg-gradient-to-br from-slate-100/90 via-white/75 to-cyan-100/70 px-6 py-9 md:px-11`}
        >
          {/* แสงตกแต่งด้านหลัง */}
          <div className="pointer-events-none absolute -top-10 -left-10 h-48 w-48 rounded-full bg-cyan-300/45 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-sky-300/45 blur-2xl" />

          <div className={`${styles.FormContent} relative z-10 w-full max-w-[430px]`}>
            {/* หัวข้อ */}
            <div className="mb-6 text-center">
              <h1 className="mb-2 bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-[28px]">
                สร้างบัญชีของคุณ
              </h1>
              <p className="text-xs font-medium text-gray-600">
                เริ่มต้นออกแบบเสื้อผ้าในแบบของคุณกับ Design Shirt
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* ชื่อ และ นามสกุล */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className={`${styles.FirstName} ${glassInputWrapperClass}`}>
                  <UserIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />
                  <input
                    id="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                    className={glassInputFieldClass}
                  />
                  <label htmlFor="firstName" className={floatingLabelClass}>
                    ชื่อ
                  </label>
                </div>

                <div className={`${styles.LastName} ${glassInputWrapperClass}`}>
                  <UserIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />
                  <input
                    id="lastName"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                    className={glassInputFieldClass}
                  />
                  <label htmlFor="lastName" className={floatingLabelClass}>
                    นามสกุล
                  </label>
                </div>
              </div>

              {/* อีเมล */}
              <div className={`${styles.Email} ${glassInputWrapperClass}`}>
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

              {/* เบอร์โทรศัพท์ */}
              <div className={`${styles.PhoneNumber} ${glassInputWrapperClass}`}>
                <PhoneIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />
                <input
                  id="phoneNumber"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder=" "
                  className={glassInputFieldClass}
                />
                <label htmlFor="phoneNumber" className={floatingLabelClass}>
                  เบอร์โทรศัพท์
                </label>
              </div>

              {/* รหัสผ่าน */}
              <div className={`${styles.Password} ${glassInputWrapperClass}`}>
                <LockIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder=" "
                  className={passwordInputFieldClass}
                />
                <label htmlFor="password" className={floatingLabelClass}>
                  รหัสผ่าน
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                  className="ml-1 shrink-0 cursor-pointer text-gray-500 transition-colors hover:text-cyan-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* ยืนยันรหัสผ่าน */}
              <div className={`${styles.ConfirmPassword} ${glassInputWrapperClass}`}>
                <LockIcon className="h-4 w-4 shrink-0 text-gray-500 transition-colors duration-200 group-focus-within:text-cyan-600" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder=" "
                  className={passwordInputFieldClass}
                />
                <label htmlFor="confirmPassword" className={floatingLabelClass}>
                  ยืนยันรหัสผ่าน
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword
                      ? "ซ่อนยืนยันรหัสผ่าน"
                      : "แสดงยืนยันรหัสผ่าน"
                  }
                  className="ml-1 shrink-0 cursor-pointer text-gray-500 transition-colors hover:text-cyan-600 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* ข้อความแจ้งเตือนกรณีรหัสผ่านไม่ตรงกัน */}
              {errorMessage && (
                <p className="text-center text-xs font-medium text-rose-600">
                  {errorMessage}
                </p>
              )}

              {/* ปุ่มยืนยัน */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={submitBtnClass}
                >
                  {isSubmitting ? "กำลังสร้างบัญชี..." : "ยืนยัน"}
                </button>
              </div>

              {/* ลิงก์กลับไปหน้าเข้าสู่ระบบ */}
              <p className="pt-2 text-center text-[11px] text-gray-700">
                มีบัญชีอยู่แล้ว?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-cyan-700 transition-colors hover:text-cyan-800 hover:underline"
                >
                  เข้าสู่ระบบ
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* ฝั่งรูปเสื้อ 3D (ขวาบน desktop) */}
        <div
          className={`${styles.FormRight} relative flex min-h-[270px] w-full flex-col items-center justify-center overflow-hidden rounded-b-3xl bg-gradient-to-br from-slate-100 via-white to-cyan-100 md:rounded-r-3xl md:rounded-bl-none`}
        >
          {/* แสงตกแต่งด้านหลัง */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/50 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-cyan-200/20" />

          {/* พื้นที่สไลด์เสื้อ */}
          <div
            className={`${styles.ImageContainer} relative z-10 h-[88%] min-h-[250px] w-[88%] overflow-hidden`}
          >
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
                  className={`${styles.Image} relative h-full shrink-0`}
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
      </div>
    </div>
  );
};

export default RegisterPage;