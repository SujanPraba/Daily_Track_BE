"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./services/team.service");
const team_controller_1 = require("./controllers/team.controller");
const team_repository_1 = require("./repositories/team.repository");
const project_module_1 = require("../project/project.module");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [project_module_1.ProjectModule],
        providers: [team_service_1.TeamService, team_repository_1.TeamRepository],
        controllers: [team_controller_1.TeamController],
        exports: [team_service_1.TeamService, team_repository_1.TeamRepository],
    })
], TeamModule);
//# sourceMappingURL=team.module.js.map