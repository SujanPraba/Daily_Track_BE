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
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const project_schema_1 = require("../../../database/schemas/project.schema");
const project_role_schema_1 = require("../../../database/schemas/project-role.schema");
const role_schema_1 = require("../../../database/schemas/role.schema");
const team_schema_1 = require("../../../database/schemas/team.schema");
const permission_schema_1 = require("../../../database/schemas/permission.schema");
const role_permission_schema_1 = require("../../../database/schemas/role-permission.schema");
const module_schema_1 = require("../../../database/schemas/module.schema");
const user_schema_1 = require("../../../database/schemas/user.schema");
const user_team_schema_1 = require("../../../database/schemas/user-team.schema");
const user_project_schema_1 = require("../../../database/schemas/user-project.schema");
let ProjectRepository = class ProjectRepository {
    constructor(db) {
        this.db = db;
    }
    async create(project) {
        const [result] = await this.db.insert(project_schema_1.projects).values(project).returning();
        return result;
    }
    async assignRoles(projectId, roleIds) {
        await this.db.delete(project_role_schema_1.projectRoles).where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, projectId));
        const projectRoleData = roleIds.map(roleId => ({
            projectId,
            roleId,
        }));
        if (projectRoleData.length > 0) {
            await this.db.insert(project_role_schema_1.projectRoles).values(projectRoleData);
        }
    }
    async getProjectRoles(projectId) {
        return this.db
            .select({
            id: role_schema_1.roles.id,
            name: role_schema_1.roles.name,
            description: role_schema_1.roles.description,
            level: role_schema_1.roles.level,
            isActive: role_schema_1.roles.isActive,
            createdAt: role_schema_1.roles.createdAt,
            updatedAt: role_schema_1.roles.updatedAt,
        })
            .from(project_role_schema_1.projectRoles)
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
            .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, projectId))
            .orderBy(role_schema_1.roles.name);
    }
    async findAll() {
        const projectsData = await this.db.select().from(project_schema_1.projects);
        const projectsWithRolesAndTeams = await Promise.all(projectsData.map(async (project) => {
            const projectRolesData = await this.db
                .select({
                id: role_schema_1.roles.id,
                name: role_schema_1.roles.name,
                description: role_schema_1.roles.description,
                level: role_schema_1.roles.level,
                isActive: role_schema_1.roles.isActive,
                createdAt: role_schema_1.roles.createdAt,
                updatedAt: role_schema_1.roles.updatedAt,
            })
                .from(project_role_schema_1.projectRoles)
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
                .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
            const projectTeamsData = await this.db
                .select({
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
                leadId: team_schema_1.teams.leadId,
                isActive: team_schema_1.teams.isActive,
                createdAt: team_schema_1.teams.createdAt,
                updatedAt: team_schema_1.teams.updatedAt,
            })
                .from(team_schema_1.teams)
                .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
                .orderBy(team_schema_1.teams.name);
            return {
                ...project,
                roles: projectRolesData,
                teams: projectTeamsData,
            };
        }));
        return projectsWithRolesAndTeams;
    }
    async findById(id) {
        const [project] = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id));
        if (!project)
            return null;
        const projectRolesData = await this.db
            .select({
            id: role_schema_1.roles.id,
            name: role_schema_1.roles.name,
            description: role_schema_1.roles.description,
            level: role_schema_1.roles.level,
            isActive: role_schema_1.roles.isActive,
            createdAt: role_schema_1.roles.createdAt,
            updatedAt: role_schema_1.roles.updatedAt,
        })
            .from(project_role_schema_1.projectRoles)
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
            .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, id));
        const projectTeamsData = await this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            leadId: team_schema_1.teams.leadId,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, id))
            .orderBy(team_schema_1.teams.name);
        return {
            ...project,
            roles: projectRolesData,
            teams: projectTeamsData,
        };
    }
    async findByCode(code) {
        const [project] = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.code, code));
        if (!project)
            return null;
        const projectRolesData = await this.db
            .select({
            id: role_schema_1.roles.id,
            name: role_schema_1.roles.name,
            description: role_schema_1.roles.description,
            level: role_schema_1.roles.level,
            isActive: role_schema_1.roles.isActive,
            createdAt: role_schema_1.roles.createdAt,
            updatedAt: role_schema_1.roles.updatedAt,
        })
            .from(project_role_schema_1.projectRoles)
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
            .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
        const projectTeamsData = await this.db
            .select({
            id: team_schema_1.teams.id,
            name: team_schema_1.teams.name,
            description: team_schema_1.teams.description,
            leadId: team_schema_1.teams.leadId,
            isActive: team_schema_1.teams.isActive,
            createdAt: team_schema_1.teams.createdAt,
            updatedAt: team_schema_1.teams.updatedAt,
        })
            .from(team_schema_1.teams)
            .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
            .orderBy(team_schema_1.teams.name);
        return {
            ...project,
            roles: projectRolesData,
            teams: projectTeamsData,
        };
    }
    async findByManager(managerId) {
        const projectsData = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.managerId, managerId));
        const projectsWithRolesAndTeams = await Promise.all(projectsData.map(async (project) => {
            const projectRolesData = await this.db
                .select({
                id: role_schema_1.roles.id,
                name: role_schema_1.roles.name,
                description: role_schema_1.roles.description,
                level: role_schema_1.roles.level,
                isActive: role_schema_1.roles.isActive,
                createdAt: role_schema_1.roles.createdAt,
                updatedAt: role_schema_1.roles.updatedAt,
            })
                .from(project_role_schema_1.projectRoles)
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
                .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
            const projectTeamsData = await this.db
                .select({
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
                leadId: team_schema_1.teams.leadId,
                isActive: team_schema_1.teams.isActive,
                createdAt: team_schema_1.teams.createdAt,
                updatedAt: team_schema_1.teams.updatedAt,
            })
                .from(team_schema_1.teams)
                .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
                .orderBy(team_schema_1.teams.name);
            return {
                ...project,
                roles: projectRolesData,
                teams: projectTeamsData,
            };
        }));
        return projectsWithRolesAndTeams;
    }
    async findByStatus(status) {
        const projectsData = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.status, status));
        const projectsWithRolesAndTeams = await Promise.all(projectsData.map(async (project) => {
            const projectRolesData = await this.db
                .select({
                id: role_schema_1.roles.id,
                name: role_schema_1.roles.name,
                description: role_schema_1.roles.description,
                level: role_schema_1.roles.level,
                isActive: role_schema_1.roles.isActive,
                createdAt: role_schema_1.roles.createdAt,
                updatedAt: role_schema_1.roles.updatedAt,
            })
                .from(project_role_schema_1.projectRoles)
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
                .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
            const projectTeamsData = await this.db
                .select({
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
                leadId: team_schema_1.teams.leadId,
                isActive: team_schema_1.teams.isActive,
                createdAt: team_schema_1.teams.createdAt,
                updatedAt: team_schema_1.teams.updatedAt,
            })
                .from(team_schema_1.teams)
                .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
                .orderBy(team_schema_1.teams.name);
            return {
                ...project,
                roles: projectRolesData,
                teams: projectTeamsData,
            };
        }));
        return projectsWithRolesAndTeams;
    }
    async searchProjects(searchDto) {
        const { searchTerm, page = 1, limit = 10, status, managerId } = searchDto;
        const offset = (page - 1) * limit;
        const whereConditions = [];
        if (searchTerm) {
            whereConditions.push((0, drizzle_orm_1.like)(project_schema_1.projects.name, `%${searchTerm}%`));
        }
        if (status) {
            whereConditions.push((0, drizzle_orm_1.eq)(project_schema_1.projects.status, status));
        }
        if (managerId) {
            whereConditions.push((0, drizzle_orm_1.eq)(project_schema_1.projects.managerId, managerId));
        }
        const countQuery = this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(project_schema_1.projects);
        if (whereConditions.length > 0) {
            countQuery.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const [{ count }] = await countQuery;
        const total = Number(count);
        const query = this.db
            .select()
            .from(project_schema_1.projects)
            .orderBy((0, drizzle_orm_1.desc)(project_schema_1.projects.createdAt))
            .limit(limit)
            .offset(offset);
        if (whereConditions.length > 0) {
            query.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const projectsData = await query;
        const projectsWithRolesAndTeams = await Promise.all(projectsData.map(async (project) => {
            const projectRolesData = await this.db
                .select({
                id: role_schema_1.roles.id,
                name: role_schema_1.roles.name,
                description: role_schema_1.roles.description,
                level: role_schema_1.roles.level,
                isActive: role_schema_1.roles.isActive,
                createdAt: role_schema_1.roles.createdAt,
                updatedAt: role_schema_1.roles.updatedAt,
            })
                .from(project_role_schema_1.projectRoles)
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
                .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
            const projectTeamsData = await this.db
                .select({
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
                leadId: team_schema_1.teams.leadId,
                isActive: team_schema_1.teams.isActive,
                createdAt: team_schema_1.teams.createdAt,
                updatedAt: team_schema_1.teams.updatedAt,
            })
                .from(team_schema_1.teams)
                .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
                .orderBy(team_schema_1.teams.name);
            return {
                ...project,
                roles: projectRolesData,
                teams: projectTeamsData,
            };
        }));
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {
            data: projectsWithRolesAndTeams,
            page,
            limit,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage,
        };
    }
    async update(id, project) {
        const [result] = await this.db
            .update(project_schema_1.projects)
            .set({ ...project, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id))
            .returning();
        return result;
    }
    async delete(id) {
        await this.db.delete(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id));
    }
    async findAllWithPermissions() {
        const projectsData = await this.db.select().from(project_schema_1.projects);
        const projectsWithRolesTeamsAndPermissions = await Promise.all(projectsData.map(async (project) => {
            const projectRolesData = await this.db
                .select({
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
                    moduleId: permission_schema_1.permissions.moduleId,
                    isActive: permission_schema_1.permissions.isActive,
                    createdAt: permission_schema_1.permissions.createdAt,
                    updatedAt: permission_schema_1.permissions.updatedAt,
                },
                module: {
                    id: module_schema_1.modules.id,
                    name: module_schema_1.modules.name,
                    code: module_schema_1.modules.code,
                }
            })
                .from(project_role_schema_1.projectRoles)
                .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.roleId, role_schema_1.roles.id))
                .leftJoin(role_permission_schema_1.rolePermissions, (0, drizzle_orm_1.eq)(role_schema_1.roles.id, role_permission_schema_1.rolePermissions.roleId))
                .leftJoin(permission_schema_1.permissions, (0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.permissionId, permission_schema_1.permissions.id))
                .leftJoin(module_schema_1.modules, (0, drizzle_orm_1.eq)(permission_schema_1.permissions.moduleId, module_schema_1.modules.id))
                .where((0, drizzle_orm_1.eq)(project_role_schema_1.projectRoles.projectId, project.id));
            const projectTeamsData = await this.db
                .select({
                team: {
                    id: team_schema_1.teams.id,
                    name: team_schema_1.teams.name,
                    description: team_schema_1.teams.description,
                    leadId: team_schema_1.teams.leadId,
                    isActive: team_schema_1.teams.isActive,
                    createdAt: team_schema_1.teams.createdAt,
                    updatedAt: team_schema_1.teams.updatedAt,
                },
                user: {
                    id: user_schema_1.users.id,
                    firstName: user_schema_1.users.firstName,
                    lastName: user_schema_1.users.lastName,
                    email: user_schema_1.users.email,
                    department: user_schema_1.users.department,
                    position: user_schema_1.users.position,
                    employeeId: user_schema_1.users.employeeId,
                    isActive: user_schema_1.users.isActive,
                    createdAt: user_schema_1.users.createdAt,
                    updatedAt: user_schema_1.users.updatedAt,
                }
            })
                .from(team_schema_1.teams)
                .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(team_schema_1.teams.id, user_team_schema_1.userTeams.teamId))
                .leftJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.userId, user_schema_1.users.id))
                .where((0, drizzle_orm_1.eq)(team_schema_1.teams.projectId, project.id))
                .orderBy(team_schema_1.teams.name);
            const rolesMap = new Map();
            projectRolesData.forEach((row) => {
                if (row.role && row.role.id) {
                    if (!rolesMap.has(row.role.id)) {
                        rolesMap.set(row.role.id, {
                            ...row.role,
                            permissions: [],
                        });
                    }
                    if (row.permission && row.permission.id) {
                        const role = rolesMap.get(row.role.id);
                        const permission = {
                            ...row.permission,
                            moduleName: row.module?.name || '',
                            moduleCode: row.module?.code || '',
                        };
                        const permissionExists = role.permissions.some((p) => p.id === permission.id);
                        if (!permissionExists) {
                            role.permissions.push(permission);
                        }
                    }
                }
            });
            const processedRoles = Array.from(rolesMap.values());
            const teamsMap = new Map();
            projectTeamsData.forEach((row) => {
                if (row.team && row.team.id) {
                    if (!teamsMap.has(row.team.id)) {
                        teamsMap.set(row.team.id, {
                            ...row.team,
                            users: [],
                        });
                    }
                    if (row.user && row.user.id) {
                        const team = teamsMap.get(row.team.id);
                        const user = {
                            ...row.user,
                        };
                        const userExists = team.users.some((u) => u.id === user.id);
                        if (!userExists) {
                            team.users.push(user);
                        }
                    }
                }
            });
            const processedTeams = Array.from(teamsMap.values());
            return {
                ...project,
                roles: processedRoles,
                teams: processedTeams,
            };
        }));
        return projectsWithRolesTeamsAndPermissions;
    }
    async getProjectUsers(projectId) {
        const projectUsersData = await this.db
            .select({
            user: {
                id: user_schema_1.users.id,
                firstName: user_schema_1.users.firstName,
                lastName: user_schema_1.users.lastName,
                email: user_schema_1.users.email,
                department: user_schema_1.users.department,
                position: user_schema_1.users.position,
                employeeId: user_schema_1.users.employeeId,
                isActive: user_schema_1.users.isActive,
                createdAt: user_schema_1.users.createdAt,
                updatedAt: user_schema_1.users.updatedAt,
            },
            role: {
                id: role_schema_1.roles.id,
                name: role_schema_1.roles.name,
                description: role_schema_1.roles.description,
                level: role_schema_1.roles.level,
                isActive: role_schema_1.roles.isActive,
            },
            team: {
                id: team_schema_1.teams.id,
                name: team_schema_1.teams.name,
                description: team_schema_1.teams.description,
            }
        })
            .from(user_project_schema_1.userProjects)
            .innerJoin(user_schema_1.users, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.userId, user_schema_1.users.id))
            .innerJoin(role_schema_1.roles, (0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.roleId, role_schema_1.roles.id))
            .leftJoin(user_team_schema_1.userTeams, (0, drizzle_orm_1.eq)(user_schema_1.users.id, user_team_schema_1.userTeams.userId))
            .leftJoin(team_schema_1.teams, (0, drizzle_orm_1.eq)(user_team_schema_1.userTeams.teamId, team_schema_1.teams.id))
            .where((0, drizzle_orm_1.eq)(user_project_schema_1.userProjects.projectId, projectId))
            .orderBy(user_schema_1.users.firstName, user_schema_1.users.lastName);
        const usersMap = new Map();
        projectUsersData.forEach((row) => {
            if (row.user && row.user.id) {
                if (!usersMap.has(row.user.id)) {
                    usersMap.set(row.user.id, {
                        ...row.user,
                        projectRoles: [],
                        teams: [],
                    });
                }
                const user = usersMap.get(row.user.id);
                if (row.role && row.role.id) {
                    const roleExists = user.projectRoles.some((r) => r.id === row.role.id);
                    if (!roleExists) {
                        user.projectRoles.push(row.role);
                    }
                }
                if (row.team && row.team.id) {
                    const teamExists = user.teams.some((t) => t.id === row.team.id);
                    if (!teamExists) {
                        user.teams.push(row.team);
                    }
                }
            }
        });
        return Array.from(usersMap.values());
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map