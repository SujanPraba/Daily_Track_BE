import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, sql, or } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { users, User, NewUser } from '../../../database/schemas/user.schema';
import { userProjects } from '../../../database/schemas/user-project.schema';
import { userTeams } from '../../../database/schemas/user-team.schema';
import { userRoles } from '../../../database/schemas/user-role.schema';
import { projects } from '../../../database/schemas/project.schema';
import { teams } from '../../../database/schemas/team.schema';
import { roles } from '../../../database/schemas/role.schema';
import { permissions } from '../../../database/schemas/permission.schema';
import { rolePermissions } from '../../../database/schemas/role-permission.schema';
import { SearchUsersDto } from '../dtos/search-users.dto';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { UserWithAssignmentsDto } from '../dtos/user-with-assignments.dto';

@Injectable()
export class UserRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  private processUserWithAssignments(result: any[]): UserWithAssignmentsDto[] {
    // Group results by user and organize project-role assignments
    const userMap = new Map<string, any>();

    result.forEach((row) => {
      const userId = row.user.id;

      if (!userMap.has(userId)) {
        const { password, ...userWithoutPassword } = row.user;
        userMap.set(userId, {
          ...userWithoutPassword,
          projectRoles: [],
          teamIds: new Set<string>(),
        });
      }

      const user = userMap.get(userId);

      // Add project-role assignment if it exists
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

        // Check if this project-role combination already exists
        const exists = user.projectRoles.some(
          (pr: any) => pr.projectId === row.projectId && pr.roleId === row.roleId
        );

        if (!exists) {
          user.projectRoles.push(projectRole);
        }
      }

      // Add team ID if it exists
      if (row.teamId) {
        user.teamIds.add(row.teamId);
      }
    });

    // Convert Set to array and prepare final data
    return Array.from(userMap.values()).map(user => {
      const userDto = new UserWithAssignmentsDto();
      Object.assign(userDto, {
        ...user,
        teamIds: Array.from(user.teamIds),
      });
      return userDto;
    });
  }

  async create(user: NewUser): Promise<User> {
    const [result] = await this.db.insert(users).values(user).returning();
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async findAll(): Promise<UserWithAssignmentsDto[]> {
    const result = await this.db
      .select({
        user: users,
        projectId: userProjects.projectId,
        projectName: projects.name,
        roleId: userProjects.roleId,
        roleName: roles.name,
        teamId: userTeams.teamId,
        teamName: teams.name,
        assignedAt: userProjects.assignedAt,
      })
      .from(users)
      .leftJoin(userProjects, eq(users.id, userProjects.userId))
      .leftJoin(projects, eq(userProjects.projectId, projects.id))
      .leftJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(users.id, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .orderBy(desc(users.createdAt));

    // Process user data with assignments
    return this.processUserWithAssignments(result);
  }

  async searchUsers(searchDto: SearchUsersDto): Promise<PaginatedUsersDto> {
    const { searchTerm, page = 1, limit = 10, department, position } = searchDto;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [];

    if (searchTerm) {
      whereConditions.push(
        or(
          like(users.firstName, `%${searchTerm}%`),
          like(users.lastName, `%${searchTerm}%`),
          like(users.email, `%${searchTerm}%`)
        )
      );
    }

    if (department) {
      whereConditions.push(eq(users.department, department));
    }

    if (position) {
      whereConditions.push(eq(users.position, position));
    }

    // Get total count
    const countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;
    const total = Number(count);

    // Get paginated results with project, role, and team information
    const query = this.db
      .select({
        user: users,
        projectId: userProjects.projectId,
        projectName: projects.name,
        roleId: userProjects.roleId,
        roleName: roles.name,
        teamId: userTeams.teamId,
        teamName: teams.name,
        assignedAt: userProjects.assignedAt,
      })
      .from(users)
      .leftJoin(userProjects, eq(users.id, userProjects.userId))
      .leftJoin(projects, eq(userProjects.projectId, projects.id))
      .leftJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(users.id, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    if (whereConditions.length > 0) {
      query.where(and(...whereConditions));
    }

    const result = await query;

    // Process user data with assignments
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

  async findById(id: string): Promise<UserWithAssignmentsDto | null> {
    const result = await this.db
      .select({
        user: users,
        projectId: userProjects.projectId,
        projectName: projects.name,
        roleId: userProjects.roleId,
        roleName: roles.name,
        teamId: userTeams.teamId,
        teamName: teams.name,
        assignedAt: userProjects.assignedAt,
      })
      .from(users)
      .leftJoin(userProjects, eq(users.id, userProjects.userId))
      .leftJoin(projects, eq(userProjects.projectId, projects.id))
      .leftJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(users.id, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .where(eq(users.id, id));

    if (result.length === 0) return null;

    // Process user data with assignments
    const userData = this.processUserWithAssignments(result);
    return userData[0]; // Return the first (and only) user
  }

  async findByEmailRaw(email: string): Promise<User | null> {
    // This method returns the user with password for authentication
    const [result] = await this.db.select().from(users).where(eq(users.email, email));
    if (!result) return null;
    return result; // Return with password for auth
  }

  async findByEmail(email: string): Promise<UserWithAssignmentsDto | null> {
    const result = await this.db
      .select({
        user: users,
        projectId: userProjects.projectId,
        projectName: projects.name,
        roleId: userProjects.roleId,
        roleName: roles.name,
        teamId: userTeams.teamId,
        teamName: teams.name,
        assignedAt: userProjects.assignedAt,
      })
      .from(users)
      .leftJoin(userProjects, eq(users.id, userProjects.userId))
      .leftJoin(projects, eq(userProjects.projectId, projects.id))
      .leftJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(users.id, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .where(eq(users.email, email));

    if (result.length === 0) return null;

    // Process user data with assignments
    const userData = this.processUserWithAssignments(result);
    return userData[0]; // Return the first (and only) user
  }

  async update(id: string, user: Partial<NewUser>): Promise<User> {
    const [result] = await this.db
      .update(users)
      .set({ ...user, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }

  async assignProjectRoles(userId: string, projectRoleAssignments: Array<{ projectId: string; roleId: string; teamId?: string }>): Promise<void> {
    // Remove existing project assignments for this user
    await this.db.delete(userProjects).where(eq(userProjects.userId, userId));

    // Remove existing team assignments for this user
    await this.db.delete(userTeams).where(eq(userTeams.userId, userId));

    // Add new project-role assignments
    if (projectRoleAssignments.length > 0) {
      const userProjectData = projectRoleAssignments.map(({ projectId, roleId }) => ({
        userId,
        projectId,
        roleId,
      }));

      await this.db.insert(userProjects).values(userProjectData);
    }

    // Add new team assignments for each project
    const teamAssignments = projectRoleAssignments
      .filter(assignment => assignment.teamId)
      .map(assignment => ({
        userId,
        teamId: assignment.teamId!,
      }));

    if (teamAssignments.length > 0) {
      await this.db.insert(userTeams).values(teamAssignments);
    }
  }

  async assignTeam(userId: string, teamId: string): Promise<void> {
    // Remove existing team assignments for this user
    await this.db.delete(userTeams).where(eq(userTeams.userId, userId));

    // Add new team assignment
    await this.db.insert(userTeams).values({ userId, teamId });
  }

  async getUserProjectRoles(userId: string) {
    return this.db
      .select({
        project: projects,
        role: roles,
        team: teams,
        assignedAt: userProjects.assignedAt,
      })
      .from(userProjects)
      .innerJoin(projects, eq(userProjects.projectId, projects.id))
      .innerJoin(roles, eq(userProjects.roleId, roles.id))
      .leftJoin(userTeams, eq(userProjects.userId, userTeams.userId))
      .leftJoin(teams, eq(userTeams.teamId, teams.id))
      .where(eq(userProjects.userId, userId))
      .orderBy(projects.name);
  }

  async getUserTeams(userId: string) {
    return this.db
      .select({
        team: teams,
        assignedAt: userTeams.assignedAt,
      })
      .from(userTeams)
      .innerJoin(teams, eq(userTeams.teamId, teams.id))
      .where(eq(userTeams.userId, userId));
  }

  async getUserRoles(userId: string) {
    return this.db
      .select({ role: roles })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .where(eq(userRoles.userId, userId));
  }

  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    const result = await this.db
      .select({ permissionName: permissions.name })
      .from(userRoles)
      .innerJoin(roles, eq(userRoles.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(and(
        eq(userRoles.userId, userId),
        eq(permissions.name, permissionName),
        eq(permissions.isActive, true),
        eq(roles.isActive, true)
      ));

    return result.length > 0;
  }

  async getUserProjectIds(userId: string): Promise<string[]> {
    const result = await this.db
      .select({ projectId: userProjects.projectId })
      .from(userProjects)
      .where(eq(userProjects.userId, userId));

    return result.map(row => row.projectId);
  }

  async findUserWithCompleteInformation(userId: string): Promise<any> {
    console.log('findUserWithCompleteInformation called with userId:', userId);

    try {
      const [user] = await this.db.select().from(users).where(eq(users.id, userId));
      console.log('User found:', user);

      if (!user) {
        console.log('No user found, returning null');
        return null;
      }

      // Get user projects with roles
      const userProjectsData = await this.db
        .select({
          project: {
            id: projects.id,
            name: projects.name,
            description: projects.description,
            code: projects.code,
            status: projects.status,
            isActive: projects.isActive,
            createdAt: projects.createdAt,
            updatedAt: projects.updatedAt,
          },
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
          }
        })
        .from(userProjects)
        .innerJoin(projects, eq(userProjects.projectId, projects.id))
        .innerJoin(roles, eq(userProjects.roleId, roles.id))
        .leftJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
        .leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
        .where(and(
          eq(userProjects.userId, user.id),
          eq(projects.isActive, true),
          eq(roles.isActive, true)
        ));

      console.log('User projects data:', userProjectsData);

      // Get user teams
      const userTeamsData = await this.db
        .select({
          id: teams.id,
          name: teams.name,
          description: teams.description,
          leadId: teams.leadId,
          isActive: teams.isActive,
          createdAt: teams.createdAt,
          updatedAt: teams.updatedAt,
        })
        .from(userTeams)
        .innerJoin(teams, eq(userTeams.teamId, teams.id))
        .where(and(
          eq(userTeams.userId, user.id),
          eq(teams.isActive, true)
        ));

      console.log('User teams data:', userTeamsData);

      // Process projects and roles with permissions
      const projectsMap = new Map();
      const commonPermissions = new Set<string>();

      // Handle case where user has no projects
      if (userProjectsData && userProjectsData.length > 0) {
        userProjectsData.forEach((row) => {
          if (row.project && row.project.id) {
            // Add project if it doesn't exist
            if (!projectsMap.has(row.project.id)) {
              projectsMap.set(row.project.id, {
                ...row.project,
                teams: [],
                roles: [],
              });
            }

            // Add role with permissions if it doesn't exist
            if (row.role && row.role.id) {
              const project = projectsMap.get(row.project.id);

              // Check if role already exists in this project
              let role = project.roles.find((r: any) => r.id === row.role.id);
              if (!role) {
                role = {
                  ...row.role,
                  permissions: [],
                };
                project.roles.push(role);
              }

              // Add permission if it exists
              if (row.permission && row.permission.id) {
                if (!role.permissions.includes(row.permission.name)) {
                  role.permissions.push(row.permission.name);
                }
                // Add to common permissions if not a Daily Updates permission
                if (!row.permission.name.includes('DAILY_UPDATE') && !row.permission.name.includes('APPROVE_UPDATES')) {
                  commonPermissions.add(row.permission.name);
                }
              }
            }
          }
        });
      }

      // Handle case where user has no teams
      if (userTeamsData && userTeamsData.length > 0) {
        // Add teams to projects
        userTeamsData.forEach((teamRow) => {
          // For now, we'll add teams to all projects since we don't have project-team relationship
          // You might want to adjust this based on your business logic
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

            // Check if team already exists in this project
            const teamExists = project.teams.some((t: any) => t.id === team.id);
            if (!teamExists) {
              project.teams.push(team);
            }
          }
        });
      }

      const userProjectsList = Array.from(projectsMap.values());
      console.log('Processed projects:', userProjectsList);

      // Remove password from user data
      const { password, ...userWithoutPassword } = user;

      const result = {
        ...userWithoutPassword,
        projects: userProjectsList,
        commonPermissions: Array.from(commonPermissions),
      };

      return result;
    } catch (error) {
      console.error('Error in findUserWithCompleteInformation:', error);
      throw error;
    }
  }
}