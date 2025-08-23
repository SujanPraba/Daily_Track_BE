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
exports.ProjectRoleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProjectRoleResponseDto {
}
exports.ProjectRoleResponseDto = ProjectRoleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-role-id' }),
    __metadata("design:type", String)
], ProjectRoleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DEVELOPER' }),
    __metadata("design:type", String)
], ProjectRoleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Developer role with basic access' }),
    __metadata("design:type", String)
], ProjectRoleResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USER', enum: ['USER', 'MANAGER', 'ADMIN'] }),
    __metadata("design:type", String)
], ProjectRoleResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProjectRoleResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectRoleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectRoleResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=project-roles-response.dto.js.map