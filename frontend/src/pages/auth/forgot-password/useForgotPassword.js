import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";

export const useForgotPassword= ()=> {
  const navigator = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      showLoader();
      await apiCall("POST", "/auth/send-otp", { email });
      showToast("success", "OTP sent successfully!");
      setStep("otp");
    } catch (err) {
      console.log(err);
      showToast("error", err.message || "Failed to send OTP");
    } finally {
      hideLoader();
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      showLoader();
      await apiCall("POST", "/auth/verify-otp", { email, otp });
      showToast("success", "OTP verified successfully!");
      setStep("reset");
    } catch (err) {
      console.log(err);
      showToast("error", err.message || "OTP verification failed");
    } finally {
      hideLoader();
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) return showToast("error", "Password and confirm password required");
    if (password !== confirmPassword) return showToast("error", "Passwords do not match");

    try {
      showLoader();
      console.log('email111:', email);
      console.log('password1111:', password);
      await apiCall("POST", "/auth/reset-password", { email, newPassword: password });
      showToast("success", "Password reset successfully!");
      navigator("/login", { replace: true });
    } catch (err) {
      console.log(err);
      showToast("error", err.message || "Password reset failed");
    } finally {
      hideLoader();
    }
  };

  return {
    step,
    setStep,
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
  };
}
