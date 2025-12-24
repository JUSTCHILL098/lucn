import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import EmbedTester from "@/components/embed-tester"
import StatusCards from "@/components/status-cards"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 px-6 py-8 space-y-12">
        <Header />

        <section className="space-y-6 max-w-4xl">
          <h2 className="text-xl font-semibold tracking-tight">
            Documentation
          </h2>
          <p className="text-muted-foreground">
            This API allows embedding and streaming anime episodes with
            configurable audio, autoplay, and language preferences.
          </p>
        </section>

        <EmbedTester />
        <StatusCards />
        <Footer />
      </main>
    </div>
  )
}
