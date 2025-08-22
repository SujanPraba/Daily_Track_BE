"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const project_schema_1 = require("./project.schema");
exports.teams = (0, pg_core_1.pgTable)('teams', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 200 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => project_schema_1.projects.id).notNull(),
    leadId: (0, pg_core_1.uuid)('lead_id'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=team.schema.js.map