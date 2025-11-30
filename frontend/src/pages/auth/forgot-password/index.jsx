import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import ResetStep from "./ResetStep";
import { useForgotPassword } from "./useForgotPassword";

export default function ForgotPassword() {
  const {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    sendOtp,
    verifyOtp,
    resetPassword,
  } = useForgotPassword();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Enter OTP"}
            {step === "reset" && "Reset Password"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {step === "email" && "Enter your email address and we’ll send you an OTP."}
            {step === "otp" && `We sent an OTP to ${email}. Enter it below.`}
            {step === "reset" && "Enter your new password to reset your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === "email" && <EmailStep email={email} setEmail={setEmail} onSendOtp={sendOtp} />}
          {step === "otp" && <OtpStep otp={otp} setOtp={setOtp} onVerifyOtp={verifyOtp} onResendOtp={sendOtp} email={email} />}
          {step === "reset" && <ResetStep password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} onResetPassword={resetPassword} />}
        </CardContent>
      </Card>
    </div>
  );
}
