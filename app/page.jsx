import React from "react";
import { Navbar } from "@/components/Navbar"; // your Navbar.jsx
import Header from "@/components/header";
import EmbedTester from "@/components/embed-tester";
import StatusCards from "@/components/status-cards";
import Footer from "@/components/footer";
import { Home, BookOpen, Settings } from "lucide-react"; // example icons

export default function App() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Overview", url: "/overview", icon: BookOpen },
    { name: "Features", url: "/features", icon: Settings },
    { name: "Terms", url: "/terms", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navbar */}
      <Navbar items={navItems} />

      {/* Main content */}
      <main className="flex-1 px-6 py-12 space-y-12 max-w-5xl mx-auto mt-28">
        {/* Header */}
        <Header />

        {/* Documentation Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground text-sm">
            This API allows embedding and streaming anime episodes with configurable audio,
            autoplay, and language preferences.
          </p>
        </section>

        {/* Embed Tester */}
        <EmbedTester />

        {/* Status / Skeleton Cards */}
        <StatusCards />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
