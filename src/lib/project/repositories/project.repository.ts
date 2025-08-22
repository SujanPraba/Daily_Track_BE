import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { projects, Project, NewProject } from '../../../database/schemas/project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(project: NewProject): Promise<Project> {
    const [result] = await this.db.insert(projects).values(project).returning();
    return result;
  }

  async findAll(): Promise<Project[]> {
    return this.db.select().from(projects);
  }

  async findById(id: string): Promise<Project | null> {
    const [result] = await this.db.select().from(projects).where(eq(projects.id, id));
    return result || null;
  }

  async findByCode(code: string): Promise<Project | null> {
    const [result] = await this.db.select().from(projects).where(eq(projects.code, code));
    return result || null;
  }

  async findByManager(managerId: string): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.managerId, managerId));
  }

  async findByStatus(status: string): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.status, status));
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
}