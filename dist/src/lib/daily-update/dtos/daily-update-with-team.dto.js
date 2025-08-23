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
exports.DailyUpdateWithTeamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class DailyUpdateWithTeamDto {
}
exports.DailyUpdateWithTeamDto = DailyUpdateWithTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Daily update ID' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Project ID' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team ID' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date of the update' }),
    __metadata("design:type", Date)
], DailyUpdateWithTeamDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tickets worked on' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Internal meeting hours' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "internalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'External meeting hours' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "externalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Other activities' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "otherActivities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Other activity hours' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "otherActivityHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total hours' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "totalHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status of the update' }),
    __metadata("design:type", String)
], DailyUpdateWithTeamDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Submitted at timestamp' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Approved at timestamp' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Approved by user ID' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "approvedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], DailyUpdateWithTeamDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at timestamp' }),
    __metadata("design:type", Date)
], DailyUpdateWithTeamDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team name' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "teamName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Team description' }),
    __metadata("design:type", Object)
], DailyUpdateWithTeamDto.prototype, "teamDescription", void 0);
//# sourceMappingURL=daily-update-with-team.dto.js.map