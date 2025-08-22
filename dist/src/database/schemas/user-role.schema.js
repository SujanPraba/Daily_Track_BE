"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const user_schema_1 = require("./user.schema");
const role_schema_1 = require("./role.schema");
exports.userRoles = (0, pg_core_1.pgTable)('user_roles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => user_schema_1.users.id).notNull(),
    roleId: (0, pg_core_1.uuid)('role_id').references(() => role_schema_1.roles.id).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=user-role.schema.js.map