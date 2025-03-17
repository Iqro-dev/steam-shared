import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steam Shared",
  description: "Check what games you share with your friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
