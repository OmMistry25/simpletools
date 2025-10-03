import { createClient } from "@supabase/supabase-js";
import { TOOL_CATALOG } from "../config/tools";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedTools() {
  console.log("Seeding tools catalog...");

  for (const tool of TOOL_CATALOG) {
    const { error } = await supabase.from("tools").upsert(
      {
        slug: tool.slug,
        name: tool.name,
        tagline: tool.tagline,
        href: tool.href,
        icon: tool.icon,
        order_index: tool.orderIndex || 0,
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error(`Error seeding tool ${tool.slug}:`, error);
    } else {
      console.log(`✓ Seeded tool: ${tool.name}`);
    }
  }

  console.log("Done seeding tools!");
}

seedTools().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});

