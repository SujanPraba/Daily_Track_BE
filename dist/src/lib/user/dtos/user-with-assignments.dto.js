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
exports.UserWithAssignmentsDto = exports.UserProjectRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserProjectRoleDto {
}
exports.UserProjectRoleDto = UserProjectRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID' }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project name' }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role ID' }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Role name' }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "roleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team ID', required: false }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team name', required: false }),
    __metadata("design:type", String)
], UserProjectRoleDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assignment date' }),
    __metadata("design:type", Date)
], UserProjectRoleDto.prototype, "assignedAt", void 0);
class UserWithAssignmentsDto {
}
exports.UserWithAssignmentsDto = UserWithAssignmentsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'First name' }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last name' }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address' }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phone number', required: false }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Department', required: false }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Position', required: false }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Employee ID', required: false }),
    __metadata("design:type", String)
], UserWithAssignmentsDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Active status' }),
    __metadata("design:type", Boolean)
], UserWithAssignmentsDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last login date', required: false }),
    __metadata("design:type", Date)
], UserWithAssignmentsDto.prototype, "lastLoginAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation date' }),
    __metadata("design:type", Date)
], UserWithAssignmentsDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Last update date' }),
    __metadata("design:type", Date)
], UserWithAssignmentsDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User project-role assignments',
        type: [UserProjectRoleDto]
    }),
    __metadata("design:type", Array)
], UserWithAssignmentsDto.prototype, "projectRoles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User team assignments',
        type: 'array',
        items: { type: 'string' }
    }),
    __metadata("design:type", Array)
], UserWithAssignmentsDto.prototype, "teamIds", void 0);
//# sourceMappingURL=user-with-assignments.dto.js.map