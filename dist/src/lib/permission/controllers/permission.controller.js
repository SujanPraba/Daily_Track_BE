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
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const permission_service_1 = require("../services/permission.service");
const create_permission_dto_1 = require("../dtos/create-permission.dto");
const update_permission_dto_1 = require("../dtos/update-permission.dto");
const search_permissions_dto_1 = require("../dtos/search-permissions.dto");
const paginated_permissions_dto_1 = require("../dtos/paginated-permissions.dto");
const permission_response_dto_1 = require("../dtos/permission-response.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let PermissionController = class PermissionController {
    constructor(permissionService) {
        this.permissionService = permissionService;
    }
    create(createPermissionDto) {
        return this.permissionService.create(createPermissionDto);
    }
    findAll(moduleId) {
        if (moduleId) {
            return this.permissionService.findByModuleId(moduleId);
        }
        return this.permissionService.findAllWithModule();
    }
    searchPermissions(searchDto) {
        return this.permissionService.searchPermissions(searchDto);
    }
    findOne(id) {
        return this.permissionService.findOne(id);
    }
    findOneWithModule(id) {
        return this.permissionService.findOneWithModule(id);
    }
    update(id, updatePermissionDto) {
        return this.permissionService.update(id, updatePermissionDto);
    }
    remove(id) {
        return this.permissionService.remove(id);
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new permission' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Permission created successfully',
        type: permission_response_dto_1.PermissionResponseDto
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all permissions (without pagination)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all permissions',
        type: [permission_response_dto_1.PermissionResponseDto]
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search and get all permissions with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of permissions',
        type: paginated_permissions_dto_1.PaginatedPermissionsDto
    }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_permissions_dto_1.SearchPermissionsDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "searchPermissions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get permission by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permission found',
        type: permission_response_dto_1.PermissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Permission not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get permission by ID with module information' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permission found with module information',
        type: permission_response_dto_1.PermissionResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Permission not found' }),
    (0, common_1.Get)(':id/with-module'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionController.prototype, "findOneWithModule", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update permission' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Permission updated successfully',
        type: permission_response_dto_1.PermissionResponseDto
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete permission' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Permission deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "remove", null);
exports.PermissionController = PermissionController = __decorate([
    (0, swagger_1.ApiTags)('Permissions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map