import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { projects } from './project.schema';

export const userProjects = pgTable('user_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  assignedAt: timestamp('assigned_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type UserProject = typeof userProjects.$inferSelect;
export type NewUserProject = typeof userProjects.$inferInsert;