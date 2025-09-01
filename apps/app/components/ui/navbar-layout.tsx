'use client'
import Image from "next/image";
import { ModeToggle } from "./theme-toggle";
import CustomWallet from "./custom-wallet";

export default function NavbarLayout() {
  return (
    <header className="absolute top-6 left-6 right-18 flex justify-between items-center z-20">
      <div className="flex items-center space-x-3">
        <div className="px-6 rounded-xl flex items-center justify-center relative">
          <Image
            src="/Okito-light.png"
            alt="Okito logo"
            width={100}
            height={64}
            className="dark:hidden"
          />
          <Image
            src="/Okito-dark.png"
            alt="Okito logo"
            width={100}
            height={64}
            className="hidden dark:block"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <CustomWallet />
        <ModeToggle />
      </div>
    </header>
  )
}