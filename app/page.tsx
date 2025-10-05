import { ToolCard } from "@/components/ToolCard";
import { TOOL_CATALOG } from "@/config/tools";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Simple Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Simple tools made simple. A collection of focused utilities to make your life easier.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOOL_CATALOG.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}

