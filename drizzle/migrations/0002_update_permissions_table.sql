-- Update permissions table to use moduleId instead of module and action
-- This migration handles the transition from the old structure to the new one

-- Step 1: Add the new moduleId column (nullable initially)
ALTER TABLE "permissions" ADD COLUMN "module_id" uuid;

-- Step 2: Create a default module if it doesn't exist
-- This ensures we have a reference for existing permissions
INSERT INTO "modules" ("name", "description", "code") 
VALUES ('Legacy', 'Legacy module for existing permissions', 'LEGACY')
ON CONFLICT ("code") DO NOTHING;

-- Step 3: Update existing permissions to reference the default module
UPDATE "permissions" 
SET "module_id" = (SELECT id FROM "modules" WHERE code = 'LEGACY' LIMIT 1)
WHERE "module_id" IS NULL;

-- Step 4: Make module_id NOT NULL
ALTER TABLE "permissions" ALTER COLUMN "module_id" SET NOT NULL;

-- Step 5: Add foreign key constraint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_module_id_fkey" 
  FOREIGN KEY ("module_id") REFERENCES "modules"("id");

-- Step 6: Drop the old columns
ALTER TABLE "permissions" DROP COLUMN "module";
ALTER TABLE "permissions" DROP COLUMN "action";

-- Note: After running this migration, you may want to:
-- 1. Create proper modules for your existing permissions
-- 2. Update the module_id references to point to the correct modules
-- 3. Remove the 'Legacy' module if no longer needed
