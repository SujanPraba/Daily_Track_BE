-- Add ticketsHours and leavePermissionHours fields to daily_updates table
-- This migration adds two new decimal fields for tracking time spent on tickets and leave/permission

-- Step 1: Add ticketsHours column
ALTER TABLE "daily_updates" ADD COLUMN "tickets_hours" decimal(4,2) DEFAULT '0.00';

-- Step 2: Add leavePermissionHours column
ALTER TABLE "daily_updates" ADD COLUMN "leave_permission_hours" decimal(4,2) DEFAULT '0.00';

-- Step 3: Update existing records to have default values
UPDATE "daily_updates" SET "tickets_hours" = '0.00' WHERE "tickets_hours" IS NULL;
UPDATE "daily_updates" SET "leave_permission_hours" = '0.00' WHERE "leave_permission_hours" IS NULL;

-- Step 4: Make the columns NOT NULL after setting default values
ALTER TABLE "daily_updates" ALTER COLUMN "tickets_hours" SET NOT NULL;
ALTER TABLE "daily_updates" ALTER COLUMN "leave_permission_hours" SET NOT NULL;

-- Note: After running this migration:
-- 1. The tickets_hours field will track time spent on tickets (default: 0.00)
-- 2. The leave_permission_hours field will track time for leave/permission (default: 0.00)
-- 3. Both fields are decimal(4,2) to allow up to 99.99 hours
-- 4. Existing records will have 0.00 hours for both fields
