import NavbarLayout from "@/components/ui/navbar-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      >
              <NavbarLayout></NavbarLayout>
        {children}
      </body>
    </html>
  );
}
