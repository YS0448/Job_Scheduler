// pages/auth/Login/index.jsx
import LoginForm from "./LoginForm";
import { useLogin } from "./useLogin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Login() {
  const { form, updateForm, handleLogin } = useLogin();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted px-4">
      
      <Button variant="link" className="absolute left-4 top-4" asChild>
        <Link to="/" className="cursor-pointer border-transparent"> Back to Home </Link>
      </Button>      

      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Welcome back! Please enter your credentials to access your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm
            form={form}
            updateForm={updateForm}
            handleLogin={handleLogin}
          />

          <p className="text-sm text-center mt-4 text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/signup" className="underline hover:text-primary">
              Sign Up
            </a>
          </p>
        </CardContent>

      </Card>
    </div>
  );
}
