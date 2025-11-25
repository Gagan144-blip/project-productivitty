import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "AI Research Dashboard",
  description: "A dashboard for AI research projects"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white-950 text-white">
        
        {/* Sidebar (client component) */}
        <Sidebar />

        {/* Main Content */}
        <main className="ml-60 p-6">{children}</main>
      </body>
    </html>
  );
}
