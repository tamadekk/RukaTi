import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import AuthCard from "@/components/auth-card";
import RegistrationForm from "@/components/registration-form";
import { useState } from "react";
import { useUserSession } from "@/store/userSessionsStore";
import { signUp } from "@/lib/authentication";

const registerText = {
  heading: "Create Account",
  sub: "Join the community",
  alt: "Already have an account?",
  altHref: "/login",
  altText: "Login",
};

const RegisterRouteComponent: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setTokens } = useUserSession();
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
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password can only contain letters, digits, and symbols (no spaces)",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data, error } = await signUp(email, password);
      if (error) {
        setError(error.message);
        return;
      }
      if (data.user && data.session) {
        setUser(data.user);
        setTokens(data.session.access_token, data.session.refresh_token);
        navigate({ to: "/" });
      }
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
  beforeLoad: () => {
    const { user } = useUserSession.getState();
    if (user?.id) {
      throw redirect({ to: "/dashboard" });
    }
  },
});
