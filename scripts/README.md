# Database Setup

## Prerequisites

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and keys to `.env.local`

## Running Migrations

### Option 1: Via Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `migrate.sql`
4. Click **Run**
5. Copy and paste the contents of `setup-storage.sql`
6. Click **Run**

### Option 2: Via Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# For storage, run setup-storage.sql in the dashboard
```

## What Gets Created

### Tables
- `profiles` - User profiles
- `tools` - Tools catalog
- `saves` - QuickSave entries
- `links` - Short links with QR codes
- `link_clicks` - Click analytics
- `documents` - Uploaded documents
- `document_extractions` - OCR results
- `events` - Analytics events

### Storage Buckets
- `docs` - Private document storage
- `qr` - Public QR code images

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Tools catalog is public read-only

## Seeding Data

### Seed Tools Catalog (Optional)

The tools catalog is defined in `config/tools.ts` and used statically in the app. If you want to store it in the database for dynamic management:

```bash
npm run seed
```

This will insert or update the tools catalog in the `tools` table.

