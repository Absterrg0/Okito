'use client'
import { redirect, useRouter } from "next/navigation";
export default function Home() {
  redirect('/signin')
  return <div></div>;
}
