import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="font-bold text-xl">Simple Tools</div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/#tools" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Tools
          </Link>
        </nav>
      </div>
    </header>
  );
}
