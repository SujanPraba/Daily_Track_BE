import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { teams, Team, NewTeam } from '../../../database/schemas/team.schema';

@Injectable()
export class TeamRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(team: NewTeam): Promise<Team> {
    const [result] = await this.db.insert(teams).values(team).returning();
    return result;
  }

  async findAll(): Promise<Team[]> {
    return this.db.select().from(teams);
  }

  async findById(id: string): Promise<Team | null> {
    const [result] = await this.db.select().from(teams).where(eq(teams.id, id));
    return result || null;
  }

  async findByProject(projectId: string): Promise<Team[]> {
    return this.db.select().from(teams).where(eq(teams.projectId, projectId));
  }

  async findByLead(leadId: string): Promise<Team[]> {
    return this.db.select().from(teams).where(eq(teams.leadId, leadId));
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