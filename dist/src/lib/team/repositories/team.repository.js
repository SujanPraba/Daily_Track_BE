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
exports.TeamRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const team_schema_1 = require("../../../database/schemas/team.schema");
const project_schema_1 = require("../../../database/schemas/project.schema");
const user_schema_1 = require("../../../database/schemas/user.schema");
const user_team_schema_1 = require("../../../database/schemas/user-team.schema");
let TeamRepository = class TeamRepository {
    constructor(db) {
        this.db = db;
    }
    async create(team) {
        const [result] = await this.db.insert(team_schema_1.teams).values(team).returning();
        return result;
    }
    async findAll() {
        return this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            projectId: team_schema_1.teams.projectId,
            projectName: project_schema_1.projects.name,
            leadId: team_schema_1.teams.leadId,
            leadName: (0, drizzle_orm_1.sql) `CONCAT(${user_schema_1.users.firstName}, ' ', ${user_schema_1.users.lastName})`,
            userCount: (0, drizzle_orm_1.sql) `(
          SELECT COUNT(*)::int 
          FROM ${user_team_schema_1.userTeams} 
          WHERE ${user_team_schema_1.userTeams.teamId} = ${team_schema_1.teams.id}
        )`,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project_schema_1.projects.id))
            .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, user_schema_1.users.id));
    }
    async findById(id) {
        const [result] = await this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            projectId: team_schema_1.teams.projectId,
            projectName: project_schema_1.projects.name,
            leadId: team_schema_1.teams.leadId,
            leadName: (0, drizzle_orm_1.sql) `CONCAT(${user_schema_1.users.firstName}, ' ', ${user_schema_1.users.lastName})`,
            userCount: (0, drizzle_orm_1.sql) `(
          SELECT COUNT(*)::int 
          FROM ${user_team_schema_1.userTeams} 
          WHERE ${user_team_schema_1.userTeams.teamId} = ${team_schema_1.teams.id}
        )`,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project_schema_1.projects.id))
            .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, user_schema_1.users.id))
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.id, id));
        return result || null;
    }
    async findByProject(projectId) {
        return this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            projectId: team_schema_1.teams.projectId,
            projectName: project_schema_1.projects.name,
            leadId: team_schema_1.teams.leadId,
            leadName: (0, drizzle_orm_1.sql) `CONCAT(${user_schema_1.users.firstName}, ' ', ${user_schema_1.users.lastName})`,
            userCount: (0, drizzle_orm_1.sql) `(
          SELECT COUNT(*)::int 
          FROM ${user_team_schema_1.userTeams} 
          WHERE ${user_team_schema_1.userTeams.teamId} = ${team_schema_1.teams.id}
        )`,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project_schema_1.projects.id))
            .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, user_schema_1.users.id))
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, projectId));
    }
    async findByLead(leadId) {
        return this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            projectId: team_schema_1.teams.projectId,
            projectName: project_schema_1.projects.name,
            leadId: team_schema_1.teams.leadId,
            leadName: (0, drizzle_orm_1.sql) `CONCAT(${user_schema_1.users.firstName}, ' ', ${user_schema_1.users.lastName})`,
            userCount: (0, drizzle_orm_1.sql) `(
          SELECT COUNT(*)::int 
          FROM ${user_team_schema_1.userTeams} 
          WHERE ${user_team_schema_1.userTeams.teamId} = ${team_schema_1.teams.id}
        )`,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project_schema_1.projects.id))
            .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, user_schema_1.users.id))
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, leadId));
    }
    async searchTeams(searchDto) {
        const { searchTerm, page = 1, limit = 10, projectId, leadId } = searchDto;
        const offset = (page - 1) * limit;
        const whereConditions = [];
        if (searchTerm) {
            whereConditions.push((0, drizzle_orm_1.like)(team_schema_1.teams.name, `%${searchTerm}%`));
        }
        if (projectId) {
            whereConditions.push((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, projectId));
        }
        if (leadId) {
            whereConditions.push((0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, leadId));
        }
        const countQuery = this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(team_schema_1.teams);
        if (whereConditions.length > 0) {
            countQuery.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const [{ count }] = await countQuery;
        const total = Number(count);
        const query = this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            projectId: team_schema_1.teams.projectId,
            projectName: project_schema_1.projects.name,
            leadId: team_schema_1.teams.leadId,
            leadName: (0, drizzle_orm_1.sql) `CONCAT(${user_schema_1.users.firstName}, ' ', ${user_schema_1.users.lastName})`,
            userCount: (0, drizzle_orm_1.sql) `(
          SELECT COUNT(*)::int 
          FROM ${user_team_schema_1.userTeams} 
          WHERE ${user_team_schema_1.userTeams.teamId} = ${team_schema_1.teams.id}
        )`,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project_schema_1.projects.id))
            .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, user_schema_1.users.id))
            .orderBy((0, drizzle_orm_1.desc)(team_schema_1.teams.createdAt))
            .limit(limit)
            .offset(offset);
        if (whereConditions.length > 0) {
            query.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const data = await query;
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {
            data,
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage,
        };
    }
    async update(id, team) {
        const [result] = await this.db
            .update(team_schema_1.teams)
            .set({ ...team, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.id, id))
            .returning();
        return result;
    }
    async delete(id) {
        await this.db.delete(team_schema_1.teams).where((0, drizzle_orm_1.eq)(team_schema_1.teams.id, id));
    }
};
exports.TeamRepository = TeamRepository;
exports.TeamRepository = TeamRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], TeamRepository);
//# sourceMappingURL=team.repository.js.map