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
exports.ProjectWithRolesAndTeamsDto = exports.ProjectTeamDto = exports.ProjectRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProjectRoleDto {
}
exports.ProjectRoleDto = ProjectRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-role-id' }),
    __metadata("design:type", String)
], ProjectRoleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DEVELOPER' }),
    __metadata("design:type", String)
], ProjectRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Developer role with basic access' }),
    __metadata("design:type", String)
], ProjectRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USER', enum: ['USER', 'MANAGER', 'ADMIN'] }),
    __metadata("design:type", String)
], ProjectRoleDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProjectRoleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectRoleDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectRoleDto.prototype, "updatedAt", void 0);
class ProjectTeamDto {
}
exports.ProjectTeamDto = ProjectTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-team-id' }),
    __metadata("design:type", String)
], ProjectTeamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Frontend Development Team' }),
    __metadata("design:type", String)
], ProjectTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Team responsible for frontend development and UI/UX' }),
    __metadata("design:type", String)
], ProjectTeamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-lead-id' }),
    __metadata("design:type", String)
], ProjectTeamDto.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProjectTeamDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectTeamDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectTeamDto.prototype, "updatedAt", void 0);
class ProjectWithRolesAndTeamsDto {
}
exports.ProjectWithRolesAndTeamsDto = ProjectWithRolesAndTeamsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-project-id' }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'E-Commerce Platform' }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Modern e-commerce platform with microservices architecture' }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ECOM-2024' }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-manager-id' }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "managerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE', enum: ['ACTIVE', 'INACTIVE', 'COMPLETED', 'ON_HOLD'] }),
    __metadata("design:type", String)
], ProjectWithRolesAndTeamsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectWithRolesAndTeamsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-12-31T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectWithRolesAndTeamsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ProjectWithRolesAndTeamsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectWithRolesAndTeamsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], ProjectWithRolesAndTeamsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of roles associated with this project',
        type: [ProjectRoleDto]
    }),
    __metadata("design:type", Array)
], ProjectWithRolesAndTeamsDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of teams associated with this project',
        type: [ProjectTeamDto]
    }),
    __metadata("design:type", Array)
], ProjectWithRolesAndTeamsDto.prototype, "teams", void 0);
//# sourceMappingURL=project-with-roles.dto.js.map