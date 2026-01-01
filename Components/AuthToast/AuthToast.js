import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/hooks/useSendOtp";
import styles from "./AuthToast.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function AuthToast({ onClose }) {
  const [step, setStep] = useState("PHONE");
  const [mobile, setMobile] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRegister, setIsRegister] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [shake, setShake] = useState(false);

  const otpRefs = useRef([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOtpMutation = useSendOtp();

  /* ⏱ تایمر */
  useEffect(() => {
    if (step !== "OTP" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  /* ارسال شماره */
  const submitPhone = (data) => {
    setMobile(data.mobile);

    sendOtpMutation.mutate(data.mobile, {
      onSuccess: () => {
        setStep("OTP");
        setTimeLeft(120);
      },
    });
  };

  /* ارسال مجدد */
  const resendHandler = () => {
    sendOtpMutation.mutate(mobile);
    setTimeLeft(120);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  /* ===== OTP ===== */

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 4) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const submitOtp = () => {
    if (otp.some((d) => d === "")) {
      setOtpError("کد تایید را کامل وارد کنید");
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const code = otp.join("");
    console.log("OTP:", code);

    // 🔗 اینجا بعداً verifyOtp API
  };

  return (
    <div className={styles.toast_overlay}>
      <div className={styles.toast_box}>
        {/* دکمه بالا */}
        {step === "PHONE" ? (
          <button className={styles.close_btn} onClick={onClose}>
            ✕
          </button>
        ) : (
          <button
            className={styles.back_btn}
            onClick={() => {
              setStep("PHONE");
              setOtp(["", "", "", "", ""]);
              setOtpError("");
              setTimeLeft(120);
            }}
          >
            <FaArrowLeftLong />
          </button>
        )}

        {/* ===== PHONE ===== */}
        {step === "PHONE" && (
          <>
            <h2 className={styles.title}>
              {isRegister ? "ثبت نام" : "ورود به تورینو"}
            </h2>

            {!isRegister ? (
              /* ===== فرم ورود (همون قبلی، دست نخورده) ===== */
              <form
                className={styles.form}
                onSubmit={handleSubmit(submitPhone)}
              >
                <div className={styles.field}>
                  <label>شماره موبایل خود را وارد کنید</label>

                  <input
                    type="tel"
                    placeholder="۰۹۱۲***۶۶۰۶"
                    className={errors.mobile ? styles.inputError : ""}
                    {...register("mobile", {
                      required: "شماره موبایل الزامی است",
                    })}
                  />

                  <span className={styles.error}>{errors.mobile?.message}</span>
                </div>

                <p className={styles.loginPage}>
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className={styles.loginPage}
                  >
                    ثبت نام!
                  </button>
                </p>

                <button className={styles.submit}>ارسال کد تایید</button>
              </form>
            ) : (
              /* ===== فرم ثبت‌نام (خیلی ساده) ===== */
              <form
                className={styles.form}
                onSubmit={handleSubmit(submitPhone)}
              >
                <input
                  placeholder="نام"
                  {...register("name", {
                    required: "نام الزامی است",
                  })}
                />
                <span className={styles.error}>{errors.name?.message}</span>

                <input
                  placeholder="شماره موبایل"
                  {...register("mobile", {
                    required: "شماره موبایل الزامی است",
                  })}
                />
                <span className={styles.error}>{errors.mobile?.message}</span>

                <button className={styles.submit}>ثبت‌نام و ارسال کد</button>
              </form>
            )}
          </>
        )}

        {/* ===== OTP ===== */}
        {step === "OTP" && (
          <>
            <h2 className={styles.title}>کد تایید را وارد کنید</h2>

            <p className={styles.mobileHint}>
              کد به شماره <span>{mobile}</span> ارسال شد
            </p>

            <div
              className={`${styles.otp} ${otpError ? styles.otpError : ""} ${
                shake ? styles.shake : ""
              }`}
              dir="ltr"
            >
              {otp.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  value={value}
                  maxLength={1}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>

            <div className={styles.errorBox}>{otpError}</div>

            {timeLeft > 0 ? (
              <p className={styles.timer}>
                {formatTime(timeLeft)} تا ارسال مجدد کد
              </p>
            ) : (
              <button className={styles.resend} onClick={resendHandler}>
                ارسال مجدد کد
              </button>
            )}

            <button className={styles.submit} onClick={submitOtp}>
              ورود به تورینو
            </button>
          </>
        )}
      </div>
    </div>
  );
}
