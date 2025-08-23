"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.modules = (0, pg_core_1.pgTable)('modules', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 100 }).notNull().unique(),
    description: (0, pg_core_1.text)('description'),
    code: (0, pg_core_1.varchar)('code', { length: 50 }).notNull().unique(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=module.schema.js.map