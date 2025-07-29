'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function FrameworkSwitcher() {
  return (
    <div className="flex justify-center  gap-6 py-4">
      {/* Next.js Link Card */}
      <Link
        href="/setup/nextjs"
        className="flex flex-col items-center justify-center gap-4 w-full h-[160px] p-8 bg-[#1C1C1C] text-[#A0A0A0] rounded-xl border border-[#333] text-center no-underline transition-colors duration-200 hover:bg-[#252525] hover:border-[#555]"
      >
        <Image
          src="/Next.svg"
          alt="Next.js Logo"
          width={48}
          height={48}
          className="object-contain"
        />
        <span>Next.js</span>
      </Link>

      {/* Vite Link Card */}
      <Link
        href="/docs/vite-setup"
        className="flex flex-col items-center justify-center gap-4 w-full h-[160px] p-8 bg-[#1C1C1C] text-[#A0A0A0] rounded-xl border border-[#333] text-center no-underline transition-colors duration-200 hover:bg-[#252525] hover:border-[#555]"
      >
        <Image
          src="/Vite.svg"
          alt="Vite Logo"
          width={48}
          height={48}
          className="object-contain greyscale"
        />
        <span>Vite</span>
      </Link>
    </div>
  );
}
