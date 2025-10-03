export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  href: string;
  icon: string;
  orderIndex?: number;
}

export const TOOL_CATALOG: Tool[] = [
  {
    slug: "save",
    name: "QuickSave",
    tagline: "Save any text fast",
    href: "/save",
    icon: "bookmark",
    orderIndex: 1,
  },
  {
    slug: "qr",
    name: "QR + Link",
    tagline: "Create short links and QR codes",
    href: "/qr/new",
    icon: "qr-code",
    orderIndex: 2,
  },
  {
    slug: "docreader",
    name: "DocReader",
    tagline: "Parse insurance cards and bills",
    href: "/docreader/new",
    icon: "file-search",
    orderIndex: 3,
  },
  {
    slug: "oncue",
    name: "OnCue",
    tagline: "AI command bar",
    href: "https://useoncue.com",
    icon: "command",
    orderIndex: 4,
  },
];

