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
            href="/"
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

          {/* Description Section */}
          <div className="prose prose-slate max-w-none mt-12">
            {slug === "save" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">About QuickSave</h2>
                <p className="text-lg text-muted-foreground">
                  QuickSave is your fast and simple text capture tool. Save notes, snippets, ideas, and more with just a few clicks.
                </p>
                <h3 className="text-xl font-semibold mt-8">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Quick text capture with keyboard shortcuts</li>
                  <li>Organize with tags and search</li>
                  <li>Browser bookmarklet for capturing from any page</li>
                  <li>Secure cloud storage</li>
                </ul>
              </div>
            )}

            {slug === "qr" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">About QR + Link</h2>
                <p className="text-lg text-muted-foreground">
                  Create short links and beautiful QR codes in seconds. Perfect for marketing, events, and sharing.
                </p>
                <h3 className="text-xl font-semibold mt-8">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Generate custom short links</li>
                  <li>Create high-quality QR codes (PNG/SVG)</li>
                  <li>Track clicks and analytics</li>
                  <li>Customizable QR code designs</li>
                </ul>
              </div>
            )}

            {slug === "docreader" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">About DocReader</h2>
                <p className="text-lg text-muted-foreground">
                  Extract text and data from documents using OCR. Perfect for insurance cards, bills, and receipts.
                </p>
                <h3 className="text-xl font-semibold mt-8">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Intelligent OCR text extraction</li>
                  <li>Automatic field detection</li>
                  <li>Support for images and PDFs</li>
                  <li>Edit and confirm extracted data</li>
                </ul>
              </div>
            )}

            {slug === "oncue" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">About OnCue</h2>
                <p className="text-lg text-muted-foreground">
                  Your AI-powered command bar for instant access to anything. Launch apps, search, and execute commands with ease.
                </p>
                <h3 className="text-xl font-semibold mt-8">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Universal search across all your apps</li>
                  <li>AI-powered suggestions</li>
                  <li>Customizable keyboard shortcuts</li>
                  <li>Browser extension for quick access</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
