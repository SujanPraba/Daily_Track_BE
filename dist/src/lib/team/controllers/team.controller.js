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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const team_service_1 = require("../services/team.service");
const create_team_dto_1 = require("../dtos/create-team.dto");
const update_team_dto_1 = require("../dtos/update-team.dto");
const search_teams_dto_1 = require("../dtos/search-teams.dto");
const paginated_teams_dto_1 = require("../dtos/paginated-teams.dto");
const team_response_dto_1 = require("../dtos/team-response.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const common_2 = require("@nestjs/common");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    create(createTeamDto) {
        return this.teamService.create(createTeamDto);
    }
    searchTeams(searchDto) {
        return this.teamService.searchTeams(searchDto);
    }
    findAll(projectId, leadId) {
        if (projectId) {
            return this.teamService.findByProject(projectId);
        }
        if (leadId) {
            return this.teamService.findByLead(leadId);
        }
        return this.teamService.findAll();
    }
    findOne(id) {
        return this.teamService.findOne(id);
    }
    update(id, updateTeamDto) {
        return this.teamService.update(id, updateTeamDto);
    }
    remove(id) {
        return this.teamService.remove(id);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new team' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Team created successfully',
        type: team_response_dto_1.TeamResponseDto
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Search and get all teams with pagination and filtering' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of teams',
        type: paginated_teams_dto_1.PaginatedTeamsDto
    }),
    (0, common_1.Post)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_teams_dto_1.SearchTeamsDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "searchTeams", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all teams (without pagination)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all teams',
        type: [team_response_dto_1.TeamResponseDto]
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('projectId')),
    __param(1, (0, common_1.Query)('leadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get a team by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Team found',
        type: team_response_dto_1.TeamResponseDto
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update a team' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Team updated successfully',
        type: team_response_dto_1.TeamResponseDto
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete a team' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Team deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "remove", null);
exports.TeamController = TeamController = __decorate([
    (0, swagger_1.ApiTags)('Teams'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_2.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
//# sourceMappingURL=team.controller.js.map