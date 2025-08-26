CREATE TABLE "onboarding"."account_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"added_by" text NOT NULL,
	"confirmed" boolean DEFAULT false,
	"confirmed_by" text,
	"confirmed_at" timestamp
);
