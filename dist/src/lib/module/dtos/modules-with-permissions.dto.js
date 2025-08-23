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
exports.ModuleWithPermissionsDto = exports.PermissionWithModuleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PermissionWithModuleDto {
}
exports.PermissionWithModuleDto = PermissionWithModuleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission ID' }),
    __metadata("design:type", String)
], PermissionWithModuleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission name' }),
    __metadata("design:type", String)
], PermissionWithModuleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission description', required: false }),
    __metadata("design:type", String)
], PermissionWithModuleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the permission is active' }),
    __metadata("design:type", Boolean)
], PermissionWithModuleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission creation date' }),
    __metadata("design:type", Date)
], PermissionWithModuleDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission last update date' }),
    __metadata("design:type", Date)
], PermissionWithModuleDto.prototype, "updatedAt", void 0);
class ModuleWithPermissionsDto {
}
exports.ModuleWithPermissionsDto = ModuleWithPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module ID' }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module name' }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module description', required: false }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module code' }),
    __metadata("design:type", String)
], ModuleWithPermissionsDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the module is active' }),
    __metadata("design:type", Boolean)
], ModuleWithPermissionsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module creation date' }),
    __metadata("design:type", Date)
], ModuleWithPermissionsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module last update date' }),
    __metadata("design:type", Date)
], ModuleWithPermissionsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of active permissions for this module',
        type: [PermissionWithModuleDto]
    }),
    __metadata("design:type", Array)
], ModuleWithPermissionsDto.prototype, "permissions", void 0);
//# sourceMappingURL=modules-with-permissions.dto.js.map