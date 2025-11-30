// pages/auth/Login/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "@/services/apiCall";
import { useLoader } from "@/context/LoaderContext";
import { showToast } from "@/components/common/AlertService";
import { validateLoginForm } from "@/lib/validation/login";
import { useAuth } from "@/context/AuthContext";

export function useLogin() {
  const navigator = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const { setUser, role } = useAuth();

  const initialForm = { email: "", password: "" };
  const [form, setForm] = useState(initialForm);

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // validation
    const errors = validateLoginForm(form);
    if (Object.keys(errors).length > 0) {
      showToast("error", Object.values(errors)[0]);
      return;
    }

    try {
      showLoader();

      const response = await apiCall("POST", "/auth/login", form);
      const user= response.data.user;
      showToast("success", "Logged in successfully!");

      // storing
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      // reset
      setForm(initialForm);
      // redirect to home
        if(user.role === "customer"){
            navigator("/dashboard/customer");
        }
    
    } catch (err) {
      console.log("login error:", err);
      showToast("error", err.message || "Failed to login");
    } finally {
      hideLoader();
    }
  };

  return {
    form,
    updateForm,
    handleLogin
  };
}
