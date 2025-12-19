import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import QuoteRotator from "./components/QuoteRotator";
export const metadata: Metadata = {
  title: "AI Research Dashboard",
  description: "A dashboard for AI research projects"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-700 rounded-2xl p-6 flex-1 flex flex-col">
        
        {/* Sidebar (client component) */}
        <Sidebar />
        <QuoteRotator />
        {/* Main Content */}
        <main className="ml-70 p-6">{children}</main>
      </body>
    </html>
  );
}
