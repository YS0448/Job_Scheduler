import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
import { trimArrayValues } from "@/lib/trimArrayValues";
import { tr } from "date-fns/locale";
export const useForgotPassword = () => {
  const navigator = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");

  const sendOtp = async (e) => {
    e.preventDefault();
    // validation
    if (!email) return showToast("error", "Email is required");
    
    try {
      showLoader();
      const [trimmedEmail] = trimArrayValues([email]); 
      setEmail(trimmedEmail); 
      let payload = { email: trimmedEmail.toLowerCase() };
      await apiCall("POST", "/auth/send-otp", payload);
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
    // validation
    if (!email) return showToast("error", "Email is required");
    if(!otp) return showToast("error", "OTP is required");
    
    try {
      showLoader();      
      const [trimmedEmail, trimmedOtp] = trimArrayValues([email, otp]);
      setEmail(trimmedEmail);
      setOtp(trimmedOtp);
      
      let payload = {
        email: trimmedEmail?.toLowerCase() || "",
        otp: trimmedOtp,
      };
      const res = await apiCall("POST", "/auth/verify-otp", payload);
      showToast("success", "OTP verified successfully!");
      setResetToken(res.data?.resetToken);
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
      let payload = {
        email: email?.toLowerCase() || "",
        newPassword: password,
        resetToken,
      }
      const res= await apiCall("POST", "/auth/reset-password", payload);
      showToast("success", res.data.message || "Password reset successfully!");
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
};
