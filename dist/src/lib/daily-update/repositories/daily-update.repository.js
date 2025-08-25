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
const team_schema_1 = require("../../../database/schemas/team.schema");
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
    async searchWithPagination(criteria, limit, offset) {
        let whereConditions = [];
        if (criteria.userId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.userId, criteria.userId));
        }
        if (criteria.projectId) {
            if (Array.isArray(criteria.projectId)) {
                whereConditions.push((0, drizzle_orm_1.inArray)(daily_update_schema_1.dailyUpdates.projectId, criteria.projectId));
            }
            else {
                whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, criteria.projectId));
            }
        }
        if (criteria.teamId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.teamId, criteria.teamId));
        }
        if (criteria.status) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.status, criteria.status));
        }
        if (criteria.tickets) {
            whereConditions.push((0, drizzle_orm_1.sql) `${daily_update_schema_1.dailyUpdates.tickets}::text ILIKE ${`%${criteria.tickets}%`}`);
        }
        if (criteria.startDate && criteria.endDate) {
            whereConditions.push((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(daily_update_schema_1.dailyUpdates.date, criteria.startDate), (0, drizzle_orm_1.lte)(daily_update_schema_1.dailyUpdates.date, criteria.endDate)));
        }
        const whereClause = whereConditions.length > 0 ? (0, drizzle_orm_1.and)(...whereConditions) : undefined;
        return this.db
            .select({
            id: daily_update_schema_1.dailyUpdates.id,
            userId: daily_update_schema_1.dailyUpdates.userId,
            projectId: daily_update_schema_1.dailyUpdates.projectId,
            teamId: daily_update_schema_1.dailyUpdates.teamId,
            date: daily_update_schema_1.dailyUpdates.date,
            tickets: daily_update_schema_1.dailyUpdates.tickets,
            ticketsHours: daily_update_schema_1.dailyUpdates.ticketsHours,
            internalMeetingHours: daily_update_schema_1.dailyUpdates.internalMeetingHours,
            externalMeetingHours: daily_update_schema_1.dailyUpdates.externalMeetingHours,
            otherActivities: daily_update_schema_1.dailyUpdates.otherActivities,
            otherActivityHours: daily_update_schema_1.dailyUpdates.otherActivityHours,
            leavePermissionHours: daily_update_schema_1.dailyUpdates.leavePermissionHours,
            totalHours: daily_update_schema_1.dailyUpdates.totalHours,
            notes: daily_update_schema_1.dailyUpdates.notes,
            status: daily_update_schema_1.dailyUpdates.status,
            submittedAt: daily_update_schema_1.dailyUpdates.submittedAt,
            approvedAt: daily_update_schema_1.dailyUpdates.approvedAt,
            approvedBy: daily_update_schema_1.dailyUpdates.approvedBy,
            createdAt: daily_update_schema_1.dailyUpdates.createdAt,
            updatedAt: daily_update_schema_1.dailyUpdates.updatedAt,
            teamName: team_schema_1.teams.name,
            teamDescription: team_schema_1.teams.description,
        })
            .from(daily_update_schema_1.dailyUpdates)
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, team_schema_1.teams.projectId))
            .where(whereClause)
            .orderBy((0, drizzle_orm_1.desc)(daily_update_schema_1.dailyUpdates.createdAt))
            .limit(limit)
            .offset(offset);
    }
    async countWithCriteria(criteria) {
        let whereConditions = [];
        if (criteria.userId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.userId, criteria.userId));
        }
        if (criteria.projectId) {
            if (Array.isArray(criteria.projectId)) {
                whereConditions.push((0, drizzle_orm_1.inArray)(daily_update_schema_1.dailyUpdates.projectId, criteria.projectId));
            }
            else {
                whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, criteria.projectId));
            }
        }
        if (criteria.teamId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.teamId, criteria.teamId));
        }
        if (criteria.status) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.status, criteria.status));
        }
        if (criteria.tickets) {
            whereConditions.push((0, drizzle_orm_1.sql) `${daily_update_schema_1.dailyUpdates.tickets}::text ILIKE ${`%${criteria.tickets}%`}`);
        }
        if (criteria.startDate && criteria.endDate) {
            whereConditions.push((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(daily_update_schema_1.dailyUpdates.date, criteria.startDate), (0, drizzle_orm_1.lte)(daily_update_schema_1.dailyUpdates.date, criteria.endDate)));
        }
        const whereClause = whereConditions.length > 0 ? (0, drizzle_orm_1.and)(...whereConditions) : undefined;
        const result = await this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(daily_update_schema_1.dailyUpdates)
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, team_schema_1.teams.projectId))
            .where(whereClause);
        return Number(result[0]?.count || 0);
    }
    async getTeamByProject(projectId) {
        const [result] = await this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
        })
            .from(team_schema_1.teams)
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, projectId));
        return result || null;
    }
    async getTeamById(teamId) {
        const [result] = await this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
        })
            .from(team_schema_1.teams)
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.id, teamId));
        return result || null;
    }
    async findDailyUpdatesWithTeamInfo(startDate, endDate, projectId, teamId) {
        let whereConditions = [
            (0, drizzle_orm_1.gte)(daily_update_schema_1.dailyUpdates.date, startDate),
            (0, drizzle_orm_1.lte)(daily_update_schema_1.dailyUpdates.date, endDate)
        ];
        if (projectId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.projectId, projectId));
        }
        if (teamId) {
            whereConditions.push((0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.teamId, teamId));
        }
        return this.db
            .select({
            id: daily_update_schema_1.dailyUpdates.id,
            userId: daily_update_schema_1.dailyUpdates.userId,
            projectId: daily_update_schema_1.dailyUpdates.projectId,
            teamId: daily_update_schema_1.dailyUpdates.teamId,
            date: daily_update_schema_1.dailyUpdates.date,
            tickets: daily_update_schema_1.dailyUpdates.tickets,
            internalMeetingHours: daily_update_schema_1.dailyUpdates.internalMeetingHours,
            externalMeetingHours: daily_update_schema_1.dailyUpdates.externalMeetingHours,
            otherActivities: daily_update_schema_1.dailyUpdates.otherActivities,
            otherActivityHours: daily_update_schema_1.dailyUpdates.otherActivityHours,
            totalHours: daily_update_schema_1.dailyUpdates.totalHours,
            notes: daily_update_schema_1.dailyUpdates.notes,
            status: daily_update_schema_1.dailyUpdates.status,
            submittedAt: daily_update_schema_1.dailyUpdates.submittedAt,
            approvedAt: daily_update_schema_1.dailyUpdates.approvedAt,
            approvedBy: daily_update_schema_1.dailyUpdates.approvedBy,
            createdAt: daily_update_schema_1.dailyUpdates.createdAt,
            updatedAt: daily_update_schema_1.dailyUpdates.updatedAt,
            teamName: team_schema_1.teams.name,
            teamDescription: team_schema_1.teams.description,
        })
            .from(daily_update_schema_1.dailyUpdates)
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(daily_update_schema_1.dailyUpdates.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.and)(...whereConditions))
            .orderBy((0, drizzle_orm_1.desc)(daily_update_schema_1.dailyUpdates.date));
    }
};
exports.DailyUpdateRepository = DailyUpdateRepository;
exports.DailyUpdateRepository = DailyUpdateRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], DailyUpdateRepository);
//# sourceMappingURL=daily-update.repository.js.map