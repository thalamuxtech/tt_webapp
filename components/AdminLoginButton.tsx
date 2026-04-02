"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdminLoginButton() {
  return (
    <div className="flex justify-center pb-6 pt-2">
      <Link
        href="/admin"
        className="group relative flex h-10 w-10 items-center justify-center rounded-full opacity-20 transition-all duration-500 hover:opacity-80 hover:shadow-[0_0_20px_rgba(46,125,255,0.2)]"
        title="Admin Portal"
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={28}
          height={28}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </Link>
    </div>
  );
}
