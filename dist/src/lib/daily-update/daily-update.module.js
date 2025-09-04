"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyUpdateModule = void 0;
const common_1 = require("@nestjs/common");
const daily_update_service_1 = require("./services/daily-update.service");
const daily_update_controller_1 = require("./controllers/daily-update.controller");
const daily_update_repository_1 = require("./repositories/daily-update.repository");
const zoho_people_service_1 = require("./services/zoho-people.service");
const user_module_1 = require("../user/user.module");
const project_module_1 = require("../project/project.module");
let DailyUpdateModule = class DailyUpdateModule {
};
exports.DailyUpdateModule = DailyUpdateModule;
exports.DailyUpdateModule = DailyUpdateModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, project_module_1.ProjectModule],
        providers: [daily_update_service_1.DailyUpdateService, daily_update_repository_1.DailyUpdateRepository, zoho_people_service_1.ZohoPeopleService],
        controllers: [daily_update_controller_1.DailyUpdateController],
        exports: [daily_update_service_1.DailyUpdateService, daily_update_repository_1.DailyUpdateRepository, zoho_people_service_1.ZohoPeopleService],
    })
], DailyUpdateModule);
//# sourceMappingURL=daily-update.module.js.map