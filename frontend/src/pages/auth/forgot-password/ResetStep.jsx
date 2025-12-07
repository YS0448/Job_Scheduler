"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";

export default function ResetStep({ password, setPassword, confirmPassword, setConfirmPassword, onResetPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="space-y-4" onSubmit={onResetPassword}>

      {/* New Password */}
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <InputGroup>
          <InputGroupInput
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="•••••••"            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <button type="button" className="p-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <InputGroup>
          <InputGroupInput
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            placeholder="•••••••"            
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <button type="button" className="p-2" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Button type="submit" className="w-full">
        Reset Password
      </Button>
    </form>
  );
}
