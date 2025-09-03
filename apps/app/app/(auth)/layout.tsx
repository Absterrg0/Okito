import NavbarLayout from "@/components/ui/navbar-layout";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarLayout />
      {children}
    </>
  );
}
