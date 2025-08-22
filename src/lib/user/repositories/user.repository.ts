import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { users, User, NewUser } from '../../../database/schemas/user.schema';
import { userProjects } from '../../../database/schemas/user-project.schema';
import { userTeams } from '../../../database/schemas/user-team.schema';
import { userRoles } from '../../../database/schemas/user-role.schema';
import { projects } from '../../../database/schemas/project.schema';
import { teams } from '../../../database/schemas/team.schema';
import { roles } from '../../../database/schemas/role.schema';

@Injectable()
export class UserRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(user: NewUser): Promise<User> {
    const [result] = await this.db.insert(users).values(user).returning();
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  async findAll(): Promise<User[]> {
    const result = await this.db.select().from(users);
    return result.map(({ password, ...user }) => user);
  }

  async findById(id: string): Promise<User | null> {
    const [result] = await this.db.select().from(users).where(eq(users.id, id));
    if (!result) return null;
    const { password, ...user } = result;
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [result] = await this.db.select().from(users).where(eq(users.email, email));
    return result || null;
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

  async assignToProject(userId: string, projectId: string): Promise<void> {
    await this.db.insert(userProjects).values({ userId, projectId });
  }

  async assignToTeam(userId: string, teamId: string): Promise<void> {
    await this.db.insert(userTeams).values({ userId, teamId });
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    await this.db.insert(userRoles).values({ userId, roleId });
  }

  async getUserProjects(userId: string) {
    return this.db
      .select({ project: projects })
      .from(userProjects)
      .innerJoin(projects, eq(userProjects.projectId, projects.id))
      .where(eq(userProjects.userId, userId));
  }

  async getUserTeams(userId: string) {
    return this.db
      .select({ team: teams })
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
}