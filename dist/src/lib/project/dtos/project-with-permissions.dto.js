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
exports.ProjectWithPermissionsDto = exports.TeamDto = exports.UserDto = exports.RoleWithPermissionsDto = exports.PermissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PermissionDto {
}
exports.PermissionDto = PermissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission ID' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission name' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission description' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module ID this permission belongs to' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module name' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "moduleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module code' }),
    __metadata("design:type", String)
], PermissionDto.prototype, "moduleCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the permission is active' }),
    __metadata("design:type", Boolean)
], PermissionDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission creation date' }),
    __metadata("design:type", Date)
], PermissionDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Permission last update date' }),
    __metadata("design:type", Date)
], PermissionDto.prototype, "updatedAt", void 0);
class RoleWithPermissionsDto {
}
exports.RoleWithPermissionsDto = RoleWithPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID' }),
    __metadata("design:type", String)
], RoleWithPermissionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role name' }),
    __metadata("design:type", String)
], RoleWithPermissionsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role description' }),
    __metadata("design:type", String)
], RoleWithPermissionsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role level (USER, MANAGER, ADMIN)' }),
    __metadata("design:type", String)
], RoleWithPermissionsDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the role is active' }),
    __metadata("design:type", Boolean)
], RoleWithPermissionsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role creation date' }),
    __metadata("design:type", Date)
], RoleWithPermissionsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role last update date' }),
    __metadata("design:type", Date)
], RoleWithPermissionsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of permissions assigned to this role',
        type: [PermissionDto]
    }),
    __metadata("design:type", Array)
], RoleWithPermissionsDto.prototype, "permissions", void 0);
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User first name' }),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last name' }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User department' }),
    __metadata("design:type", String)
], UserDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User position' }),
    __metadata("design:type", String)
], UserDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User employee ID' }),
    __metadata("design:type", String)
], UserDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the user is active' }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User creation date' }),
    __metadata("design:type", Date)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last update date' }),
    __metadata("design:type", Date)
], UserDto.prototype, "updatedAt", void 0);
class TeamDto {
}
exports.TeamDto = TeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team ID' }),
    __metadata("design:type", String)
], TeamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team name' }),
    __metadata("design:type", String)
], TeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team description' }),
    __metadata("design:type", String)
], TeamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team lead ID' }),
    __metadata("design:type", String)
], TeamDto.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the team is active' }),
    __metadata("design:type", Boolean)
], TeamDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team creation date' }),
    __metadata("design:type", Date)
], TeamDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team last update date' }),
    __metadata("design:type", Date)
], TeamDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Users assigned to this team',
        type: [UserDto]
    }),
    __metadata("design:type", Array)
], TeamDto.prototype, "users", void 0);
class ProjectWithPermissionsDto {
}
exports.ProjectWithPermissionsDto = ProjectWithPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project description' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project code' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project manager ID' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "managerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project status' }),
    __metadata("design:type", String)
], ProjectWithPermissionsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project start date' }),
    __metadata("design:type", Date)
], ProjectWithPermissionsDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project end date' }),
    __metadata("design:type", Date)
], ProjectWithPermissionsDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the project is active' }),
    __metadata("design:type", Boolean)
], ProjectWithPermissionsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project creation date' }),
    __metadata("design:type", Date)
], ProjectWithPermissionsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project last update date' }),
    __metadata("design:type", Date)
], ProjectWithPermissionsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of roles associated with this project, including their permissions',
        type: [RoleWithPermissionsDto]
    }),
    __metadata("design:type", Array)
], ProjectWithPermissionsDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of teams associated with this project',
        type: [TeamDto]
    }),
    __metadata("design:type", Array)
], ProjectWithPermissionsDto.prototype, "teams", void 0);
//# sourceMappingURL=project-with-permissions.dto.js.map