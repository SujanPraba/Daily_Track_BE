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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const user_schema_1 = require("../../../database/schemas/user.schema");
const user_project_schema_1 = require("../../../database/schemas/user-project.schema");
const user_team_schema_1 = require("../../../database/schemas/user-team.schema");
const user_role_schema_1 = require("../../../database/schemas/user-role.schema");
const project_schema_1 = require("../../../database/schemas/project.schema");
const team_schema_1 = require("../../../database/schemas/team.schema");
const role_schema_1 = require("../../../database/schemas/role.schema");
let UserRepository = class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async create(user) {
        const [result] = await this.db.insert(user_schema_1.users).values(user).returning();
        const { password, ...userWithoutPassword } = result;
        return userWithoutPassword;
    }
    async findAll() {
        const result = await this.db.select().from(user_schema_1.users);
        return result.map(({ password, ...user }) => user);
    }
    async findById(id) {
        const [result] = await this.db.select().from(user_schema_1.users).where((0, drizzle_orm_1.eq)(user_schema_1.users.id, id));
        if (!result)
            return null;
        const { password, ...user } = result;
        return user;
    }
    async findByEmail(email) {
        const [result] = await this.db.select().from(user_schema_1.users).where((0, drizzle_orm_1.eq)(user_schema_1.users.email, email));
        return result || null;
    }
    async update(id, user) {
        const [result] = await this.db
            .update(user_schema_1.users)
            .set({ ...user, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, id))
            .returning();
        const { password, ...userWithoutPassword } = result;
        return userWithoutPassword;
    }
    async delete(id) {
        await this.db.delete(user_schema_1.users).where((0, drizzle_orm_1.eq)(user_schema_1.users.id, id));
    }
    async assignToProject(userId, projectId) {
        await this.db.insert(user_project_schema_1.userProjects).values({ userId, projectId });
    }
    async assignToTeam(userId, teamId) {
        await this.db.insert(user_team_schema_1.userTeams).values({ userId, teamId });
    }
    async assignRole(userId, roleId) {
        await this.db.insert(user_role_schema_1.userRoles).values({ userId, roleId });
    }
    async getUserProjects(userId) {
        return this.db
            .select({ project: project_schema_1.projects })
            .from(user_project_schema_1.userProjects)
            .innerJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .where((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, userId));
    }
    async getUserTeams(userId) {
        return this.db
            .select({ team: team_schema_1.teams })
            .from(user_team_schema_1.userTeams)
            .innerJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.userId, userId));
    }
    async getUserRoles(userId) {
        return this.db
            .select({ role: role_schema_1.roles })
            .from(user_role_schema_1.userRoles)
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_role_schema_1.userRoles.roleId, role_schema_1.roles.id))
            .where((0, drizzle_orm_1.eq)(user_role_schema_1.userRoles.userId, userId));
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map