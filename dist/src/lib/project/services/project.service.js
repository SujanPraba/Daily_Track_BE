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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const project_repository_1 = require("../repositories/project.repository");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async create(createProjectDto) {
        const existingProject = await this.projectRepository.findByCode(createProjectDto.code);
        if (existingProject) {
            throw new common_1.BadRequestException('Project with this code already exists');
        }
        const cleanedDto = {
            ...createProjectDto,
            managerId: createProjectDto.managerId === '' ? undefined : createProjectDto.managerId,
        };
        const { roleIds, ...projectData } = cleanedDto;
        const processedProjectData = { ...projectData };
        if (projectData.startDate && projectData.startDate.trim() !== '') {
            processedProjectData.startDate = new Date(projectData.startDate);
        }
        else {
            processedProjectData.startDate = undefined;
        }
        if (projectData.endDate && projectData.endDate.trim() !== '') {
            processedProjectData.endDate = new Date(projectData.endDate);
        }
        else {
            processedProjectData.endDate = undefined;
        }
        const createdProject = await this.projectRepository.create(processedProjectData);
        if (roleIds && roleIds.length > 0) {
            await this.projectRepository.assignRoles(createdProject.id, roleIds);
        }
        return this.projectRepository.findById(createdProject.id);
    }
    async findAll() {
        return this.projectRepository.findAll();
    }
    async searchProjects(searchDto) {
        return this.projectRepository.searchProjects(searchDto);
    }
    async findOne(id) {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const project = await this.findOne(id);
        const cleanedDto = {
            ...updateProjectDto,
            managerId: updateProjectDto.managerId === '' ? undefined : updateProjectDto.managerId,
        };
        const { roleIds, ...projectData } = cleanedDto;
        const processedProjectData = { ...projectData };
        if (projectData.startDate && projectData.startDate.trim() !== '') {
            processedProjectData.startDate = new Date(projectData.startDate);
        }
        else {
            processedProjectData.startDate = undefined;
        }
        if (projectData.endDate && projectData.endDate.trim() !== '') {
            processedProjectData.endDate = new Date(projectData.endDate);
        }
        else {
            processedProjectData.endDate = undefined;
        }
        await this.projectRepository.update(id, processedProjectData);
        if (roleIds !== undefined) {
            await this.projectRepository.assignRoles(id, roleIds);
        }
        return this.projectRepository.findById(id);
    }
    async remove(id) {
        const project = await this.findOne(id);
        await this.projectRepository.delete(id);
    }
    async findAllWithPermissions() {
        return this.projectRepository.findAllWithPermissions();
    }
    async getProjectUsers(projectId) {
        return this.projectRepository.getProjectUsers(projectId);
    }
    async findByManager(managerId) {
        return this.projectRepository.findByManager(managerId);
    }
    async findByStatus(status) {
        return this.projectRepository.findByStatus(status);
    }
    async assignRoles(projectId, roleIds) {
        const project = await this.findOne(projectId);
        await this.projectRepository.assignRoles(projectId, roleIds);
    }
    async getProjectRoles(projectId) {
        const project = await this.findOne(projectId);
        return this.projectRepository.getProjectRoles(projectId);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
//# sourceMappingURL=project.service.js.map