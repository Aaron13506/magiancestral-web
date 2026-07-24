CREATE TABLE IF NOT EXISTS "blog_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date" date NOT NULL,
	"image" text,
	"author" text,
	"category" text NOT NULL,
	"pdf_url" text,
	"content" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blog_articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"event_date" date NOT NULL,
	"title" text NOT NULL,
	"subtitle" text,
	"location" text,
	"type" text,
	"logo" text,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"short_name" text,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"image" text,
	"gallery" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"category" text,
	"description" text,
	"content" text,
	"usage" text,
	"ingredients" text,
	"precautions" text,
	"benefits" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"in_stock" boolean DEFAULT true NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"top_product" boolean DEFAULT false NOT NULL,
	"artisanal" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
