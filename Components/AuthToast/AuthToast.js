import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/hooks/useSendOtp";
import styles from "./AuthToast.module.css";

export default function AuthToast({ onClose }) {
  const [step, setStep] = useState("PHONE");
  const [mobile, setMobile] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  const { register, handleSubmit } = useForm();
  const sendOtpMutation = useSendOtp();

  // ⏱ تایمر
  useEffect(() => {
    if (step !== "OTP" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const submitPhone = (data) => {
    setMobile(data.mobile);

    sendOtpMutation.mutate(data.mobile, {
      onSuccess: () => {
        setStep("OTP");
        setTimeLeft(120);
      },
    });
  };

  const resendHandler = () => {
    sendOtpMutation.mutate(mobile);
    setTimeLeft(120);
  };

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.toast_overlay}>
      <div className={styles.toast_box}>
        <button className={styles.close_btn} onClick={onClose}>
          ✕
        </button>

        {/* ===== مرحله شماره موبایل ===== */}
        {step === "PHONE" && (
          <>
            <h2 className={styles.title}>ورود به تورینو</h2>

            <form
              className={styles.form}
              onSubmit={handleSubmit(submitPhone)}
            >
              <div className={styles.field}>
                <label>شماره موبایل خود را وارد کنید</label>
                <input
                  type="tel"
                  placeholder="۰۹۱۲***۶۶۰۶"
                  {...register("mobile", { required: true })}
                />
              </div>

              <button
                className={styles.submit}
                disabled={sendOtpMutation.isPending}
              >
                {sendOtpMutation.isPending
                  ? "در حال ارسال..."
                  : "ارسال کد تایید"}
              </button>
            </form>
          </>
        )}

        {/* ===== مرحله OTP ===== */}
        {step === "OTP" && (
          <>
            <h2 className={styles.title}>کد تایید</h2>

            <p className={styles.mobileHint}>
              کد به شماره <span>{mobile}</span> ارسال شد
            </p>

            <div className={styles.otp}>
              <input maxLength={1} />
              <input maxLength={1} />
              <input maxLength={1} />
              <input maxLength={1} />
              <input maxLength={1} />
            </div>

            <button className={styles.submit}>تایید</button>

            {timeLeft > 0 ? (
              <p className={styles.timer}>
                ارسال مجدد تا {formatTime(timeLeft)}
              </p>
            ) : (
              <button
                className={styles.resend}
                onClick={resendHandler}
              >
                ارسال مجدد کد
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}