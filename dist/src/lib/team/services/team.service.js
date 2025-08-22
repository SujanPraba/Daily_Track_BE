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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const team_repository_1 = require("../repositories/team.repository");
const project_service_1 = require("../../project/services/project.service");
let TeamService = class TeamService {
    constructor(teamRepository, projectService) {
        this.teamRepository = teamRepository;
        this.projectService = projectService;
    }
    async create(createTeamDto) {
        await this.projectService.findOne(createTeamDto.projectId);
        return this.teamRepository.create(createTeamDto);
    }
    async findAll() {
        return this.teamRepository.findAll();
    }
    async findOne(id) {
        const team = await this.teamRepository.findById(id);
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        return team;
    }
    async update(id, updateTeamDto) {
        const team = await this.findOne(id);
        if (updateTeamDto.projectId) {
            await this.projectService.findOne(updateTeamDto.projectId);
        }
        return this.teamRepository.update(id, updateTeamDto);
    }
    async remove(id) {
        const team = await this.findOne(id);
        await this.teamRepository.delete(id);
    }
    async findByProject(projectId) {
        return this.teamRepository.findByProject(projectId);
    }
    async findByLead(leadId) {
        return this.teamRepository.findByLead(leadId);
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_repository_1.TeamRepository,
        project_service_1.ProjectService])
], TeamService);
//# sourceMappingURL=team.service.js.map