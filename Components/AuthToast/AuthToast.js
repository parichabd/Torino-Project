import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSendOtp } from "@/hooks/useSendOtp";
import styles from "./AuthToast.module.css";
import Link from "next/link";

export default function AuthToast({ onClose }) {
  const [step, setStep] = useState("PHONE");

  const { register, handleSubmit } = useForm();
  const sendOtpMutation = useSendOtp();

  const submitPhone = (data) => {
    sendOtpMutation.mutate(data.mobile, {
      onSuccess: () => {
        setStep("OTP");
      },
    });
  };

  return (
    <div className={styles.toast_overlay}>
      <div className={styles.toast_box}>
        <button className={styles.close_btn} onClick={onClose}>
          ✕
        </button>

        {/* مرحله وارد کردن شماره */}
        {step === "PHONE" && (
          <>
            <h2 className={styles.title}>ورود به تورینو</h2>

            <form className={styles.form} onSubmit={handleSubmit(submitPhone)}>
              <div className={styles.field}>
                <label>شماره موبایل خود را وارد کنید</label>
                <input
                  type="tel"
                  placeholder="۰۹۱۲***۶۶۰۶"
                  {...register("mobile", { required: true })}
                />
              </div>
              <p>
                <Link href={"/"}>ثبت نام!</Link>
              </p>
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

        {/* مرحله OTP */}
        {step === "OTP" && (
          <>
            <h2 className={styles.title}>کد تایید</h2>

            <div className={styles.otp}>
              <input maxLength={1} />
              <input maxLength={1} />
              <input maxLength={1} />
              <input maxLength={1} />
            </div>

            <button className={styles.submit}>تایید</button>
          </>
        )}
      </div>
    </div>
  );
}
