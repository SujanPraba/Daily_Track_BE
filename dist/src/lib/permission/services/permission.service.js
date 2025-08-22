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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const permission_repository_1 = require("../repositories/permission.repository");
let PermissionService = class PermissionService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        const existingPermission = await this.permissionRepository.findByName(createPermissionDto.name);
        if (existingPermission) {
            throw new common_1.BadRequestException('Permission with this name already exists');
        }
        return this.permissionRepository.create(createPermissionDto);
    }
    async findAll() {
        return this.permissionRepository.findAll();
    }
    async findOne(id) {
        const permission = await this.permissionRepository.findById(id);
        if (!permission) {
            throw new common_1.NotFoundException('Permission not found');
        }
        return permission;
    }
    async update(id, updatePermissionDto) {
        const permission = await this.findOne(id);
        return this.permissionRepository.update(id, updatePermissionDto);
    }
    async remove(id) {
        const permission = await this.findOne(id);
        await this.permissionRepository.delete(id);
    }
    async findByModule(module) {
        return this.permissionRepository.findByModule(module);
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_repository_1.PermissionRepository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map