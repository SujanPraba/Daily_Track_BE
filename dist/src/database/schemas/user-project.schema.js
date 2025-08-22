"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProjects = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const project_schema_1 = require("./project.schema");
exports.userProjects = (0, pg_core_1.pgTable)('user_projects', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => user_schema_1.users.id).notNull(),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => project_schema_1.projects.id).notNull(),
    assignedAt: (0, pg_core_1.timestamp)('assigned_at').defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=user-project.schema.js.map