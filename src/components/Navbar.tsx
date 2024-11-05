"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-10 py-3 flex justify-between items-center">
        <Logo />
        <div>
          {session ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <Link href="/auth">
              {" "}
              <button>Sign in</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
