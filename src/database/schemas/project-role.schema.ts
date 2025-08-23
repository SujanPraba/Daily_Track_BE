import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { projects } from './project.schema';
import { roles } from './role.schema';

export const projectRoles = pgTable('project_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  roleId: uuid('role_id').references(() => roles.id).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type ProjectRole = typeof projectRoles.$inferSelect;
export type NewProjectRole = typeof projectRoles.$inferInsert;
