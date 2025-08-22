"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTeams = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const team_schema_1 = require("./team.schema");
exports.userTeams = (0, pg_core_1.pgTable)('user_teams', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => user_schema_1.users.id).notNull(),
    teamId: (0, pg_core_1.uuid)('team_id').references(() => team_schema_1.teams.id).notNull(),
    assignedAt: (0, pg_core_1.timestamp)('assigned_at').defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=user-team.schema.js.map