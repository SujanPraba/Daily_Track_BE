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
const permission_schema_1 = require("../../../database/schemas/permission.schema");
const role_permission_schema_1 = require("../../../database/schemas/role-permission.schema");
const user_with_assignments_dto_1 = require("../dtos/user-with-assignments.dto");
let UserRepository = class UserRepository {
    constructor(db) {
        this.db = db;
    }
    processUserWithAssignments(result) {
        const userMap = new Map();
        result.forEach((row) => {
            const userId = row.user.id;
            if (!userMap.has(userId)) {
                const { password, ...userWithoutPassword } = row.user;
                userMap.set(userId, {
                    ...userWithoutPassword,
                    projectRoles: [],
                    teamIds: new Set(),
                });
            }
            const user = userMap.get(userId);
            if (row.projectId && row.roleId) {
                const projectRole = {
                    projectId: row.projectId,
                    projectName: row.projectName,
                    roleId: row.roleId,
                    roleName: row.roleName,
                    teamId: row.teamId,
                    teamName: row.teamName,
                    assignedAt: row.assignedAt,
                };
                const exists = user.projectRoles.some((pr) => pr.projectId === row.projectId && pr.roleId === row.roleId);
                if (!exists) {
                    user.projectRoles.push(projectRole);
                }
            }
            if (row.teamId) {
                user.teamIds.add(row.teamId);
            }
        });
        return Array.from(userMap.values()).map(user => {
            const userDto = new user_with_assignments_dto_1.UserWithAssignmentsDto();
            Object.assign(userDto, {
                ...user,
                teamIds: Array.from(user.teamIds),
            });
            return userDto;
        });
    }
    async create(user) {
        const [result] = await this.db.insert(user_schema_1.users).values(user).returning();
        const { password, ...userWithoutPassword } = result;
        return userWithoutPassword;
    }
    async findAll() {
        const result = await this.db
            .select({
            user: user_schema_1.users,
            projectId: user_project_schema_1.userProjects.projectId,
            projectName: project_schema_1.projects.name,
            roleId: user_project_schema_1.userProjects.roleId,
            roleName: role_schema_1.roles.name,
            teamId: user_team_schema_1.userTeams.teamId,
            teamName: team_schema_1.teams.name,
            assignedAt: user_project_schema_1.userProjects.assignedAt,
        })
            .from(user_schema_1.users)
            .leftJoin(user_project_schema_1.userProjects, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_project_schema_1.userProjects.userId))
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .leftJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .orderBy((0, drizzle_orm_1.desc)(user_schema_1.users.createdAt));
        return this.processUserWithAssignments(result);
    }
    async searchUsers(searchDto) {
        const { searchTerm, page = 1, limit = 10, department, position } = searchDto;
        const offset = (page - 1) * limit;
        const whereConditions = [];
        if (searchTerm) {
            whereConditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(user_schema_1.users.firstName, `%${searchTerm}%`), (0, drizzle_orm_1.like)(user_schema_1.users.lastName, `%${searchTerm}%`), (0, drizzle_orm_1.like)(user_schema_1.users.email, `%${searchTerm}%`)));
        }
        if (department) {
            whereConditions.push((0, drizzle_orm_1.eq)(user_schema_1.users.department, department));
        }
        if (position) {
            whereConditions.push((0, drizzle_orm_1.eq)(user_schema_1.users.position, position));
        }
        const countQuery = this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(user_schema_1.users);
        if (whereConditions.length > 0) {
            countQuery.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const [{ count }] = await countQuery;
        const total = Number(count);
        const query = this.db
            .select({
            user: user_schema_1.users,
            projectId: user_project_schema_1.userProjects.projectId,
            projectName: project_schema_1.projects.name,
            roleId: user_project_schema_1.userProjects.roleId,
            roleName: role_schema_1.roles.name,
            teamId: user_team_schema_1.userTeams.teamId,
            teamName: team_schema_1.teams.name,
            assignedAt: user_project_schema_1.userProjects.assignedAt,
        })
            .from(user_schema_1.users)
            .leftJoin(user_project_schema_1.userProjects, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_project_schema_1.userProjects.userId))
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .leftJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .orderBy((0, drizzle_orm_1.desc)(user_schema_1.users.createdAt))
            .limit(limit)
            .offset(offset);
        if (whereConditions.length > 0) {
            query.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const result = await query;
        const data = this.processUserWithAssignments(result);
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
    async findById(id) {
        const result = await this.db
            .select({
            user: user_schema_1.users,
            projectId: user_project_schema_1.userProjects.projectId,
            projectName: project_schema_1.projects.name,
            roleId: user_project_schema_1.userProjects.roleId,
            roleName: role_schema_1.roles.name,
            teamId: user_team_schema_1.userTeams.teamId,
            teamName: team_schema_1.teams.name,
            assignedAt: user_project_schema_1.userProjects.assignedAt,
        })
            .from(user_schema_1.users)
            .leftJoin(user_project_schema_1.userProjects, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_project_schema_1.userProjects.userId))
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .leftJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.id, id));
        if (result.length === 0)
            return null;
        const userData = this.processUserWithAssignments(result);
        return userData[0];
    }
    async findByEmailRaw(email) {
        const [result] = await this.db.select().from(user_schema_1.users).where((0, drizzle_orm_1.eq)(user_schema_1.users.email, email));
        if (!result)
            return null;
        return result;
    }
    async findByEmail(email) {
        const result = await this.db
            .select({
            user: user_schema_1.users,
            projectId: user_project_schema_1.userProjects.projectId,
            projectName: project_schema_1.projects.name,
            roleId: user_project_schema_1.userProjects.roleId,
            roleName: role_schema_1.roles.name,
            teamId: user_team_schema_1.userTeams.teamId,
            teamName: team_schema_1.teams.name,
            assignedAt: user_project_schema_1.userProjects.assignedAt,
        })
            .from(user_schema_1.users)
            .leftJoin(user_project_schema_1.userProjects, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_project_schema_1.userProjects.userId))
            .leftJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .leftJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.eq)(user_schema_1.users.email, email));
        if (result.length === 0)
            return null;
        const userData = this.processUserWithAssignments(result);
        return userData[0];
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
    async assignProjectRoles(userId, projectRoleAssignments) {
        await this.db.delete(user_project_schema_1.userProjects).where((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, userId));
        await this.db.delete(user_team_schema_1.userTeams).where((0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.userId, userId));
        if (projectRoleAssignments.length > 0) {
            const userProjectData = projectRoleAssignments.map(({ projectId, roleId }) => ({
                userId,
                projectId,
                roleId,
            }));
            await this.db.insert(user_project_schema_1.userProjects).values(userProjectData);
        }
        const teamAssignments = projectRoleAssignments
            .filter(assignment => assignment.teamId)
            .map(assignment => ({
            userId,
            teamId: assignment.teamId,
        }));
        if (teamAssignments.length > 0) {
            await this.db.insert(user_team_schema_1.userTeams).values(teamAssignments);
        }
    }
    async assignTeam(userId, teamId) {
        await this.db.delete(user_team_schema_1.userTeams).where((0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.userId, userId));
        await this.db.insert(user_team_schema_1.userTeams).values({ userId, teamId });
    }
    async getUserProjectRoles(userId) {
        return this.db
            .select({
            project: project_schema_1.projects,
            role: role_schema_1.roles,
            team: team_schema_1.teams,
            assignedAt: user_project_schema_1.userProjects.assignedAt,
        })
            .from(user_project_schema_1.userProjects)
            .innerJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, userId))
            .orderBy(project_schema_1.projects.name);
    }
    async getUserTeams(userId) {
        return this.db
            .select({
            team: team_schema_1.teams,
            assignedAt: user_team_schema_1.userTeams.assignedAt,
        })
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
    async hasPermission(userId, permissionName) {
        const result = await this.db
            .select({ permissionName: permission_schema_1.permissions.name })
            .from(user_role_schema_1.userRoles)
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_role_schema_1.userRoles.roleId, role_schema_1.roles.id))
            .innerJoin(role_permission_schema_1.rolePermissions, (0, drizzle_orm_1.eq)(role_schema_1.roles.id, role_permission_schema_1.rolePermissions.roleId))
            .innerJoin(permission_schema_1.permissions, (0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.permissionId, permission_schema_1.permissions.id))
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(user_role_schema_1.userRoles.userId, userId), (0, drizzle_orm_1.eq)(permission_schema_1.permissions.name, permissionName), (0, drizzle_orm_1.eq)(permission_schema_1.permissions.isActive, true), (0, drizzle_orm_1.eq)(role_schema_1.roles.isActive, true)));
        return result.length > 0;
    }
    async getUserProjectIds(userId) {
        const result = await this.db
            .select({ projectId: user_project_schema_1.userProjects.projectId })
            .from(user_project_schema_1.userProjects)
            .where((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, userId));
        return result.map(row => row.projectId);
    }
    async findUserWithCompleteInformation(userId) {
        console.log('findUserWithCompleteInformation called with userId:', userId);
        try {
            const [user] = await this.db.select().from(user_schema_1.users).where((0, drizzle_orm_1.eq)(user_schema_1.users.id, userId));
            console.log('User found:', user);
            if (!user) {
                console.log('No user found, returning null');
                return null;
            }
            const userProjectsData = await this.db
                .select({
                project: {
                    id: project_schema_1.projects.id,
                    name: project_schema_1.projects.name,
                    description: project_schema_1.projects.description,
                    code: project_schema_1.projects.code,
                    status: project_schema_1.projects.status,
                    isActive: project_schema_1.projects.isActive,
                    createdAt: project_schema_1.projects.createdAt,
                    updatedAt: project_schema_1.projects.updatedAt,
                },
                role: {
                    id: role_schema_1.roles.id,
                    name: role_schema_1.roles.name,
                    description: role_schema_1.roles.description,
                    level: role_schema_1.roles.level,
                    isActive: role_schema_1.roles.isActive,
                    createdAt: role_schema_1.roles.createdAt,
                    updatedAt: role_schema_1.roles.updatedAt,
                },
                permission: {
                    id: permission_schema_1.permissions.id,
                    name: permission_schema_1.permissions.name,
                    description: permission_schema_1.permissions.description,
                }
            })
                .from(user_project_schema_1.userProjects)
                .innerJoin(project_schema_1.projects, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, project_schema_1.projects.id))
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
                .leftJoin(role_permission_schema_1.rolePermissions, (0, drizzle_orm_1.eq)(role_schema_1.roles.id, role_permission_schema_1.rolePermissions.roleId))
                .leftJoin(permission_schema_1.permissions, (0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.permissionId, permission_schema_1.permissions.id))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, user.id), (0, drizzle_orm_1.eq)(project_schema_1.projects.isActive, true), (0, drizzle_orm_1.eq)(role_schema_1.roles.isActive, true)));
            console.log('User projects data:', userProjectsData);
            const userTeamsData = await this.db
                .select({
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
                leadId: team_schema_1.teams.leadId,
                isActive: team_schema_1.teams.isActive,
                createdAt: team_schema_1.teams.createdAt,
                updatedAt: team_schema_1.teams.updatedAt,
            })
                .from(user_team_schema_1.userTeams)
                .innerJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.userId, user.id), (0, drizzle_orm_1.eq)(team_schema_1.teams.isActive, true)));
            console.log('User teams data:', userTeamsData);
            const projectsMap = new Map();
            const commonPermissions = new Set();
            if (userProjectsData && userProjectsData.length > 0) {
                userProjectsData.forEach((row) => {
                    if (row.project && row.project.id) {
                        if (!projectsMap.has(row.project.id)) {
                            projectsMap.set(row.project.id, {
                                ...row.project,
                                teams: [],
                                roles: [],
                            });
                        }
                        if (row.role && row.role.id) {
                            const project = projectsMap.get(row.project.id);
                            let role = project.roles.find((r) => r.id === row.role.id);
                            if (!role) {
                                role = {
                                    ...row.role,
                                    permissions: [],
                                };
                                project.roles.push(role);
                            }
                            if (row.permission && row.permission.id) {
                                if (!role.permissions.includes(row.permission.name)) {
                                    role.permissions.push(row.permission.name);
                                }
                                if (!row.permission.name.includes('DAILY_UPDATE') && !row.permission.name.includes('APPROVE_UPDATES')) {
                                    commonPermissions.add(row.permission.name);
                                }
                            }
                        }
                    }
                });
            }
            if (userTeamsData && userTeamsData.length > 0) {
                userTeamsData.forEach((teamRow) => {
                    for (const project of projectsMap.values()) {
                        const team = {
                            id: teamRow.id,
                            name: teamRow.name,
                            description: teamRow.description,
                            leadId: teamRow.leadId,
                            isActive: teamRow.isActive,
                            createdAt: teamRow.createdAt,
                            updatedAt: teamRow.updatedAt,
                        };
                        const teamExists = project.teams.some((t) => t.id === team.id);
                        if (!teamExists) {
                            project.teams.push(team);
                        }
                    }
                });
            }
            const userProjectsList = Array.from(projectsMap.values());
            console.log('Processed projects:', userProjectsList);
            const { password, ...userWithoutPassword } = user;
            const result = {
                ...userWithoutPassword,
                projects: userProjectsList,
                commonPermissions: Array.from(commonPermissions),
            };
            return result;
        }
        catch (error) {
            console.error('Error in findUserWithCompleteInformation:', error);
            throw error;
        }
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
//# sourceMappingURL=user.repository.js.map