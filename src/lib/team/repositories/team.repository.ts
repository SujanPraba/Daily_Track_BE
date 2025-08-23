import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { teams, Team, NewTeam } from '../../../database/schemas/team.schema';
import { projects } from '../../../database/schemas/project.schema';
import { users } from '../../../database/schemas/user.schema';
import { userTeams } from '../../../database/schemas/user-team.schema';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';

@Injectable()
export class TeamRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(team: NewTeam): Promise<Team> {
    const [result] = await this.db.insert(teams).values(team).returning();
    return result;
  }

  async findAll(): Promise<TeamResponseDto[]> {
    return this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        projectId: teams.projectId,
        projectName: projects.name,
        leadId: teams.leadId,
        leadName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        userCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${userTeams} 
          WHERE ${userTeams.teamId} = ${teams.id}
        )`,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .leftJoin(projects, eq(teams.projectId, projects.id))
      .leftJoin(users, eq(teams.leadId, users.id));
  }

  async findById(id: string): Promise<TeamResponseDto | null> {
    const [result] = await this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        projectId: teams.projectId,
        projectName: projects.name,
        leadId: teams.leadId,
        leadName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        userCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${userTeams} 
          WHERE ${userTeams.teamId} = ${teams.id}
        )`,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .leftJoin(projects, eq(teams.projectId, projects.id))
      .leftJoin(users, eq(teams.leadId, users.id))
      .where(eq(teams.id, id));
    return result || null;
  }

  async findByProject(projectId: string): Promise<TeamResponseDto[]> {
    return this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        projectId: teams.projectId,
        projectName: projects.name,
        leadId: teams.leadId,
        leadName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        userCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${userTeams} 
          WHERE ${userTeams.teamId} = ${teams.id}
        )`,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .leftJoin(projects, eq(teams.projectId, projects.id))
      .leftJoin(users, eq(teams.leadId, users.id))
      .where(eq(teams.projectId, projectId));
  }

  async findByLead(leadId: string): Promise<TeamResponseDto[]> {
    return this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        projectId: teams.projectId,
        projectName: projects.name,
        leadId: teams.leadId,
        leadName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        userCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${userTeams} 
          WHERE ${userTeams.teamId} = ${teams.id}
        )`,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .leftJoin(projects, eq(teams.projectId, projects.id))
      .leftJoin(users, eq(teams.leadId, users.id))
      .where(eq(teams.leadId, leadId));
  }

  async searchTeams(searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto> {
    const { searchTerm, page = 1, limit = 10, projectId, leadId } = searchDto;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [];

    if (searchTerm) {
      whereConditions.push(like(teams.name, `%${searchTerm}%`));
    }

    if (projectId) {
      whereConditions.push(eq(teams.projectId, projectId));
    }

    if (leadId) {
      whereConditions.push(eq(teams.leadId, leadId));
    }

    // Get total count
    const countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(teams);

    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;
    const total = Number(count);

    // Get paginated results with project name
    const query = this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
        projectId: teams.projectId,
        projectName: projects.name,
        leadId: teams.leadId,
        leadName: sql<string>`CONCAT(${users.firstName}, ' ', ${users.lastName})`,
        userCount: sql<number>`(
          SELECT COUNT(*)::int 
          FROM ${userTeams} 
          WHERE ${userTeams.teamId} = ${teams.id}
        )`,
        isActive: teams.isActive,
        createdAt: teams.createdAt,
        updatedAt: teams.updatedAt,
      })
      .from(teams)
      .leftJoin(projects, eq(teams.projectId, projects.id))
      .leftJoin(users, eq(teams.leadId, users.id))
      .orderBy(desc(teams.createdAt))
      .limit(limit)
      .offset(offset);

    if (whereConditions.length > 0) {
      query.where(and(...whereConditions));
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

  async update(id: string, team: Partial<NewTeam>): Promise<Team> {
    const [result] = await this.db
      .update(teams)
      .set({ ...team, updatedAt: new Date() })
      .where(eq(teams.id, id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(teams).where(eq(teams.id, id));
  }
}