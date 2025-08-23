import { pgTable, uuid, varchar, timestamp, text, boolean } from 'drizzle-orm/pg-core';

export const modules = pgTable('modules', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  code: varchar('code', { length: 50 }).notNull().unique(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Module = typeof modules.$inferSelect;
export type NewModule = typeof modules.$inferInsert;
