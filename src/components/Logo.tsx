import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="rounded-full p-5 border aspect-square flex items-center justify-center">
        Logo
      </div>
    </Link>
  );
}
