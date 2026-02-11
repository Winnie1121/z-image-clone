import { Header } from "@/components/header";
import { GeneratorWorkspace } from "@/components/generator-workspace";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        <GeneratorWorkspace />
      </main>
    </div>
  );
}
