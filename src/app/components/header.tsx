"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null)
    );

    return () => subscription.unsubscribe();
  }, []);


  return (
    <header
      style={{
        padding: "1.5rem 0",
        marginBottom: "2rem",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Link
            href="/"
            style={{
            fontSize: "1.75rem",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            textDecoration: "none",
            border: "none",
            }}
        >
            i ran today
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "1.1rem",
          }}
        >
          {user ? (
            <a onClick={() => supabase.auth.signOut()}>logout</a>
          ) : (
            <>
              <Link href="/sign-in">sign in</Link>
              <Link href="/create-account">create account</Link>
            </>
          )}
          <Link href="/submit">submit</Link>
        </nav>
      </div>
    </header>
  );
}

