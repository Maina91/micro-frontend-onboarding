CREATE TABLE "onboarding"."securities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"security_code" text NOT NULL,
	"description" text,
	"added_by" text NOT NULL,
	"confirmed" boolean DEFAULT false,
	"confirmed_by" text,
	"confirmed_at" timestamp
);
