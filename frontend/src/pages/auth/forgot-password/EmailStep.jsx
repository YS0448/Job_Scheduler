import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export default function EmailStep({ email, setEmail, onSendOtp }) {
  return (
    <form className="space-y-4" onSubmit={onSendOtp}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Eg: name@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </div>
      <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-secondary">
        Send OTP
      </Button>
      <p className="text-sm text-center mt-2 text-muted-foreground">
        Remembered your password?{" "}
        <Link to="/login" className="underline hover:text-primary">
          Login
        </Link>
      </p>
    </form>
  );
}
