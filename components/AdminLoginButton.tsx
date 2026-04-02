"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginButton() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/admin/login");
  };

  return (
    <div className="flex justify-center pb-8 pt-3">
      <button
        onClick={handleClick}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full opacity-15 transition-all duration-500 hover:opacity-70 hover:shadow-[0_0_24px_rgba(46,125,255,0.2)] active:scale-95"
        title="Admin Portal"
        aria-label="Admin Portal Login"
      >
        <Image
          src="/images/logo.png"
          alt=""
          width={30}
          height={30}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </button>
    </div>
  );
}
