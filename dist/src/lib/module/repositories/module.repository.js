"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const module_schema_1 = require("../../../database/schemas/module.schema");
const permission_schema_1 = require("../../../database/schemas/permission.schema");
let ModuleRepository = class ModuleRepository {
    constructor(db) {
        this.db = db;
    }
    async create(module) {
        const [result] = await this.db.insert(module_schema_1.modules).values(module).returning();
        return result;
    }
    async findAll() {
        return this.db.select().from(module_schema_1.modules);
    }
    async searchModules(searchDto) {
        const { searchTerm, page = 1, limit = 10, isActive } = searchDto;
        const offset = (page - 1) * limit;
        const whereConditions = [];
        if (searchTerm) {
            whereConditions.push((0, drizzle_orm_1.or)((0, drizzle_orm_1.like)(module_schema_1.modules.name, `%${searchTerm}%`), (0, drizzle_orm_1.like)(module_schema_1.modules.code, `%${searchTerm}%`)));
        }
        if (isActive !== undefined) {
            whereConditions.push((0, drizzle_orm_1.eq)(module_schema_1.modules.isActive, isActive));
        }
        const countQuery = this.db
            .select({ count: (0, drizzle_orm_1.sql) `count(*)` })
            .from(module_schema_1.modules);
        if (whereConditions.length > 0) {
            countQuery.where((0, drizzle_orm_1.and)(...whereConditions));
        }
        const [{ count }] = await countQuery;
        const total = Number(count);
        const query = this.db
            .select()
            .from(module_schema_1.modules)
            .orderBy((0, drizzle_orm_1.desc)(module_schema_1.modules.createdAt))
            .limit(limit)
            .offset(offset);
        if (whereConditions.length > 0) {
            query.where((0, drizzle_orm_1.and)(...whereConditions));
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
    async findById(id) {
        const [result] = await this.db.select().from(module_schema_1.modules).where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id));
        return result || null;
    }
    async findByIdWithPermissions(id) {
        const [module] = await this.db.select().from(module_schema_1.modules).where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id));
        if (!module) {
            return null;
        }
        const modulePermissions = await this.db
            .select()
            .from(permission_schema_1.permissions)
            .where((0, drizzle_orm_1.eq)(permission_schema_1.permissions.moduleId, id))
            .orderBy(permission_schema_1.permissions.name);
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
    async findByCode(code) {
        const [result] = await this.db.select().from(module_schema_1.modules).where((0, drizzle_orm_1.eq)(module_schema_1.modules.code, code));
        return result || null;
    }
    async findActive() {
        return this.db.select().from(module_schema_1.modules).where((0, drizzle_orm_1.eq)(module_schema_1.modules.isActive, true)).orderBy(module_schema_1.modules.name);
    }
    async findAllWithActivePermissions() {
        const allModules = await this.db
            .select()
            .from(module_schema_1.modules)
            .orderBy(module_schema_1.modules.name);
        const allPermissions = await this.db
            .select()
            .from(permission_schema_1.permissions)
            .where((0, drizzle_orm_1.eq)(permission_schema_1.permissions.isActive, true))
            .orderBy(permission_schema_1.permissions.name);
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
    async update(id, module) {
        const [result] = await this.db
            .update(module_schema_1.modules)
            .set({ ...module, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id))
            .returning();
        return result;
    }
    async updateWithPermissions(id, moduleData, permissionsData) {
        const [updatedModule] = await this.db
            .update(module_schema_1.modules)
            .set({ ...moduleData, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id))
            .returning();
        if (permissionsData && permissionsData.length > 0) {
            const existingPermissions = await this.db
                .select()
                .from(permission_schema_1.permissions)
                .where((0, drizzle_orm_1.eq)(permission_schema_1.permissions.moduleId, id));
            for (const permissionData of permissionsData) {
                const existingPermission = existingPermissions.find(p => p.name === permissionData.name);
                if (existingPermission) {
                    await this.db
                        .update(permission_schema_1.permissions)
                        .set({
                        description: permissionData.description,
                        isActive: permissionData.isActive ?? true,
                        updatedAt: new Date()
                    })
                        .where((0, drizzle_orm_1.eq)(permission_schema_1.permissions.id, existingPermission.id));
                }
                else {
                    await this.db
                        .insert(permission_schema_1.permissions)
                        .values({
                        name: permissionData.name,
                        description: permissionData.description,
                        moduleId: id,
                        isActive: permissionData.isActive ?? true
                    });
                }
            }
        }
        return this.findByIdWithPermissions(id);
    }
    async delete(id) {
        await this.db.delete(module_schema_1.modules).where((0, drizzle_orm_1.eq)(module_schema_1.modules.id, id));
    }
};
exports.ModuleRepository = ModuleRepository;
exports.ModuleRepository = ModuleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ModuleRepository);
//# sourceMappingURL=module.repository.js.map