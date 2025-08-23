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
exports.AssignProjectRolesDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const project_role_assignment_dto_1 = require("./project-role-assignment.dto");
class AssignProjectRolesDto {
}
exports.AssignProjectRolesDto = AssignProjectRolesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                "projectId": "2ccfdca6-0daa-4ef5-a7a4-5364011cbbff",
                "roleId": "3ddgdeb7-1ebb-5fg6-b8b5-6475122dcc00"
            },
            {
                "projectId": "4eegfec8-2fcc-6gh7-c9c6-7586233edd11",
                "roleId": "5ffhgfd9-3gdd-7hi8-d0d7-8697344fee22"
            }
        ],
        description: 'Array of project-role assignments for the user',
        type: [project_role_assignment_dto_1.ProjectRoleAssignmentDto]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => project_role_assignment_dto_1.ProjectRoleAssignmentDto),
    __metadata("design:type", Array)
], AssignProjectRolesDto.prototype, "projectRoleAssignments", void 0);
//# sourceMappingURL=assign-project-roles.dto.js.map