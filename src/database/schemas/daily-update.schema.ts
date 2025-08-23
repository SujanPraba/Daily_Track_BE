import { pgTable, uuid, varchar, timestamp, text, decimal, json } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { projects } from './project.schema';
import { teams } from './team.schema';

export const dailyUpdates = pgTable('daily_updates', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  projectId: uuid('project_id').references(() => projects.id).notNull(),
  teamId: uuid('team_id').references(() => teams.id),
  date: timestamp('date').notNull(),
  tickets: text('tickets').default(''),
  internalMeetingHours: decimal('internal_meeting_hours', { precision: 4, scale: 2 }).default('0.00'),
  externalMeetingHours: decimal('external_meeting_hours', { precision: 4, scale: 2 }).default('0.00'),
  otherActivities: text('other_activities'),
  otherActivityHours: decimal('other_activity_hours', { precision: 4, scale: 2 }).default('0.00'),
  totalHours: decimal('total_hours', { precision: 4, scale: 2 }).default('0.00'),
  notes: text('notes'),
  status: varchar('status', { length: 20 }).default('PENDING'),
  submittedAt: timestamp('submitted_at'),
  approvedAt: timestamp('approved_at'),
  approvedBy: uuid('approved_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type DailyUpdate = typeof dailyUpdates.$inferSelect;
export type NewDailyUpdate = typeof dailyUpdates.$inferInsert;