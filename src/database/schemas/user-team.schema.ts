import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { teams } from './team.schema';

export const userTeams = pgTable('user_teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  teamId: uuid('team_id').references(() => teams.id).notNull(),
  assignedAt: timestamp('assigned_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type UserTeam = typeof userTeams.$inferSelect;
export type NewUserTeam = typeof userTeams.$inferInsert;