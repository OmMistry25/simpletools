import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOL_CATALOG } from "@/config/tools";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bookmark, QrCode, FileSearch, Command } from "lucide-react";

const iconMap = {
  bookmark: Bookmark,
  "qr-code": QrCode,
  "file-search": FileSearch,
  command: Command,
};

export async function generateStaticParams() {
  return TOOL_CATALOG.map((tool) => ({
    slug: tool.slug,
  }));
}

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = TOOL_CATALOG.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const Icon = iconMap[tool.icon as keyof typeof iconMap] || Bookmark;
  const isExternal = tool.href.startsWith("http");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/tools"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            ← Back to all tools
          </Link>

          {/* Tool Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary">
              <Icon className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{tool.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{tool.tagline}</p>
              <Button asChild size="lg">
                <Link href={tool.href} target={isExternal ? "_blank" : undefined}>
                  Launch {tool.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {slug === "save" && (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Fast Capture</div>
                  <div className="text-sm text-muted-foreground">Save text with keyboard shortcuts</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Organize</div>
                  <div className="text-sm text-muted-foreground">Tags and search built-in</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Bookmarklet</div>
                  <div className="text-sm text-muted-foreground">Capture from any webpage</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Secure</div>
                  <div className="text-sm text-muted-foreground">Cloud storage with encryption</div>
                </div>
              </>
            )}

            {slug === "qr" && (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Short Links</div>
                  <div className="text-sm text-muted-foreground">Custom branded URLs</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">QR Codes</div>
                  <div className="text-sm text-muted-foreground">High-quality PNG & SVG</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Analytics</div>
                  <div className="text-sm text-muted-foreground">Track clicks and traffic</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Customizable</div>
                  <div className="text-sm text-muted-foreground">Design your QR codes</div>
                </div>
              </>
            )}

            {slug === "docreader" && (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">OCR Extraction</div>
                  <div className="text-sm text-muted-foreground">Intelligent text recognition</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Auto-detect</div>
                  <div className="text-sm text-muted-foreground">Finds key fields automatically</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Multi-format</div>
                  <div className="text-sm text-muted-foreground">Images and PDFs supported</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Editable</div>
                  <div className="text-sm text-muted-foreground">Review and correct results</div>
                </div>
              </>
            )}

            {slug === "oncue" && (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Universal Search</div>
                  <div className="text-sm text-muted-foreground">Find anything, anywhere</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Smart suggestions</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Shortcuts</div>
                  <div className="text-sm text-muted-foreground">Customizable hotkeys</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-1">Extension</div>
                  <div className="text-sm text-muted-foreground">Browser integration</div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
