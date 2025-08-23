import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, sql, or } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { permissions, Permission, NewPermission } from '../../../database/schemas/permission.schema';
import { modules } from '../../../database/schemas/module.schema';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';

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

  async findAllWithModule(): Promise<any[]> {
    return this.db
      .select({
        id: permissions.id,
        name: permissions.name,
        description: permissions.description,
        moduleId: permissions.moduleId,
        moduleName: modules.name,
        isActive: permissions.isActive,
        createdAt: permissions.createdAt,
        updatedAt: permissions.updatedAt,
      })
      .from(permissions)
      .leftJoin(modules, eq(permissions.moduleId, modules.id));
  }

  async findByIdWithModule(id: string): Promise<any | null> {
    const [result] = await this.db
      .select({
        id: permissions.id,
        name: permissions.name,
        description: permissions.description,
        moduleId: permissions.moduleId,
        moduleName: modules.name,
        isActive: permissions.isActive,
        createdAt: permissions.createdAt,
        updatedAt: permissions.updatedAt,
      })
      .from(permissions)
      .leftJoin(modules, eq(permissions.moduleId, modules.id))
      .where(eq(permissions.id, id));
    return result || null;
  }

  async searchPermissions(searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto> {
    const { searchTerm, page = 1, limit = 10, moduleId, isActive } = searchDto;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [];

    if (searchTerm) {
      whereConditions.push(
        or(
          like(permissions.name, `%${searchTerm}%`),
          like(modules.name, `%${searchTerm}%`)
        )
      );
    }

    if (moduleId) {
      whereConditions.push(eq(permissions.moduleId, moduleId));
    }

    if (isActive !== undefined) {
      whereConditions.push(eq(permissions.isActive, isActive));
    }

    // Get total count
    const countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(permissions);

    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;
    const total = Number(count);

    // Get paginated results with module information
    const query = this.db
      .select({
        id: permissions.id,
        name: permissions.name,
        description: permissions.description,
        moduleId: permissions.moduleId,
        moduleName: modules.name,
        isActive: permissions.isActive,
        createdAt: permissions.createdAt,
        updatedAt: permissions.updatedAt,
      })
      .from(permissions)
      .leftJoin(modules, eq(permissions.moduleId, modules.id))
      .orderBy(desc(permissions.createdAt))
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

  async findById(id: string): Promise<Permission | null> {
    const [result] = await this.db.select().from(permissions).where(eq(permissions.id, id));
    return result || null;
  }

  async findByName(name: string): Promise<Permission | null> {
    const [result] = await this.db.select().from(permissions).where(eq(permissions.name, name));
    return result || null;
  }

  async findByModuleId(moduleId: string): Promise<Permission[]> {
    return this.db.select().from(permissions).where(eq(permissions.moduleId, moduleId));
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