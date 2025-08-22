import { Injectable, Inject } from '@nestjs/common';
import { eq, gte, lte, and } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { dailyUpdates, DailyUpdate, NewDailyUpdate } from '../../../database/schemas/daily-update.schema';

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
}