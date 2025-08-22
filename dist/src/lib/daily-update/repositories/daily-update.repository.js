"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyUpdateRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const daily_update_schema_1 = require("../../../database/schemas/daily-update.schema");
let DailyUpdateRepository = class DailyUpdateRepository {
    constructor(db) {
        this.db = db;
    }
    async create(dailyUpdate) {
        const [result] = await this.db.insert(daily_update_schema_1.dailyUpdates).values(dailyUpdate).returning();
        return result;
    }
    async findAll() {
        return this.db.select().from(daily_update_schema_1.dailyUpdates);
    }
    async findById(id) {
        const [result] = await this.db.select().from(daily_update_schema_1.dailyUpdates).where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.id, id));
        return result || null;
    }
    async findByUser(userId) {
        return this.db.select().from(daily_update_schema_1.dailyUpdates).where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.userId, userId));
    }
    async findByProject(projectId) {
        return this.db.select().from(daily_update_schema_1.dailyUpdates).where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, projectId));
    }
    async findByStatus(status) {
        return this.db.select().from(daily_update_schema_1.dailyUpdates).where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.status, status));
    }
    async findByDateRange(startDate, endDate) {
        return this.db
            .select()
            .from(daily_update_schema_1.dailyUpdates)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(daily_update_schema_1.dailyUpdates.date, startDate), (0, drizzle_orm_1.lte)(daily_update_schema_1.dailyUpdates.date, endDate)));
    }
    async update(id, dailyUpdate) {
        const [result] = await this.db
            .update(daily_update_schema_1.dailyUpdates)
            .set({ ...dailyUpdate, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.id, id))
            .returning();
        return result;
    }
    async delete(id) {
        await this.db.delete(daily_update_schema_1.dailyUpdates).where((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.id, id));
    }
};
exports.DailyUpdateRepository = DailyUpdateRepository;
exports.DailyUpdateRepository = DailyUpdateRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], DailyUpdateRepository);
//# sourceMappingURL=daily-update.repository.js.map