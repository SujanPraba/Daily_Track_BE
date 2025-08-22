"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.permissions = (0, pg_core_1.pgTable)('permissions', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    module: (0, pg_core_1.varchar)('module', { length: 50 }).notNull(),
    action: (0, pg_core_1.varchar)('action', { length: 50 }).notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=permission.schema.js.map