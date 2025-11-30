"use client";

import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function OtpForm({ otp, setOtp, onSubmit, email, onResend }) {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      {/* OTP Input */}
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-gray-600">Enter the 6-digit code sent to</p>
        <p className="text-sm font-medium text-gray-800">{email}</p>

        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="flex justify-center w-full gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="border border-gray-400 rounded-md w-12 h-12 flex items-center justify-center text-lg"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Verify Button */}
      <Button
        type="submit"
        className="w-full bg-brand-primary hover:bg-brand-secondary"
      >
        Verify OTP
      </Button>

      {/* Resend OTP */}
      <div className="text-center">
        <button
          type="button"
          onClick={onResend}
          className="text-sm text-blue-600 hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </form>
  );
}
