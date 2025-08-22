"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.projects = (0, pg_core_1.pgTable)('projects', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)('name', { length: 200 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    code: (0, pg_core_1.varchar)('code', { length: 20 }).notNull().unique(),
    managerId: (0, pg_core_1.uuid)('manager_id'),
    status: (0, pg_core_1.varchar)('status', { length: 20 }).default('ACTIVE'),
    startDate: (0, pg_core_1.timestamp)('start_date'),
    endDate: (0, pg_core_1.timestamp)('end_date'),
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
});
//# sourceMappingURL=project.schema.js.map