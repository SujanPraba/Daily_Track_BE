"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const project_schema_1 = require("./project.schema");
const role_schema_1 = require("./role.schema");
exports.projectRoles = (0, pg_core_1.pgTable)('project_roles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => project_schema_1.projects.id).notNull(),
    roleId: (0, pg_core_1.uuid)('role_id').references(() => role_schema_1.roles.id).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=project-role.schema.js.map