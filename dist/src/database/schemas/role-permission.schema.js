"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const role_schema_1 = require("./role.schema");
const permission_schema_1 = require("./permission.schema");
exports.rolePermissions = (0, pg_core_1.pgTable)('role_permissions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    roleId: (0, pg_core_1.uuid)('role_id').references(() => role_schema_1.roles.id).notNull(),
    permissionId: (0, pg_core_1.uuid)('permission_id').references(() => permission_schema_1.permissions.id).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=role-permission.schema.js.map