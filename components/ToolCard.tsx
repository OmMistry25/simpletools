import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Bookmark, QrCode, FileSearch, Command } from "lucide-react";
import type { Tool } from "@/config/tools";

const iconMap = {
  bookmark: Bookmark,
  "qr-code": QrCode,
  "file-search": FileSearch,
  command: Command,
};

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = iconMap[tool.icon as keyof typeof iconMap] || Bookmark;
  const isExternal = tool.href.startsWith("http");

  return (
    <Link href={tool.href} target={isExternal ? "_blank" : undefined}>
      <Card className="group hover:border-primary transition-all hover:shadow-md cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="p-2 rounded-lg bg-primary/10 text-primary mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">{tool.name}</CardTitle>
          <CardDescription className="text-base">{tool.tagline}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
