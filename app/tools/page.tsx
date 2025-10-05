"use client";

import { useState } from "react";
import { ToolCard } from "@/components/ToolCard";
import { TOOL_CATALOG } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ToolsPage() {
  const [search, setSearch] = useState("");

  const filteredTools = TOOL_CATALOG.filter((tool) => {
    const searchLower = search.toLowerCase();
    return (
      tool.name.toLowerCase().includes(searchLower) ||
      tool.tagline.toLowerCase().includes(searchLower) ||
      tool.slug.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">All Tools</h1>
          <p className="text-muted-foreground">
            Browse our collection of {TOOL_CATALOG.length} simple utilities
          </p>
        </div>
      </section>

      {/* Search & Grid */}
      <section className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching "{search}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
