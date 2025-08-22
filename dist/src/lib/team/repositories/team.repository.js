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
let TeamRepository = class TeamRepository {
    constructor(db) {
        this.db = db;
    }
    async create(team) {
        const [result] = await this.db.insert(team_schema_1.teams).values(team).returning();
        return result;
    }
    async findAll() {
        return this.db.select().from(team_schema_1.teams);
    }
    async findById(id) {
        const [result] = await this.db.select().from(team_schema_1.teams).where((0, drizzle_orm_1.eq)(team_schema_1.teams.id, id));
        return result || null;
    }
    async findByProject(projectId) {
        return this.db.select().from(team_schema_1.teams).where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, projectId));
    }
    async findByLead(leadId) {
        return this.db.select().from(team_schema_1.teams).where((0, drizzle_orm_1.eq)(team_schema_1.teams.leadId, leadId));
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