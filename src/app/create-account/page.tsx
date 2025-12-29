"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div>
        <h1>check your email</h1>
        <p>
          we sent a confirmation link to {email}. click it to finish creating
          your account.
        </p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/sign-in">back to sign in</Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>create account</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          maxWidth: "320px",
        }}
      >
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="username">username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="super_cool_username"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="mt-4" type="submit" disabled={loading}>
          {loading ? "creating..." : "create account"}
        </button>
      </form>

      <p className="mt-4">
        already have an account? <Link href="/sign-in">sign in</Link>
      </p>
    </div>
  );
}
