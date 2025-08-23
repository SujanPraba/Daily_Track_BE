import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, asc, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { projects, Project, NewProject } from '../../../database/schemas/project.schema';
import { projectRoles } from '../../../database/schemas/project-role.schema';
import { roles } from '../../../database/schemas/role.schema';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
import { teams } from '../../../database/schemas/team.schema';
import { permissions } from '../../../database/schemas/permission.schema';
import { rolePermissions } from '../../../database/schemas/role-permission.schema';
import { modules } from '../../../database/schemas/module.schema';
import { users } from '../../../database/schemas/user.schema';
import { userTeams } from '../../../database/schemas/user-team.schema';
import { userProjects } from '../../../database/schemas/user-project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(project: NewProject): Promise<Project> {
    const [result] = await this.db.insert(projects).values(project).returning();
    return result;
  }

  async assignRoles(projectId: string, roleIds: string[]): Promise<void> {
    // Remove existing role assignments
    await this.db.delete(projectRoles).where(eq(projectRoles.projectId, projectId));
    
    // Add new role assignments
    const projectRoleData = roleIds.map(roleId => ({
      projectId,
      roleId,
    }));
    
    if (projectRoleData.length > 0) {
      await this.db.insert(projectRoles).values(projectRoleData);
    }
  }

  async getProjectRoles(projectId: string) {
    return this.db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        level: roles.level,
        isActive: roles.isActive,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .from(projectRoles)
      .innerJoin(roles, eq(projectRoles.roleId, roles.id))
      .where(eq(projectRoles.projectId, projectId))
      .orderBy(roles.name);
  }

  async findAll(): Promise<any[]> {
    const projectsData = await this.db.select().from(projects);
    
    // Get roles and teams for each project
    const projectsWithRolesAndTeams = await Promise.all(
      projectsData.map(async (project) => {
        // Get roles for this project
        const projectRolesData = await this.db
          .select({
            id: roles.id,
            name: roles.name,
            description: roles.description,
            level: roles.level,
            isActive: roles.isActive,
            createdAt: roles.createdAt,
            updatedAt: roles.updatedAt,
          })
          .from(projectRoles)
          .innerJoin(roles, eq(projectRoles.roleId, roles.id))
          .where(eq(projectRoles.projectId, project.id));

        // Get teams for this project
        const projectTeamsData = await this.db
          .select({
            id: teams.id,
            name: teams.name,
            description: teams.description,
            leadId: teams.leadId,
            isActive: teams.isActive,
            createdAt: teams.createdAt,
            updatedAt: teams.updatedAt,
          })
          .from(teams)
          .where(eq(teams.projectId, project.id))
          .orderBy(teams.name);

        return {
          ...project,
          roles: projectRolesData,
          teams: projectTeamsData,
        };
      })
    );

    return projectsWithRolesAndTeams;
  }

  async findById(id: string): Promise<any> {
    const [project] = await this.db.select().from(projects).where(eq(projects.id, id));
    if (!project) return null;

    // Get roles for this project
    const projectRolesData = await this.db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        level: roles.level,
        isActive: roles.isActive,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .from(projectRoles)
      .innerJoin(roles, eq(projectRoles.roleId, roles.id))
      .where(eq(projectRoles.projectId, id));

    // Get teams for this project
    const projectTeamsData = await this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        leadId: teams.leadId,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .where(eq(teams.projectId, id))
      .orderBy(teams.name);

    return {
      ...project,
      roles: projectRolesData,
      teams: projectTeamsData,
    };
  }

  async findByCode(code: string): Promise<any> {
    const [project] = await this.db.select().from(projects).where(eq(projects.code, code));
    if (!project) return null;

    // Get roles for this project
    const projectRolesData = await this.db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        level: roles.level,
        isActive: roles.isActive,
        createdAt: roles.createdAt,
        updatedAt: roles.updatedAt,
      })
      .from(projectRoles)
      .innerJoin(roles, eq(projectRoles.roleId, roles.id))
      .where(eq(projectRoles.projectId, project.id));

    // Get teams for this project
    const projectTeamsData = await this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        leadId: teams.leadId,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .where(eq(teams.projectId, project.id))
      .orderBy(teams.name);

    return {
      ...project,
      roles: projectRolesData,
      teams: projectTeamsData,
    };
  }

  async findByManager(managerId: string): Promise<any[]> {
    const projectsData = await this.db.select().from(projects).where(eq(projects.managerId, managerId));
    
    // Get roles and teams for each project
    const projectsWithRolesAndTeams = await Promise.all(
      projectsData.map(async (project) => {
        // Get roles for this project
        const projectRolesData = await this.db
          .select({
            id: roles.id,
            name: roles.name,
            description: roles.description,
            level: roles.level,
            isActive: roles.isActive,
            createdAt: roles.createdAt,
            updatedAt: roles.updatedAt,
          })
          .from(projectRoles)
          .innerJoin(roles, eq(projectRoles.roleId, roles.id))
          .where(eq(projectRoles.projectId, project.id));

        // Get teams for this project
        const projectTeamsData = await this.db
          .select({
            id: teams.id,
            name: teams.name,
            description: teams.description,
            leadId: teams.leadId,
            isActive: teams.isActive,
            createdAt: teams.createdAt,
            updatedAt: teams.updatedAt,
          })
          .from(teams)
          .where(eq(teams.projectId, project.id))
          .orderBy(teams.name);

        return {
          ...project,
          roles: projectRolesData,
          teams: projectTeamsData,
        };
      })
    );

    return projectsWithRolesAndTeams;
  }

  async findByStatus(status: string): Promise<any[]> {
    const projectsData = await this.db.select().from(projects).where(eq(projects.status, status));
    
    // Get roles and teams for each project
    const projectsWithRolesAndTeams = await Promise.all(
      projectsData.map(async (project) => {
        // Get roles for this project
        const projectRolesData = await this.db
          .select({
            id: roles.id,
            name: roles.name,
            description: roles.description,
            level: roles.level,
            isActive: roles.isActive,
            createdAt: roles.createdAt,
            updatedAt: roles.updatedAt,
          })
          .from(projectRoles)
          .innerJoin(roles, eq(projectRoles.roleId, roles.id))
          .where(eq(projectRoles.projectId, project.id));

        // Get teams for this project
        const projectTeamsData = await this.db
          .select({
            id: teams.id,
            name: teams.name,
            description: teams.description,
            leadId: teams.leadId,
            isActive: teams.isActive,
            createdAt: teams.createdAt,
            updatedAt: teams.updatedAt,
          })
          .from(teams)
          .where(eq(teams.projectId, project.id))
          .orderBy(teams.name);

        return {
          ...project,
          roles: projectRolesData,
          teams: projectTeamsData,
        };
      })
    );

    return projectsWithRolesAndTeams;
  }

  async searchProjects(searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto> {
    const { searchTerm, page = 1, limit = 10, status, managerId } = searchDto;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [];

    if (searchTerm) {
      whereConditions.push(like(projects.name, `%${searchTerm}%`));
    }

    if (status) {
      whereConditions.push(eq(projects.status, status));
    }

    if (managerId) {
      whereConditions.push(eq(projects.managerId, managerId));
    }

    // Get total count
    const countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(projects);

    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;
    const total = Number(count);

    // Get paginated results
    const query = this.db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(limit)
      .offset(offset);

    if (whereConditions.length > 0) {
      query.where(and(...whereConditions));
    }

    const projectsData = await query;

    // Get roles and teams for each project
    const projectsWithRolesAndTeams = await Promise.all(
      projectsData.map(async (project) => {
        // Get roles for this project
        const projectRolesData = await this.db
          .select({
            id: roles.id,
            name: roles.name,
            description: roles.description,
            level: roles.level,
            isActive: roles.isActive,
            createdAt: roles.createdAt,
            updatedAt: roles.updatedAt,
          })
          .from(projectRoles)
          .innerJoin(roles, eq(projectRoles.roleId, roles.id))
          .where(eq(projectRoles.projectId, project.id));

        // Get teams for this project
        const projectTeamsData = await this.db
          .select({
            id: teams.id,
            name: teams.name,
            description: teams.description,
            leadId: teams.leadId,
            isActive: teams.isActive,
            createdAt: teams.createdAt,
            updatedAt: teams.updatedAt,
          })
          .from(teams)
          .where(eq(teams.projectId, project.id))
          .orderBy(teams.name);

        return {
          ...project,
          roles: projectRolesData,
          teams: projectTeamsData,
        };
      })
    );

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

  async update(id: string, project: Partial<NewProject>): Promise<Project> {
    const [result] = await this.db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(projects).where(eq(projects.id, id));
  }

  async findAllWithPermissions(): Promise<any[]> {
    const projectsData = await this.db.select().from(projects);
    
    // Get roles, teams, and permissions for each project
    const projectsWithRolesTeamsAndPermissions = await Promise.all(
      projectsData.map(async (project) => {
        // Get roles with permissions for this project
        const projectRolesData = await this.db
          .select({
            role: {
              id: roles.id,
              name: roles.name,
              description: roles.description,
              level: roles.level,
              isActive: roles.isActive,
              createdAt: roles.createdAt,
              updatedAt: roles.updatedAt,
            },
            permission: {
              id: permissions.id,
              name: permissions.name,
              description: permissions.description,
              moduleId: permissions.moduleId,
              isActive: permissions.isActive,
              createdAt: permissions.createdAt,
              updatedAt: permissions.updatedAt,
            },
            module: {
              id: modules.id,
              name: modules.name,
              code: modules.code,
            }
          })
          .from(projectRoles)
          .innerJoin(roles, eq(projectRoles.roleId, roles.id))
          .leftJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
          .leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
          .leftJoin(modules, eq(permissions.moduleId, modules.id))
          .where(eq(projectRoles.projectId, project.id));

        // Get teams with users for this project
        const projectTeamsData = await this.db
          .select({
            team: {
              id: teams.id,
              name: teams.name,
              description: teams.description,
              leadId: teams.leadId,
              isActive: teams.isActive,
              createdAt: teams.createdAt,
              updatedAt: teams.updatedAt,
            },
            user: {
              id: users.id,
              firstName: users.firstName,
              lastName: users.lastName,
              email: users.email,
              department: users.department,
              position: users.position,
              employeeId: users.employeeId,
              isActive: users.isActive,
              createdAt: users.createdAt,
              updatedAt: users.updatedAt,
            }
          })
          .from(teams)
          .leftJoin(userTeams, eq(teams.id, userTeams.teamId))
          .leftJoin(users, eq(userTeams.userId, users.id))
          .where(eq(teams.projectId, project.id))
          .orderBy(teams.name);

        // Process roles and permissions
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
              
              // Check if permission already exists
              const permissionExists = role.permissions.some(
                (p: any) => p.id === permission.id
              );
              
              if (!permissionExists) {
                role.permissions.push(permission);
              }
            }
          }
        });

        const processedRoles = Array.from(rolesMap.values());

        // Process teams and users
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
              
              // Check if user already exists in this team
              const userExists = team.users.some(
                (u: any) => u.id === user.id
              );
              
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
      })
    );

    return projectsWithRolesTeamsAndPermissions;
  }

  async getProjectUsers(projectId: string) {
    // Get users assigned to this project with their roles
    const projectUsersData = await this.db
      .select({
        user: {
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          email: users.email,
          department: users.department,
          position: users.position,
          employeeId: users.employeeId,
          isActive: users.isActive,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
        role: {
          id: roles.id,
          name: roles.name,
          description: roles.description,
          level: roles.level,
          isActive: roles.isActive,
        },
        team: {
          id: teams.id,
          name: teams.name,
          description: teams.description,
        }
      })
      .from(userProjects)
      .innerJoin(users, eq(userProjects.userId, users.id))
      .innerJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(users.id, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .where(eq(userProjects.projectId, projectId))
      .orderBy(users.firstName, users.lastName);

    // Process users and their roles/teams
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
        
        // Add role if it doesn't exist
        if (row.role && row.role.id) {
          const roleExists = user.projectRoles.some(
            (r: any) => r.id === row.role.id
          );
          if (!roleExists) {
            user.projectRoles.push(row.role);
          }
        }
        
        // Add team if it doesn't exist
        if (row.team && row.team.id) {
          const teamExists = user.teams.some(
            (t: any) => t.id === row.team.id
          );
          if (!teamExists) {
            user.teams.push(row.team);
          }
        }
      }
    });

    return Array.from(usersMap.values());
  }
}