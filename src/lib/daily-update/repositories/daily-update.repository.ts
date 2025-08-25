import { Injectable, Inject } from '@nestjs/common';
import { eq, gte, lte, and, inArray, desc, sql } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { dailyUpdates, DailyUpdate, NewDailyUpdate } from '../../../database/schemas/daily-update.schema';
import { teams } from '../../../database/schemas/team.schema';

@Injectable()
export class DailyUpdateRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(dailyUpdate: NewDailyUpdate): Promise<DailyUpdate> {
    const [result] = await this.db.insert(dailyUpdates).values(dailyUpdate).returning();
    return result;
  }

  async findAll(): Promise<DailyUpdate[]> {
    return this.db.select().from(dailyUpdates);
  }

  async findById(id: string): Promise<DailyUpdate | null> {
    const [result] = await this.db.select().from(dailyUpdates).where(eq(dailyUpdates.id, id));
    return result || null;
  }

  async findByUser(userId: string): Promise<DailyUpdate[]> {
    return this.db.select().from(dailyUpdates).where(eq(dailyUpdates.userId, userId));
  }

  async findByProject(projectId: string): Promise<DailyUpdate[]> {
    return this.db.select().from(dailyUpdates).where(eq(dailyUpdates.projectId, projectId));
  }

  async findByStatus(status: string): Promise<DailyUpdate[]> {
    return this.db.select().from(dailyUpdates).where(eq(dailyUpdates.status, status));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<DailyUpdate[]> {
    return this.db
      .select()
      .from(dailyUpdates)
      .where(and(
        gte(dailyUpdates.date, startDate),
        lte(dailyUpdates.date, endDate)
      ));
  }

  async update(id: string, dailyUpdate: Partial<NewDailyUpdate>): Promise<DailyUpdate> {
    const [result] = await this.db
      .update(dailyUpdates)
      .set({ ...dailyUpdate, updatedAt: new Date() })
      .where(eq(dailyUpdates.id, id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(dailyUpdates).where(eq(dailyUpdates.id, id));
  }

  async searchWithPagination(
    criteria: any,
    limit: number,
    offset: number
  ): Promise<any[]> {
    let whereConditions: any[] = [];

    if (criteria.userId) {
      whereConditions.push(eq(dailyUpdates.userId, criteria.userId));
    }

    if (criteria.projectId) {
      if (Array.isArray(criteria.projectId)) {
        whereConditions.push(inArray(dailyUpdates.projectId, criteria.projectId));
      } else {
        whereConditions.push(eq(dailyUpdates.projectId, criteria.projectId));
      }
    }

    if (criteria.teamId) {
      whereConditions.push(eq(dailyUpdates.teamId, criteria.teamId));
    }

    if (criteria.status) {
      whereConditions.push(eq(dailyUpdates.status, criteria.status));
    }

    if (criteria.tickets) {
      whereConditions.push(sql`${dailyUpdates.tickets}::text ILIKE ${`%${criteria.tickets}%`}`);
    }

    if (criteria.startDate && criteria.endDate) {
      whereConditions.push(
        and(
          gte(dailyUpdates.date, criteria.startDate),
          lte(dailyUpdates.date, criteria.endDate)
        )
      );
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    return this.db
      .select({
        id: dailyUpdates.id,
        userId: dailyUpdates.userId,
        projectId: dailyUpdates.projectId,
        teamId: dailyUpdates.teamId,
        date: dailyUpdates.date,
        tickets: dailyUpdates.tickets,
        ticketsHours: dailyUpdates.ticketsHours,
        internalMeetingHours: dailyUpdates.internalMeetingHours,
        externalMeetingHours: dailyUpdates.externalMeetingHours,
        otherActivities: dailyUpdates.otherActivities,
        otherActivityHours: dailyUpdates.otherActivityHours,
        leavePermissionHours: dailyUpdates.leavePermissionHours,
        totalHours: dailyUpdates.totalHours,
        notes: dailyUpdates.notes,
        status: dailyUpdates.status,
        submittedAt: dailyUpdates.submittedAt,
        approvedAt: dailyUpdates.approvedAt,
        approvedBy: dailyUpdates.approvedBy,
        createdAt: dailyUpdates.createdAt,
        updatedAt: dailyUpdates.updatedAt,
        teamName: teams.name,
        teamDescription: teams.description,
      })
      .from(dailyUpdates)
      .leftJoin(teams, eq(dailyUpdates.projectId, teams.projectId))
      .where(whereClause)
      .orderBy(desc(dailyUpdates.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async countWithCriteria(criteria: any): Promise<number> {
    let whereConditions: any[] = [];

    if (criteria.userId) {
      whereConditions.push(eq(dailyUpdates.userId, criteria.userId));
    }

    if (criteria.projectId) {
      if (Array.isArray(criteria.projectId)) {
        whereConditions.push(inArray(dailyUpdates.projectId, criteria.projectId));
      } else {
        whereConditions.push(eq(dailyUpdates.projectId, criteria.projectId));
      }
    }

    if (criteria.teamId) {
      whereConditions.push(eq(dailyUpdates.teamId, criteria.teamId));
    }

    if (criteria.status) {
      whereConditions.push(eq(dailyUpdates.status, criteria.status));
    }

    if (criteria.tickets) {
      whereConditions.push(sql`${dailyUpdates.tickets}::text ILIKE ${`%${criteria.tickets}%`}`);
    }

    if (criteria.startDate && criteria.endDate) {
      whereConditions.push(
        and(
          gte(dailyUpdates.date, criteria.startDate),
          lte(dailyUpdates.date, criteria.endDate)
        )
      );
    }

    const whereClause = whereConditions.length > 0 ? and(...whereConditions) : undefined;

    const result = await this.db
      .select({ count: sql`count(*)` })
      .from(dailyUpdates)
      .leftJoin(teams, eq(dailyUpdates.projectId, teams.projectId))
      .where(whereClause);

    return Number(result[0]?.count || 0);
  }

  async getTeamByProject(projectId: string): Promise<{ id: string; name: string; description: string | null } | null> {
    const [result] = await this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
      })
      .from(teams)
      .where(eq(teams.projectId, projectId));

    return result || null;
  }

  async getTeamById(teamId: string): Promise<{ id: string; name: string; description: string | null } | null> {
    const [result] = await this.db
      .select({
        id: teams.id,
        name: teams.name,
        description: teams.description,
      })
      .from(teams)
      .where(eq(teams.id, teamId));

    return result || null;
  }

  async findDailyUpdatesWithTeamInfo(startDate: Date, endDate: Date, projectId?: string, teamId?: string): Promise<any[]> {
    let whereConditions: any[] = [
      gte(dailyUpdates.date, startDate),
      lte(dailyUpdates.date, endDate)
    ];

    if (projectId) {
      whereConditions.push(eq(dailyUpdates.projectId, projectId));
    }

    if (teamId) {
      whereConditions.push(eq(dailyUpdates.teamId, teamId));
    }

    return this.db
      .select({
        id: dailyUpdates.id,
        userId: dailyUpdates.userId,
        projectId: dailyUpdates.projectId,
        teamId: dailyUpdates.teamId,
        date: dailyUpdates.date,
        tickets: dailyUpdates.tickets,
        // ticketsHours: dailyUpdates.ticketsHours, // Temporarily commented out until migration is run
        internalMeetingHours: dailyUpdates.internalMeetingHours,
        externalMeetingHours: dailyUpdates.externalMeetingHours,
        otherActivities: dailyUpdates.otherActivities,
        otherActivityHours: dailyUpdates.otherActivityHours,
        // leavePermissionHours: dailyUpdates.leavePermissionHours, // Temporarily commented out until migration is run
        totalHours: dailyUpdates.totalHours,
        notes: dailyUpdates.notes,
        status: dailyUpdates.status,
        submittedAt: dailyUpdates.submittedAt,
        approvedAt: dailyUpdates.approvedAt,
        approvedBy: dailyUpdates.approvedBy,
        createdAt: dailyUpdates.createdAt,
        updatedAt: dailyUpdates.updatedAt,
        teamName: teams.name,
        teamDescription: teams.description,
      })
      .from(dailyUpdates)
      .leftJoin(teams, eq(dailyUpdates.teamId, teams.id))
      .where(and(...whereConditions))
      .orderBy(desc(dailyUpdates.date));
  }
}