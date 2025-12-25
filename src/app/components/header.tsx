import Link from "next/link";

export default function Header() {
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
          <Link href="/sign-in">sign in</Link>
          <Link href="/create-account">create account</Link>
          <Link href="/submit">submit</Link>
        </nav>
      </div>
    </header>
  );
}

