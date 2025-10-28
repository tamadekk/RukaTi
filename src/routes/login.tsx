import { createFileRoute, useNavigate } from "@tanstack/react-router";
import AuthCard from "@/components/auth-card";
import LoginForm from "@/components/login-form";
import supabase from "@/supabase-client";
import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";

const loginText = {
  heading: "Welcome Back",
  sub: "Sign in to continue",
  alt: "Don't have an account?",
  altHref: "/register",
  altText: "Sign up",
};

const LoginRouteComponent: React.FC = () => {
  const { setUser, setTokens } = useUserSession();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
        return;
      }
      if (data.user && data.session) {
        setUser(data.user);
        setTokens(data.session.access_token, data.session.refresh_token);

        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthCard {...loginText}>
      <LoginForm onSubmit={handleLogin} error={error} />
    </AuthCard>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginRouteComponent,
});
