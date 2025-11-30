// pages/auth/Login/LoginForm.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PasswordInput from "./PasswordInput";
export default function LoginForm({ form, updateForm, handleLogin }) {
  return (
    <form className="space-y-4" onSubmit={handleLogin}>

      {/* Email */}      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Eg: name@email.com"
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <PasswordInput
          id="password"
          label="Password"
          value={form.password}
          onChange={(e) => updateForm("password", e.target.value)}
        />          
      </div>      

      {/* Forgot Password */}
      <div className="text-right text-sm">
        <Link to="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Login button */}
      <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary">
        Login
      </Button>
    </form>
  );
}
