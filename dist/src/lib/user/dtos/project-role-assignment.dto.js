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
exports.ProjectRoleAssignmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProjectRoleAssignmentDto {
}
exports.ProjectRoleAssignmentDto = ProjectRoleAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2ccfdca6-0daa-4ef5-a7a4-5364011cbbff',
        description: 'ID of the project to assign the user to'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ProjectRoleAssignmentDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00',
        description: 'ID of the role to assign to the user in this project'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ProjectRoleAssignmentDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '4eegfec8-2fcc-6gh7-c9c6-7586233edd11',
        description: 'ID of the team the user belongs to for this project (optional)',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", String)
], ProjectRoleAssignmentDto.prototype, "teamId", void 0);
//# sourceMappingURL=project-role-assignment.dto.js.map