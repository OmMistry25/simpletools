"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOOL_CATALOG } from "@/config/tools";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredTools = search
    ? TOOL_CATALOG.filter((tool) => {
        const searchLower = search.toLowerCase();
        return (
          tool.name.toLowerCase().includes(searchLower) ||
          tool.tagline.toLowerCase().includes(searchLower) ||
          tool.slug.toLowerCase().includes(searchLower)
        );
      })
    : [];

  const handleToolClick = (slug: string) => {
    router.push(`/tool/${slug}`);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Find your tool
          </h1>
          <p className="text-lg text-muted-foreground">
            Search from our collection of simple utilities
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Try 'QR code' or 'save text'..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-14 pl-12 text-lg shadow-lg border-2 focus-visible:ring-4"
            autoFocus
          />
        </div>

        {/* Search Results */}
        {search && (
          <div className="bg-card border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            {filteredTools.length > 0 ? (
              <div className="divide-y">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.slug}
                    onClick={() => handleToolClick(tool.slug)}
                    className="w-full px-4 py-4 hover:bg-muted/50 transition-colors text-left flex items-start gap-3 group"
                  >
                    <div className="flex-1">
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tool.tagline}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                No tools found. Try different keywords.
              </div>
            )}
          </div>
        )}

        {/* Browse Link */}
        {!search && (
          <div className="text-center">
            <Link
              href="/tools"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Or browse all {TOOL_CATALOG.length} tools →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

