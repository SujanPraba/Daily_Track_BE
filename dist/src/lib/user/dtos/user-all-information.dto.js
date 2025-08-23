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
exports.UserAllInformationDto = exports.UserProjectDto = exports.UserRoleDto = exports.UserTeamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserTeamDto {
}
exports.UserTeamDto = UserTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team ID' }),
    __metadata("design:type", String)
], UserTeamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team name' }),
    __metadata("design:type", String)
], UserTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team description' }),
    __metadata("design:type", String)
], UserTeamDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team lead ID' }),
    __metadata("design:type", String)
], UserTeamDto.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the team is active' }),
    __metadata("design:type", Boolean)
], UserTeamDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team creation date' }),
    __metadata("design:type", Date)
], UserTeamDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team last update date' }),
    __metadata("design:type", Date)
], UserTeamDto.prototype, "updatedAt", void 0);
class UserRoleDto {
}
exports.UserRoleDto = UserRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID' }),
    __metadata("design:type", String)
], UserRoleDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role name' }),
    __metadata("design:type", String)
], UserRoleDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role description' }),
    __metadata("design:type", String)
], UserRoleDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role level' }),
    __metadata("design:type", String)
], UserRoleDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the role is active' }),
    __metadata("design:type", Boolean)
], UserRoleDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role creation date' }),
    __metadata("design:type", Date)
], UserRoleDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role last update date' }),
    __metadata("design:type", Date)
], UserRoleDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of active permission names assigned to this role',
        type: 'array',
        items: { type: 'string' }
    }),
    __metadata("design:type", Array)
], UserRoleDto.prototype, "permissions", void 0);
class UserProjectDto {
}
exports.UserProjectDto = UserProjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID' }),
    __metadata("design:type", String)
], UserProjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name' }),
    __metadata("design:type", String)
], UserProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project description' }),
    __metadata("design:type", String)
], UserProjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project code' }),
    __metadata("design:type", String)
], UserProjectDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project status' }),
    __metadata("design:type", String)
], UserProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the project is active' }),
    __metadata("design:type", Boolean)
], UserProjectDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project creation date' }),
    __metadata("design:type", Date)
], UserProjectDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project last update date' }),
    __metadata("design:type", Date)
], UserProjectDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of teams in this project',
        type: [UserTeamDto]
    }),
    __metadata("design:type", Array)
], UserProjectDto.prototype, "teams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of roles in this project with Daily Updates permissions only',
        type: [UserRoleDto]
    }),
    __metadata("design:type", Array)
], UserProjectDto.prototype, "roles", void 0);
class UserAllInformationDto {
}
exports.UserAllInformationDto = UserAllInformationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User first name' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last name' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User email' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User phone number' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User department' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User position' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User employee ID' }),
    __metadata("design:type", String)
], UserAllInformationDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether the user is active' }),
    __metadata("design:type", Boolean)
], UserAllInformationDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last login date' }),
    __metadata("design:type", Date)
], UserAllInformationDto.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User creation date' }),
    __metadata("design:type", Date)
], UserAllInformationDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User last update date' }),
    __metadata("design:type", Date)
], UserAllInformationDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of active projects the user is assigned to with teams and Daily Updates roles',
        type: [UserProjectDto]
    }),
    __metadata("design:type", Array)
], UserAllInformationDto.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of common permissions (non-Daily Updates) the user has',
        type: 'array',
        items: { type: 'string' }
    }),
    __metadata("design:type", Array)
], UserAllInformationDto.prototype, "commonPermissions", void 0);
//# sourceMappingURL=user-all-information.dto.js.map