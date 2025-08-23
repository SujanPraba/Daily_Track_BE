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
exports.ModuleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const module_service_1 = require("../services/module.service");
const create_module_dto_1 = require("../dtos/create-module.dto");
const update_module_dto_1 = require("../dtos/update-module.dto");
const search_modules_dto_1 = require("../dtos/search-modules.dto");
const paginated_modules_dto_1 = require("../dtos/paginated-modules.dto");
const module_response_dto_1 = require("../dtos/module-response.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const modules_with_permissions_dto_1 = require("../dtos/modules-with-permissions.dto");
let ModuleController = class ModuleController {
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    create(createModuleDto) {
        return this.moduleService.create(createModuleDto);
    }
    findAll() {
        return this.moduleService.findAll();
    }
    searchModules(searchDto) {
        return this.moduleService.searchModules(searchDto);
    }
    findActive() {
        return this.moduleService.findActive();
    }
    findAllWithPermissions() {
        return this.moduleService.findAllWithActivePermissions();
    }
    findOne(id) {
        return this.moduleService.findOneWithPermissions(id);
    }
    update(id, updateModuleDto) {
        return this.moduleService.updateWithPermissions(id, updateModuleDto);
    }
    remove(id) {
        return this.moduleService.remove(id);
    }
};
exports.ModuleController = ModuleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new module' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Module created successfully' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", void 0)
], ModuleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all modules (without pagination)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all modules' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search and get all modules with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of modules',
        type: paginated_modules_dto_1.PaginatedModulesDto
    }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_modules_dto_1.SearchModulesDto]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "searchModules", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all active modules' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active modules' }),
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuleController.prototype, "findActive", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all modules with their active permissions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all modules with their active permissions',
        type: [modules_with_permissions_dto_1.ModuleWithPermissionsDto]
    }),
    (0, common_1.Get)('with-permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModuleController.prototype, "findAllWithPermissions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get module by ID with permissions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Module found with permissions',
        type: module_response_dto_1.ModuleResponseDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Module not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update module with permissions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Module updated successfully with permissions',
        type: module_response_dto_1.ModuleResponseDto
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", Promise)
], ModuleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete module' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Module deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModuleController.prototype, "remove", null);
exports.ModuleController = ModuleController = __decorate([
    (0, swagger_1.ApiTags)('Modules'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('modules'),
    __metadata("design:paramtypes", [module_service_1.ModuleService])
], ModuleController);
//# sourceMappingURL=module.controller.js.map