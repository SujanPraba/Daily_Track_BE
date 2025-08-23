import { Injectable, Inject } from '@nestjs/common';
import { eq, like, and, desc, sql, or } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../../../database/database.module';
import { modules, Module, NewModule } from '../../../database/schemas/module.schema';
import { permissions, Permission } from '../../../database/schemas/permission.schema';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
import { CreateModulePermissionDto } from '../dtos/module-permission.dto';

@Injectable()
export class ModuleRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(module: NewModule): Promise<Module> {
    const [result] = await this.db.insert(modules).values(module).returning();
    return result;
  }

  async findAll(): Promise<Module[]> {
    return this.db.select().from(modules);
  }

  async searchModules(searchDto: SearchModulesDto): Promise<PaginatedModulesDto> {
    const { searchTerm, page = 1, limit = 10, isActive } = searchDto;
    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions: any[] = [];

    if (searchTerm) {
      whereConditions.push(
        or(
          like(modules.name, `%${searchTerm}%`),
          like(modules.code, `%${searchTerm}%`)
        )
      );
    }

    if (isActive !== undefined) {
      whereConditions.push(eq(modules.isActive, isActive));
    }

    // Get total count
    const countQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(modules);

    if (whereConditions.length > 0) {
      countQuery.where(and(...whereConditions));
    }

    const [{ count }] = await countQuery;
    const total = Number(count);

    // Get paginated results
    const query = this.db
      .select()
      .from(modules)
      .orderBy(desc(modules.createdAt))
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

  async findById(id: string): Promise<Module | null> {
    const [result] = await this.db.select().from(modules).where(eq(modules.id, id));
    return result || null;
  }

  async findByIdWithPermissions(id: string): Promise<ModuleResponseDto | null> {
    // Get the module
    const [module] = await this.db.select().from(modules).where(eq(modules.id, id));
    
    if (!module) {
      return null;
    }

    // Get all permissions for this module
    const modulePermissions = await this.db
      .select()
      .from(permissions)
      .where(eq(permissions.moduleId, id))
      .orderBy(permissions.name);

    return {
      id: module.id,
      name: module.name,
      description: module.description,
      code: module.code,
      isActive: module.isActive,
      createdAt: module.createdAt,
      updatedAt: module.updatedAt,
      permissions: modulePermissions.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        isActive: p.isActive
      }))
    };
  }

  async findByCode(code: string): Promise<Module | null> {
    const [result] = await this.db.select().from(modules).where(eq(modules.code, code));
    return result || null;
  }

  async findActive(): Promise<Module[]> {
    return this.db.select().from(modules).where(eq(modules.isActive, true)).orderBy(modules.name);
  }

  async findAllWithActivePermissions(): Promise<any[]> {
    // Get all modules
    const allModules = await this.db
      .select()
      .from(modules)
      .orderBy(modules.name);

    // Get all active permissions grouped by module
    const allPermissions = await this.db
      .select()
      .from(permissions)
      .where(eq(permissions.isActive, true))
      .orderBy(permissions.name);

    // Group permissions by module
    const permissionsByModule = allPermissions.reduce((acc, permission) => {
      if (!acc[permission.moduleId]) {
        acc[permission.moduleId] = [];
      }
      acc[permission.moduleId].push({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        isActive: permission.isActive,
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
      });
      return acc;
    }, {});

    // Map modules with their permissions
    return allModules.map(module => ({
      id: module.id,
      name: module.name,
      description: module.description,
      code: module.code,
      isActive: module.isActive,
      createdAt: module.createdAt,
      updatedAt: module.updatedAt,
      permissions: permissionsByModule[module.id] || []
    }));
  }

  async update(id: string, module: Partial<NewModule>): Promise<Module> {
    const [result] = await this.db
      .update(modules)
      .set({ ...module, updatedAt: new Date() })
      .where(eq(modules.id, id))
      .returning();
    return result;
  }

  async updateWithPermissions(id: string, moduleData: Partial<NewModule>, permissionsData?: CreateModulePermissionDto[]): Promise<ModuleResponseDto> {
    // Update the module
    const [updatedModule] = await this.db
      .update(modules)
      .set({ ...moduleData, updatedAt: new Date() })
      .where(eq(modules.id, id))
      .returning();

    // Update permissions if provided
    if (permissionsData && permissionsData.length > 0) {
      // Get existing permissions for this module
      const existingPermissions = await this.db
        .select()
        .from(permissions)
        .where(eq(permissions.moduleId, id));

      // Update existing permissions and create new ones
      for (const permissionData of permissionsData) {
        const existingPermission = existingPermissions.find(p => p.name === permissionData.name);
        
        if (existingPermission) {
          // Update existing permission
          await this.db
            .update(permissions)
            .set({
              description: permissionData.description,
              isActive: permissionData.isActive ?? true,
              updatedAt: new Date()
            })
            .where(eq(permissions.id, existingPermission.id));
        } else {
          // Create new permission
          await this.db
            .insert(permissions)
            .values({
              name: permissionData.name,
              description: permissionData.description,
              moduleId: id,
              isActive: permissionData.isActive ?? true
            });
        }
      }
    }

    // Return the updated module with permissions
    return this.findByIdWithPermissions(id) as Promise<ModuleResponseDto>;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(modules).where(eq(modules.id, id));
  }
}
