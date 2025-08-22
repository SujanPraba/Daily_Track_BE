import { Injectable, Inject } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { permissions, Permission, NewPermission } from '../../../database/schemas/permission.schema';

@Injectable()
export class PermissionRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(permission: NewPermission): Promise<Permission> {
    const [result] = await this.db.insert(permissions).values(permission).returning();
    return result;
  }

  async findAll(): Promise<Permission[]> {
    return this.db.select().from(permissions);
  }

  async findById(id: string): Promise<Permission | null> {
    const [result] = await this.db.select().from(permissions).where(eq(permissions.id, id));
    return result || null;
  }

  async findByName(name: string): Promise<Permission | null> {
    const [result] = await this.db.select().from(permissions).where(eq(permissions.name, name));
    return result || null;
  }

  async findByModule(module: string): Promise<Permission[]> {
    return this.db.select().from(permissions).where(eq(permissions.module, module));
  }

  async update(id: string, permission: Partial<NewPermission>): Promise<Permission> {
    const [result] = await this.db
      .update(permissions)
      .set({ ...permission, updatedAt: new Date() })
      .where(eq(permissions.id, id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(permissions).where(eq(permissions.id, id));
  }
}