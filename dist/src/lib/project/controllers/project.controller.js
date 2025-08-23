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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_service_1 = require("../services/project.service");
const create_project_dto_1 = require("../dtos/create-project.dto");
const update_project_dto_1 = require("../dtos/update-project.dto");
const search_projects_dto_1 = require("../dtos/search-projects.dto");
const paginated_projects_dto_1 = require("../dtos/paginated-projects.dto");
const project_with_roles_dto_1 = require("../dtos/project-with-roles.dto");
const project_roles_response_dto_1 = require("../dtos/project-roles-response.dto");
const assign_roles_dto_1 = require("../dtos/assign-roles.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const project_with_permissions_dto_1 = require("../dtos/project-with-permissions.dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    create(createProjectDto) {
        return this.projectService.create(createProjectDto);
    }
    findAll(status, managerId) {
        if (status) {
            return this.projectService.findByStatus(status);
        }
        if (managerId) {
            return this.projectService.findByManager(managerId);
        }
        return this.projectService.findAll();
    }
    findAllWithPermissions() {
        return this.projectService.findAllWithPermissions();
    }
    getProjectUsers(id) {
        return this.projectService.getProjectUsers(id);
    }
    searchProjects(searchDto) {
        return this.projectService.searchProjects(searchDto);
    }
    findOne(id) {
        return this.projectService.findOne(id);
    }
    update(id, updateProjectDto) {
        return this.projectService.update(id, updateProjectDto);
    }
    remove(id) {
        return this.projectService.remove(id);
    }
    assignRoles(id, assignRolesDto) {
        return this.projectService.assignRoles(id, assignRolesDto.roleIds);
    }
    getProjectRoles(id) {
        return this.projectService.getProjectRoles(id);
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new project',
        description: 'Create a new project with optional role assignments'
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Project created successfully',
        type: project_with_roles_dto_1.ProjectWithRolesAndTeamsDto
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects (without pagination)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all projects with their roles and teams',
        type: [project_with_roles_dto_1.ProjectWithRolesAndTeamsDto]
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all projects with teams, roles, and permissions' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all projects with their teams, roles, and permissions',
        type: [project_with_permissions_dto_1.ProjectWithPermissionsDto]
    }),
    (0, common_1.Get)('with-permissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findAllWithPermissions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get users assigned to a specific project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of users assigned to the project with their roles and teams',
        type: 'array'
    }),
    (0, common_1.Get)(':id/users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getProjectUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search and get all projects with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of projects with their roles and teams',
        type: paginated_projects_dto_1.PaginatedProjectsDto
    }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_projects_dto_1.SearchProjectsDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "searchProjects", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get project by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project found with roles and teams',
        type: project_with_roles_dto_1.ProjectWithRolesAndTeamsDto
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Update project',
        description: 'Update project data and optionally update role assignments'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project updated successfully with roles and teams',
        type: project_with_roles_dto_1.ProjectWithRolesAndTeamsDto
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_1.UpdateProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Project deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Assign roles to project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Roles assigned successfully' }),
    (0, common_1.Post)(':id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_roles_dto_1.AssignRolesDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "assignRoles", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get project roles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project roles retrieved successfully',
        type: [project_roles_response_dto_1.ProjectRoleResponseDto]
    }),
    (0, common_1.Get)(':id/roles'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "getProjectRoles", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map