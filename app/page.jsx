import Header from "@/components/header"
import EmbedTester from "@/components/embed-tester"
import StatusCards from "@/components/status-cards"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 px-6 py-12 space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <Header />

        {/* Documentation section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Documentation
          </h2>
          <p className="text-muted-foreground text-sm">
            This API allows embedding and streaming anime episodes with
            configurable audio, autoplay, and language preferences.
          </p>
        </section>

        {/* Embed tester */}
        <EmbedTester />

        {/* Status / skeleton cards */}
        <StatusCards />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  )
}
