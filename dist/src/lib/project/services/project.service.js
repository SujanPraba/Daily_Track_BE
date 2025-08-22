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
        return this.projectRepository.create(createProjectDto);
    }
    async findAll() {
        return this.projectRepository.findAll();
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
        return this.projectRepository.update(id, updateProjectDto);
    }
    async remove(id) {
        const project = await this.findOne(id);
        await this.projectRepository.delete(id);
    }
    async findByManager(managerId) {
        return this.projectRepository.findByManager(managerId);
    }
    async findByStatus(status) {
        return this.projectRepository.findByStatus(status);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository])
], ProjectService);
//# sourceMappingURL=project.service.js.map