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
exports.DailyUpdateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const daily_update_service_1 = require("../services/daily-update.service");
const create_daily_update_dto_1 = require("../dtos/create-daily-update.dto");
const update_daily_update_dto_1 = require("../dtos/update-daily-update.dto");
const approve_daily_update_dto_1 = require("../dtos/approve-daily-update.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let DailyUpdateController = class DailyUpdateController {
    constructor(dailyUpdateService) {
        this.dailyUpdateService = dailyUpdateService;
    }
    create(createDailyUpdateDto) {
        return this.dailyUpdateService.create(createDailyUpdateDto);
    }
    findAll(userId, projectId, status, startDate, endDate) {
        if (userId) {
            return this.dailyUpdateService.findByUser(userId);
        }
        if (projectId) {
            return this.dailyUpdateService.findByProject(projectId);
        }
        if (status) {
            return this.dailyUpdateService.findByStatus(status);
        }
        if (startDate && endDate) {
            return this.dailyUpdateService.findByDateRange(new Date(startDate), new Date(endDate));
        }
        return this.dailyUpdateService.findAll();
    }
    findOne(id) {
        return this.dailyUpdateService.findOne(id);
    }
    update(id, updateDailyUpdateDto) {
        return this.dailyUpdateService.update(id, updateDailyUpdateDto);
    }
    remove(id) {
        return this.dailyUpdateService.remove(id);
    }
    submit(id) {
        return this.dailyUpdateService.submit(id);
    }
    approve(id, approveDailyUpdateDto) {
        return this.dailyUpdateService.approve(id, approveDailyUpdateDto.approverId);
    }
};
exports.DailyUpdateController = DailyUpdateController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new daily update' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Daily update created successfully' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_daily_update_dto_1.CreateDailyUpdateDto]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all daily updates' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all daily updates' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('projectId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get daily update by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily update found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Daily update not found' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update daily update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily update updated successfully' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_daily_update_dto_1.UpdateDailyUpdateDto]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete daily update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily update deleted successfully' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Submit daily update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily update submitted successfully' }),
    (0, common_1.Post)(':id/submit'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "submit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Approve daily update' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily update approved successfully' }),
    (0, common_1.Post)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_daily_update_dto_1.ApproveDailyUpdateDto]),
    __metadata("design:returntype", void 0)
], DailyUpdateController.prototype, "approve", null);
exports.DailyUpdateController = DailyUpdateController = __decorate([
    (0, swagger_1.ApiTags)('Daily Updates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('daily-updates'),
    __metadata("design:paramtypes", [daily_update_service_1.DailyUpdateService])
], DailyUpdateController);
//# sourceMappingURL=daily-update.controller.js.map