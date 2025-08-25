"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailyUpdates = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const project_schema_1 = require("./project.schema");
const team_schema_1 = require("./team.schema");
exports.dailyUpdates = (0, pg_core_1.pgTable)('daily_updates', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => user_schema_1.users.id).notNull(),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => project_schema_1.projects.id).notNull(),
    teamId: (0, pg_core_1.uuid)('team_id').references(() => team_schema_1.teams.id),
    date: (0, pg_core_1.timestamp)('date').notNull(),
    tickets: (0, pg_core_1.text)('tickets').default(''),
    ticketsHours: (0, pg_core_1.decimal)('tickets_hours', { precision: 4, scale: 2 }).default('0.00'),
    internalMeetingHours: (0, pg_core_1.decimal)('internal_meeting_hours', { precision: 4, scale: 2 }).default('0.00'),
    externalMeetingHours: (0, pg_core_1.decimal)('external_meeting_hours', { precision: 4, scale: 2 }).default('0.00'),
    otherActivities: (0, pg_core_1.text)('other_activities'),
    otherActivityHours: (0, pg_core_1.decimal)('other_activity_hours', { precision: 4, scale: 2 }).default('0.00'),
    leavePermissionHours: (0, pg_core_1.decimal)('leave_permission_hours', { precision: 4, scale: 2 }).default('0.00'),
    totalHours: (0, pg_core_1.decimal)('total_hours', { precision: 4, scale: 2 }).default('0.00'),
    notes: (0, pg_core_1.text)('notes'),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('PENDING'),
    submittedAt: (0, pg_core_1.timestamp)('submitted_at'),
    approvedAt: (0, pg_core_1.timestamp)('approved_at'),
    approvedBy: (0, pg_core_1.uuid)('approved_by').references(() => user_schema_1.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=daily-update.schema.js.map