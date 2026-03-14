import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Taskmanager",
  description: "Dockerized task manager app"
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}