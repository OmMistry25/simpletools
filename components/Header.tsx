import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="font-semibold text-lg">ST</div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/tools" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Browse
          </Link>
        </nav>
      </div>
    </header>
  );
}
