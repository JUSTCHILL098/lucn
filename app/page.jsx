"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/header";
import EmbedTester from "@/components/embed-tester";
import StatusCards from "@/components/status-cards";
import Footer from "@/components/footer";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Navbar />

      <main className="flex-1 px-6 py-12 space-y-12 max-w-5xl mx-auto mt-28">
        <Header />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground text-sm">
            This API allows embedding and streaming anime episodes with configurable audio,
            autoplay, and language preferences.
          </p>
        </section>

        <EmbedTester />
        <StatusCards />
        <Footer />
      </main>
    </div>
  );
}
