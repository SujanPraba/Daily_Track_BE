-- Update tickets field from JSON to text format
-- This migration changes the tickets field to store ticket information as text instead of JSON array

-- Step 1: Add a new text column for tickets
ALTER TABLE "daily_updates" ADD COLUMN "tickets_text" text;

-- Step 2: Convert existing JSON tickets to text format
-- This will extract the array elements and join them with commas
UPDATE "daily_updates"
SET "tickets_text" = (
  SELECT string_agg(value::text, ', ')
  FROM json_array_elements_text(COALESCE(tickets, '[]'::json))
);

-- Step 3: Drop the old JSON column
ALTER TABLE "daily_updates" DROP COLUMN "tickets";

-- Step 4: Rename the new text column to tickets
ALTER TABLE "daily_updates" RENAME COLUMN "tickets_text" TO "tickets";

-- Step 5: Add a default value for the tickets column
ALTER TABLE "daily_updates" ALTER COLUMN "tickets" SET DEFAULT '';

-- Note: After running this migration:
-- 1. The tickets field will now be text instead of JSON
-- 2. Existing ticket arrays will be converted to comma-separated strings
-- 3. New entries will store tickets as text
