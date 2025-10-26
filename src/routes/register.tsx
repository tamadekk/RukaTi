import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthCard from "@/components/auth-card";
import RegistrationForm from "@/components/registration-form";
import supabase from "@/supabase-client";
import { useState } from "react";

const registerText = {
  heading: "Create Account",
  sub: "Join the community",
  alt: "Already have an account?",
  altHref: "/login",
  altText: "Login",
};

const RegisterRouteComponent: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async ({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: "http://localhost:5173/" },
      });
      if (error) {
        setError(error.message);
        return;
      }
      if (data.user) navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthCard {...registerText}>
      <RegistrationForm onSubmit={handleRegister} error={error} />
    </AuthCard>
  );
};

export const Route = createFileRoute("/register")({
  component: RegisterRouteComponent,
});
