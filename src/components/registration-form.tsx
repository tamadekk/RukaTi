import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type RegistrationFormProps = {
  onSubmit?: (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void | Promise<void>;
  error?: string | null;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, confirmPassword });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="text-sm font-medium">Email</label>
        <Input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Password</label>
        <Input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          name="confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <Button type="submit" className="w-full" variant="default">
        Sign Up
      </Button>
    </form>
  );
};

export default RegistrationForm;
