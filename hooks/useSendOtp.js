// src/hooks/useSendOtp.js
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "@/services/auth";

export function useSendOtp() {
  return useMutation({
    mutationFn: (mobile) => sendOtp(mobile),
  });
}