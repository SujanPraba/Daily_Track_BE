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
exports.RoleRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const role_schema_1 = require("../../../database/schemas/role.schema");
const role_permission_schema_1 = require("../../../database/schemas/role-permission.schema");
const permission_schema_1 = require("../../../database/schemas/permission.schema");
let RoleRepository = class RoleRepository {
    constructor(db) {
        this.db = db;
    }
    async create(role) {
        const [result] = await this.db.insert(role_schema_1.roles).values(role).returning();
        return result;
    }
    async findAll() {
        return this.db.select().from(role_schema_1.roles);
    }
    async findById(id) {
        const [result] = await this.db.select().from(role_schema_1.roles).where((0, drizzle_orm_1.eq)(role_schema_1.roles.id, id));
        return result || null;
    }
    async findByName(name) {
        const [result] = await this.db.select().from(role_schema_1.roles).where((0, drizzle_orm_1.eq)(role_schema_1.roles.name, name));
        return result || null;
    }
    async update(id, role) {
        const [result] = await this.db
            .update(role_schema_1.roles)
            .set({ ...role, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(role_schema_1.roles.id, id))
            .returning();
        return result;
    }
    async delete(id) {
        await this.db.delete(role_schema_1.roles).where((0, drizzle_orm_1.eq)(role_schema_1.roles.id, id));
    }
    async assignPermissions(roleId, permissionIds) {
        await this.db.delete(role_permission_schema_1.rolePermissions).where((0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.roleId, roleId));
        const rolePermissionData = permissionIds.map(permissionId => ({
            roleId,
            permissionId,
        }));
        if (rolePermissionData.length > 0) {
            await this.db.insert(role_permission_schema_1.rolePermissions).values(rolePermissionData);
        }
    }
    async getRolePermissions(roleId) {
        return this.db
            .select({
            permission: permission_schema_1.permissions,
        })
            .from(role_permission_schema_1.rolePermissions)
            .innerJoin(permission_schema_1.permissions, (0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.permissionId, permission_schema_1.permissions.id))
            .where((0, drizzle_orm_1.eq)(role_permission_schema_1.rolePermissions.roleId, roleId));
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], RoleRepository);
//# sourceMappingURL=role.repository.js.map