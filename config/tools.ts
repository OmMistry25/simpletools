export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  href: string;
  icon: string;
  orderIndex?: number;
  comingSoon?: boolean;
}

export const TOOL_CATALOG: Tool[] = [
  {
    slug: "save",
    name: "QuickSave",
    tagline: "Save any text fast",
    href: "https://usecliq.com/",
    icon: "bookmark",
    orderIndex: 1,
  },
  {
    slug: "qr",
    name: "QR + Link",
    tagline: "Create short links and QR codes",
    href: "https://mysmartlinq.com/",
    icon: "qr-code",
    orderIndex: 2,
  },
  {
    slug: "docreader",
    name: "DocReader",
    tagline: "Parse insurance cards and bills",
    href: "#",
    icon: "file-search",
    orderIndex: 3,
    comingSoon: true,
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


