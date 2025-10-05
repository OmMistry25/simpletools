import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          ← Back to home
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing Simple Tools, you agree to be bound by these Terms of Service and all applicable 
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Use of Website</h2>
            <p className="text-muted-foreground">
              This website serves as a portfolio showcasing various tools and projects. The content is provided 
              for informational purposes only.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Links to external tools are provided as-is</li>
              <li>Each tool may have its own separate terms of service</li>
              <li>We make no warranties about the availability or functionality of linked tools</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <p className="text-muted-foreground">
              The content, design, and layout of this website are protected by copyright and other intellectual 
              property rights. You may not reproduce, distribute, or create derivative works without permission.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">External Links</h2>
            <p className="text-muted-foreground">
              Our website contains links to external websites and tools. We are not responsible for the content, 
              terms, or privacy practices of these external sites. Use of external tools is at your own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Disclaimer</h2>
            <p className="text-muted-foreground">
              This website and all linked tools are provided "as is" without any warranties, express or implied. 
              We do not guarantee the accuracy, completeness, or usefulness of any information provided.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall Simple Tools be liable for any damages arising from the use or inability to use 
              this website or any linked tools.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting to this page.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about these Terms of Service, please contact us through the links provided 
              on our individual tool pages.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
