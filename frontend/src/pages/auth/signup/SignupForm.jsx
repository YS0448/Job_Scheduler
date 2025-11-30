import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";

export default function SignupForm({ form, updateForm, onSubmit }) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {/* FULL NAME */}
      <div className="space-y-1">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Eg: Aarav Sharma"
          value={form.fullName || ""}
          onChange={(e) => updateForm("fullName", e.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Eg: name@gmail.com"
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
          autoComplete="email"
        />
      </div>

      {/* PASSWORD */}
      <PasswordInput
        id="password"
        label="Password"
        value={form.password}
        onChange={(e) => updateForm("password", e.target.value)}
      />

      {/* CONFIRM PASSWORD */}
      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => updateForm("confirmPassword", e.target.value)}
      />

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        className="w-full bg-brand-primary hover:bg-brand-secondary"
      >
        Sign Up
      </Button>
    </form>
  );
}

