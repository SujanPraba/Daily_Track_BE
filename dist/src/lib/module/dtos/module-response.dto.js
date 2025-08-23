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
exports.ModuleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const module_permission_dto_1 = require("./module-permission.dto");
class ModuleResponseDto {
}
exports.ModuleResponseDto = ModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module name',
        example: 'User Management'
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module description',
        example: 'Module for managing users, roles, and permissions',
        required: false
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module code (unique identifier)',
        example: 'USER_MGMT'
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether the module is active',
        example: true
    }),
    __metadata("design:type", Boolean)
], ModuleResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module creation date',
        example: '2024-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], ModuleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module last update date',
        example: '2024-01-01T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], ModuleResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of permissions associated with this module',
        type: [module_permission_dto_1.ModulePermissionDto]
    }),
    __metadata("design:type", Array)
], ModuleResponseDto.prototype, "permissions", void 0);
//# sourceMappingURL=module-response.dto.js.map