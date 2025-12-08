import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {apiCall} from "@/services/apiCall";
import { Button } from "@/components/ui/button";
// components
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import {useSignup} from "./useSignup";

export default function Signup() {
  
  const {
    step,
    form,
    updateForm,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp    
  }=useSignup()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-muted">

      <Button variant="link" className="absolute left-4 top-4" asChild>
        <Link to="/" className="cursor-pointer border-transparent"> Back to Home </Link>
      </Button>
      
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {step === "signup" ? "Sign Up" : "Verify OTP"}
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            {step === "signup"
              ? "Create your account to get started."
              : ""
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "signup" ? (
            <SignupForm
              form={form}
              updateForm={updateForm}
              onSubmit={handleSendOtp}
            />
          ) : (
            <OtpForm
              otp={form.otp}
              setOtp={(v) => updateForm("otp", v)}
              onSubmit={handleVerifyOtp}
              email={form.email}
              onResend={handleResendOtp}  
            />
          )}

          {step === "signup" && (
            <p className="text-sm text-center mt-4 text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline hover:text-primary">
                Login
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
