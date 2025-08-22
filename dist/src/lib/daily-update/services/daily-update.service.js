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
exports.DailyUpdateService = void 0;
const common_1 = require("@nestjs/common");
const daily_update_repository_1 = require("../repositories/daily-update.repository");
const user_service_1 = require("../../user/services/user.service");
const project_service_1 = require("../../project/services/project.service");
let DailyUpdateService = class DailyUpdateService {
    constructor(dailyUpdateRepository, userService, projectService) {
        this.dailyUpdateRepository = dailyUpdateRepository;
        this.userService = userService;
        this.projectService = projectService;
    }
    async create(createDailyUpdateDto) {
        await this.userService.findOne(createDailyUpdateDto.userId);
        await this.projectService.findOne(createDailyUpdateDto.projectId);
        const totalHours = (parseFloat(createDailyUpdateDto.internalMeetingHours || '0') +
            parseFloat(createDailyUpdateDto.externalMeetingHours || '0') +
            parseFloat(createDailyUpdateDto.otherActivityHours || '0')).toString();
        const updateData = {
            userId: createDailyUpdateDto.userId,
            projectId: createDailyUpdateDto.projectId,
            teamId: createDailyUpdateDto.teamId || null,
            date: new Date(createDailyUpdateDto.date),
            tickets: createDailyUpdateDto.tickets || null,
            internalMeetingHours: createDailyUpdateDto.internalMeetingHours || '0',
            externalMeetingHours: createDailyUpdateDto.externalMeetingHours || '0',
            otherActivities: createDailyUpdateDto.otherActivities || null,
            otherActivityHours: createDailyUpdateDto.otherActivityHours || '0',
            totalHours,
            notes: createDailyUpdateDto.notes || null,
            status: 'PENDING',
            submittedAt: null,
            approvedAt: null,
            approvedBy: null
        };
        return this.dailyUpdateRepository.create(updateData);
    }
    async findAll() {
        return this.dailyUpdateRepository.findAll();
    }
    async findOne(id) {
        const dailyUpdate = await this.dailyUpdateRepository.findById(id);
        if (!dailyUpdate) {
            throw new common_1.NotFoundException('Daily update not found');
        }
        return dailyUpdate;
    }
    async update(id, updateDailyUpdateDto) {
        const dailyUpdate = await this.findOne(id);
        const currentUpdate = await this.findOne(id);
        const updateData = {};
        Object.keys(updateDailyUpdateDto).forEach(key => {
            if (updateDailyUpdateDto[key] !== undefined) {
                updateData[key] = updateDailyUpdateDto[key];
            }
        });
        if (updateDailyUpdateDto.date) {
            updateData.date = new Date(updateDailyUpdateDto.date);
        }
        if (updateDailyUpdateDto.internalMeetingHours ||
            updateDailyUpdateDto.externalMeetingHours ||
            updateDailyUpdateDto.otherActivityHours) {
            const internalHours = updateDailyUpdateDto.internalMeetingHours ||
                (currentUpdate.internalMeetingHours?.toString() || '0');
            const externalHours = updateDailyUpdateDto.externalMeetingHours ||
                (currentUpdate.externalMeetingHours?.toString() || '0');
            const otherHours = updateDailyUpdateDto.otherActivityHours ||
                (currentUpdate.otherActivityHours?.toString() || '0');
            const totalHours = (parseFloat(internalHours) +
                parseFloat(externalHours) +
                parseFloat(otherHours)).toString();
            updateData.totalHours = totalHours;
        }
        return this.dailyUpdateRepository.update(id, updateData);
    }
    async remove(id) {
        const dailyUpdate = await this.findOne(id);
        await this.dailyUpdateRepository.delete(id);
    }
    async findByUser(userId) {
        return this.dailyUpdateRepository.findByUser(userId);
    }
    async findByProject(projectId) {
        return this.dailyUpdateRepository.findByProject(projectId);
    }
    async findByDateRange(startDate, endDate) {
        return this.dailyUpdateRepository.findByDateRange(startDate, endDate);
    }
    async findByStatus(status) {
        return this.dailyUpdateRepository.findByStatus(status);
    }
    async approve(id, approverId) {
        const dailyUpdate = await this.findOne(id);
        await this.userService.findOne(approverId);
        return this.dailyUpdateRepository.update(id, {
            status: 'APPROVED',
            approvedAt: new Date(),
            approvedBy: approverId,
        });
    }
    async submit(id) {
        const dailyUpdate = await this.findOne(id);
        return this.dailyUpdateRepository.update(id, {
            status: 'SUBMITTED',
            submittedAt: new Date(),
        });
    }
};
exports.DailyUpdateService = DailyUpdateService;
exports.DailyUpdateService = DailyUpdateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [daily_update_repository_1.DailyUpdateRepository,
        user_service_1.UserService,
        project_service_1.ProjectService])
], DailyUpdateService);
//# sourceMappingURL=daily-update.service.js.map