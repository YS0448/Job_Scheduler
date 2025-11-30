import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
import { validateSignupForm } from "@/lib/validation/signup";

export const useSignup = () => {
  // two steps: signup → otp
  const [step, setStep] = useState("signup");
  // initial form
  const initialForm = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };

  const [form, setForm] = useState(initialForm);

  const { showLoader, hideLoader } = useLoader();
  const navigator = useNavigate();

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    // validation
    const errors = validateSignupForm(form);

    if (Object.keys(errors).length > 0) {
      showToast("error", Object.values(errors)[0]);
      return;
    }

    try {
      showLoader();
      await apiCall("POST", "/auth/send-otp", { email: form.email });
      setStep("otp");
    } catch (err) {
      showToast("error", "Failed to send OTP");
    } finally {
      hideLoader();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      showLoader();

      // Step 1: Verify OTP
      await apiCall("POST", "/auth/verify-otp", {
        email: form.email,
        otp: form.otp,
      });

      // Step 2: Create user (only if OTP verified)
      await apiCall("POST", "/auth/signup", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      showToast("success", "Account created successfully!");

      // Reset form
      setForm(initialForm);
      setStep("signup");
      // Redirect to login
      navigator("/login");
    
    } catch (err) {
      console.error(err);
      showToast("error", err?.response?.data?.message || "Invalid OTP");
    } finally {
      hideLoader();
    }
  };

  const handleResendOtp = async () => {
    try {
      showLoader();
      await apiCall("POST", "/auth/send-otp", { email: form.email });
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      hideLoader();
    }
  };

  return {
    step,
    setStep,
    form,
    setForm,
    updateForm,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
  };
};
