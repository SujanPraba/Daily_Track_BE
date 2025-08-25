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
        const totalHours = (parseFloat(createDailyUpdateDto.ticketsHours || '0') +
            parseFloat(createDailyUpdateDto.internalMeetingHours || '0') +
            parseFloat(createDailyUpdateDto.externalMeetingHours || '0') +
            parseFloat(createDailyUpdateDto.otherActivityHours || '0') +
            parseFloat(createDailyUpdateDto.leavePermissionHours || '0')).toString();
        const updateData = {
            userId: createDailyUpdateDto.userId,
            projectId: createDailyUpdateDto.projectId,
            teamId: createDailyUpdateDto.teamId || null,
            date: new Date(createDailyUpdateDto.date),
            tickets: createDailyUpdateDto.tickets || null,
            ticketsHours: createDailyUpdateDto.ticketsHours || '0',
            internalMeetingHours: createDailyUpdateDto.internalMeetingHours || '0',
            externalMeetingHours: createDailyUpdateDto.externalMeetingHours || '0',
            otherActivities: createDailyUpdateDto.otherActivities || null,
            otherActivityHours: createDailyUpdateDto.otherActivityHours || '0',
            leavePermissionHours: createDailyUpdateDto.leavePermissionHours || '0',
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
        if (updateDailyUpdateDto.ticketsHours ||
            updateDailyUpdateDto.internalMeetingHours ||
            updateDailyUpdateDto.externalMeetingHours ||
            updateDailyUpdateDto.otherActivityHours ||
            updateDailyUpdateDto.leavePermissionHours) {
            const ticketsHours = updateDailyUpdateDto.ticketsHours ||
                (currentUpdate.ticketsHours?.toString() || '0');
            const internalHours = updateDailyUpdateDto.internalMeetingHours ||
                (currentUpdate.internalMeetingHours?.toString() || '0');
            const externalHours = updateDailyUpdateDto.externalMeetingHours ||
                (currentUpdate.externalMeetingHours?.toString() || '0');
            const otherHours = updateDailyUpdateDto.otherActivityHours ||
                (currentUpdate.otherActivityHours?.toString() || '0');
            const leavePermissionHours = updateDailyUpdateDto.leavePermissionHours ||
                (currentUpdate.leavePermissionHours?.toString() || '0');
            const totalHours = (parseFloat(ticketsHours) +
                parseFloat(internalHours) +
                parseFloat(externalHours) +
                parseFloat(otherHours) +
                parseFloat(leavePermissionHours)).toString();
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
    async searchDailyUpdates(searchDto, currentUserId) {
        const hasFullPermission = await this.userService.hasPermission(currentUserId, 'VIEW_DAILY_UPDATES_FULL');
        let projectIds = [];
        projectIds = await this.userService.getUserProjectIds(currentUserId);
        if (projectIds.length === 0) {
            return {
                data: [],
                total: 0,
                page: searchDto.page || 1,
                limit: searchDto.limit || 10,
                totalPages: 0,
                hasNextPage: false,
                hasPrevPage: false,
            };
        }
        const searchCriteria = {};
        if (searchDto.userId) {
            searchCriteria.userId = searchDto.userId;
        }
        if (searchDto.projectId) {
            if (!hasFullPermission && !projectIds.includes(searchDto.projectId)) {
                return {
                    data: [],
                    total: 0,
                    page: searchDto.page || 1,
                    limit: searchDto.limit || 10,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                };
            }
            searchCriteria.projectId = searchDto.projectId;
        }
        else if (!hasFullPermission) {
            searchCriteria.projectId = projectIds;
        }
        if (searchDto.teamId) {
            searchCriteria.teamId = searchDto.teamId;
        }
        if (searchDto.status) {
            searchCriteria.status = searchDto.status;
        }
        if (searchDto.tickets) {
            searchCriteria.tickets = searchDto.tickets;
        }
        if (searchDto.startDate && searchDto.endDate) {
            searchCriteria.startDate = new Date(searchDto.startDate);
            searchCriteria.endDate = new Date(searchDto.endDate);
        }
        const page = searchDto.page || 1;
        const limit = searchDto.limit || 10;
        const offset = (page - 1) * limit;
        const [rawData, total] = await Promise.all([
            this.dailyUpdateRepository.searchWithPagination(searchCriteria, limit, offset),
            this.dailyUpdateRepository.countWithCriteria(searchCriteria)
        ]);
        let filteredData = rawData;
        if (hasFullPermission) {
            filteredData = rawData.filter(item => projectIds.includes(item.projectId));
        }
        else {
            filteredData = rawData.filter(item => item.userId === currentUserId);
        }
        const data = filteredData.map(item => ({
            id: item.id,
            userId: item.userId,
            projectId: item.projectId,
            teamId: item.teamId,
            date: item.date,
            tickets: item.tickets,
            ticketsHours: item.ticketsHours,
            internalMeetingHours: item.internalMeetingHours,
            externalMeetingHours: item.externalMeetingHours,
            otherActivities: item.otherActivities,
            otherActivityHours: item.otherActivityHours,
            leavePermissionHours: item.leavePermissionHours,
            totalHours: item.totalHours,
            notes: item.notes,
            status: item.status,
            submittedAt: item.submittedAt,
            approvedAt: item.approvedAt,
            approvedBy: item.approvedBy,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            teamName: item.teamName,
            teamDescription: item.teamDescription,
        }));
        const totalPages = Math.ceil(total / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        return {
            data,
            total: filteredData.length,
            page,
            limit,
            totalPages,
            hasNextPage,
            hasPrevPage,
        };
    }
    async hasPermission(userId, permissionName) {
        return this.userService.hasPermission(userId, permissionName);
    }
    async getUserProjectIds(userId) {
        return this.userService.getUserProjectIds(userId);
    }
    async getTeamByProject(projectId) {
        const result = await this.dailyUpdateRepository.getTeamByProject(projectId);
        return result;
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
    async getTimeTracking(timeTrackingDto, currentUserId) {
        const { projectId, teamId, startDate, endDate, filterTimeBy } = timeTrackingDto;
        console.log('Getting time tracking with criteria:', { projectId, teamId, startDate, endDate, filterTimeBy });
        console.log('Current user ID:', currentUserId);
        const defaultStartDate = new Date();
        defaultStartDate.setDate(defaultStartDate.getDate() - 30);
        const searchStartDate = startDate ? new Date(startDate) : defaultStartDate;
        const searchEndDate = endDate ? new Date(endDate) : new Date();
        console.log('Using date range:', { searchStartDate, searchEndDate });
        const hasFullPermission = await this.userService.hasPermission(currentUserId, 'VIEW_DAILY_UPDATES_FULL');
        console.log('User has VIEW_DAILY_UPDATES_FULL permission:', hasFullPermission);
        let userProjectIds = [];
        userProjectIds = await this.userService.getUserProjectIds(currentUserId);
        console.log('User project IDs:', userProjectIds);
        if (userProjectIds.length === 0) {
            console.log('User has no projects assigned');
            return [];
        }
        let searchProjectId = projectId;
        let searchTeamId = teamId;
        if (!projectId) {
            searchProjectId = userProjectIds[0];
            console.log('Restricting to user project:', searchProjectId);
        }
        if (projectId && !userProjectIds.includes(projectId)) {
            console.log('User does not have access to specified project');
            return [];
        }
        const dailyUpdates = await this.dailyUpdateRepository.findDailyUpdatesWithTeamInfo(searchStartDate, searchEndDate, searchProjectId, searchTeamId);
        console.log('Raw daily updates from DB:', JSON.stringify(dailyUpdates, null, 2));
        if (!dailyUpdates || dailyUpdates.length === 0) {
            console.log('No daily updates found for the given criteria');
            return [];
        }
        let filteredUpdates = dailyUpdates;
        if (hasFullPermission) {
            filteredUpdates = dailyUpdates.filter(update => userProjectIds.includes(update.projectId));
            console.log('Full permission: showing all updates under user projects, count:', filteredUpdates.length);
        }
        else {
            filteredUpdates = dailyUpdates.filter(update => update.userId === currentUserId);
            console.log('Limited permission: showing only user updates, count:', filteredUpdates.length);
        }
        if (filterTimeBy === 'fullTime') {
            return this.calculateSummaryTotals(filteredUpdates);
        }
        else {
            return this.calculateDailyBreakdown(filteredUpdates);
        }
    }
    async calculateSummaryTotals(dailyUpdates) {
        const userMap = new Map();
        for (const update of dailyUpdates) {
            const key = `${update.userId}-${update.projectId}-${update.teamId || 'no-team'}`;
            if (!userMap.has(key)) {
                const user = await this.userService.findOne(update.userId);
                const project = await this.projectService.findOne(update.projectId);
                userMap.set(key, {
                    userId: update.userId,
                    userName: user.firstName + ' ' + user.lastName,
                    projectId: update.projectId,
                    projectName: project.name,
                    teamId: update.teamId,
                    teamName: update.teamName,
                    totalInternalMeetingHours: '0',
                    totalExternalMeetingHours: '0',
                    totalOtherActivityHours: '0',
                    totalTicketsHours: '0',
                    totalLeavePermissionHours: '0',
                    grandTotalHours: '0',
                });
            }
            const userData = userMap.get(key);
            userData.totalInternalMeetingHours = (parseFloat(userData.totalInternalMeetingHours) +
                parseFloat(update.internalMeetingHours?.toString() || '0')).toFixed(2);
            userData.totalExternalMeetingHours = (parseFloat(userData.totalExternalMeetingHours) +
                parseFloat(update.externalMeetingHours?.toString() || '0')).toFixed(2);
            userData.totalOtherActivityHours = (parseFloat(userData.totalOtherActivityHours) +
                parseFloat(update.otherActivityHours?.toString() || '0')).toFixed(2);
            userData.totalTicketsHours = (parseFloat(userData.totalTicketsHours) +
                0).toFixed(2);
            userData.totalLeavePermissionHours = (parseFloat(userData.totalLeavePermissionHours) +
                0).toFixed(2);
            userData.grandTotalHours = (parseFloat(userData.totalInternalMeetingHours) +
                parseFloat(userData.totalExternalMeetingHours) +
                parseFloat(userData.totalOtherActivityHours) +
                parseFloat(userData.totalTicketsHours) +
                parseFloat(userData.totalLeavePermissionHours)).toFixed(2);
        }
        return Array.from(userMap.values());
    }
    async calculateDailyBreakdown(dailyUpdates) {
        const result = [];
        for (const update of dailyUpdates) {
            const user = await this.userService.findOne(update.userId);
            const project = await this.projectService.findOne(update.projectId);
            result.push({
                userId: update.userId,
                userName: user.firstName + ' ' + user.lastName,
                projectId: update.projectId,
                projectName: project.name,
                teamId: update.teamId,
                teamName: update.teamName,
                date: update.date.toISOString().split('T')[0],
                internalMeetingHours: update.internalMeetingHours?.toString() || '0',
                externalMeetingHours: update.externalMeetingHours?.toString() || '0',
                otherActivityHours: update.otherActivityHours?.toString() || '0',
                ticketsHours: '0',
                leavePermissionHours: '0',
                totalHours: update.totalHours?.toString() || '0',
            });
        }
        return result;
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