-- CREATE TABLE "onboarding"."account_type" (
-- 	"id" serial PRIMARY KEY NOT NULL,
-- 	"name" text NOT NULL,
-- 	"description" text,
-- 	"added_by" text NOT NULL,
-- 	"confirmed" boolean DEFAULT false,
-- 	"confirmed_by" text,
-- 	"confirmed_at" timestamp
-- );
--> statement-breakpoint
CREATE TABLE "onboarding"."um_member_onboarding_pivot" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_no" varchar NOT NULL,
	"ref_no" varchar(50) NOT NULL,
	"category" varchar(50) NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"userlevel" varchar(50) NOT NULL,
	"mobile_no" varchar(20) NOT NULL,
	"member_type" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "onboarding"."um_memberpass" (
	"id" serial PRIMARY KEY NOT NULL,
	"member_no" varchar NOT NULL,
	"ref_no" varchar(50) NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"userlevel" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"password_token" varchar(255),
	"otp" varchar(6),
	"otp_expiry_time" timestamp,
	"failed_logins" integer DEFAULT 0,
	"disabled" boolean DEFAULT false,
	"disabled_by" varchar(255),
	"disabled_date" timestamp,
	"disabled_reason" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"added_by" text NOT NULL,
	"confirmed" boolean DEFAULT false,
	"confirmed_by" text,
	"confirmed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "onboarding"."um_members_web" (
	"member_no" varchar PRIMARY KEY NOT NULL,
	"ref_no" varchar(50) NOT NULL,
	"account_type" varchar(50),
	"agent_no" uuid,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"full_name" varchar(255),
	"identification_type" varchar(50),
	"identification_no" varchar(100),
	"dob" date,
	"gender" varchar(20),
	"mobile_no" varchar(20) NOT NULL,
	"telephone_no" varchar(20),
	"salutation" varchar(20),
	"category" varchar(50),
	"marital_status" varchar(50),
	"income_source" varchar(100),
	"employed" boolean DEFAULT false,
	"tax_no" varchar(50),
	"postal_address" varchar(255),
	"postal_code" varchar(20),
	"country" varchar(50),
	"county" varchar(50),
	"town" varchar(50),
	"sms_notification" boolean DEFAULT false,
	"date_joined" timestamp,
	"confirmed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"added_by" text NOT NULL,
	"confirmed_by" text,
	"confirmed_at" timestamp,
	CONSTRAINT "um_members_web_ref_no_unique" UNIQUE("ref_no")
);
--> statement-breakpoint
ALTER TABLE "onboarding"."um_member_onboarding_pivot" ADD CONSTRAINT "um_member_onboarding_pivot_member_no_um_members_web_member_no_fk" FOREIGN KEY ("member_no") REFERENCES "onboarding"."um_members_web"("member_no") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding"."um_memberpass" ADD CONSTRAINT "um_memberpass_member_no_um_members_web_member_no_fk" FOREIGN KEY ("member_no") REFERENCES "onboarding"."um_members_web"("member_no") ON DELETE no action ON UPDATE no action;