import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function OtpStep({ otp, setOtp, onVerifyOtp, onResendOtp, email }) {
  return (
    <form className="space-y-4" onSubmit={onVerifyOtp}>
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={setOtp}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      >
        <InputOTPGroup className="flex justify-center w-full gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <InputOTPSlot key={i} index={i} className="border border-gray-400 rounded-md" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary">
        Verify OTP
      </Button>

      <p className="text-sm text-center mt-2 text-muted-foreground">
        Didn't receive OTP?{" "}
        <Button variant="link" size="sm" onClick={onResendOtp}>
          Resend OTP
        </Button>
      </p>

      <p className="text-sm text-center mt-1 text-muted-foreground">
        OTP sent to: {email}
      </p>
    </form>
  );
}
