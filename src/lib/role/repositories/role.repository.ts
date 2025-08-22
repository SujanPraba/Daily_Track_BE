import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { roles, Role, NewRole } from '../../../database/schemas/role.schema';
import { rolePermissions } from '../../../database/schemas/role-permission.schema';
import { permissions } from '../../../database/schemas/permission.schema';

@Injectable()
export class RoleRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(role: NewRole): Promise<Role> {
    const [result] = await this.db.insert(roles).values(role).returning();
    return result;
  }

  async findAll(): Promise<Role[]> {
    return this.db.select().from(roles);
  }

  async findById(id: string): Promise<Role | null> {
    const [result] = await this.db.select().from(roles).where(eq(roles.id, id));
    return result || null;
  }

  async findByName(name: string): Promise<Role | null> {
    const [result] = await this.db.select().from(roles).where(eq(roles.name, name));
    return result || null;
  }

  async update(id: string, role: Partial<NewRole>): Promise<Role> {
    const [result] = await this.db
      .update(roles)
      .set({ ...role, updatedAt: new Date() })
      .where(eq(roles.id, id))
      .returning();
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(roles).where(eq(roles.id, id));
  }

  async assignPermissions(roleId: string, permissionIds: string[]): Promise<void> {
    // Remove existing permissions
    await this.db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
    
    // Add new permissions
    const rolePermissionData = permissionIds.map(permissionId => ({
      roleId,
      permissionId,
    }));
    
    if (rolePermissionData.length > 0) {
      await this.db.insert(rolePermissions).values(rolePermissionData);
    }
  }

  async getRolePermissions(roleId: string) {
    return this.db
      .select({
        permission: permissions,
      })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(eq(rolePermissions.roleId, roleId));
  }
}