import { Header } from "@/components/header";
import { HistoryGrid } from "@/components/history-grid";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              My Generations
            </h1>
            <p className="text-muted-foreground">
              View all your AI-generated images
            </p>
          </div>
          <HistoryGrid />
        </div>
      </main>
    </div>
  );
}
