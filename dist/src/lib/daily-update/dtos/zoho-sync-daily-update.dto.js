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
exports.ZohoSyncResponseDto = exports.ZohoSyncDailyUpdateDto = exports.ZohoLogTimeEntry = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const optional_uuid_decorator_1 = require("../../common/decorators/optional-uuid.decorator");
class ZohoLogTimeEntry {
}
exports.ZohoLogTimeEntry = ZohoLogTimeEntry;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TICKET-001', description: 'Zoho ticket/issue ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoLogTimeEntry.prototype, "ticketId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Development', description: 'Activity type in Zoho' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoLogTimeEntry.prototype, "activityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'Hours spent on this ticket' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoLogTimeEntry.prototype, "hours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Implemented user authentication feature', description: 'Description of work done' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoLogTimeEntry.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15', description: 'Date for this log entry' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ZohoLogTimeEntry.prototype, "logDate", void 0);
class ZohoSyncDailyUpdateDto {
}
exports.ZohoSyncDailyUpdateDto = ZohoSyncDailyUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-project-id' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "projectId", void 0);
__decorate([
    (0, optional_uuid_decorator_1.OptionalUUID)('uuid-team-id', 'ID of the team (optional)'),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'TICKET-001, TICKET-002',
        description: 'Comma-separated ticket numbers worked on'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3.50', description: 'Hours spent on tickets' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "ticketsHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2.50' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "internalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "externalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Code review, documentation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "otherActivities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.50' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "otherActivityHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2.00', description: 'Hours for leave or permission' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "leavePermissionHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Additional notes about the day' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Whether to sync this update to Zoho People'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoSyncDailyUpdateDto.prototype, "syncToZoho", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ZOHO-USER-123',
        description: 'Zoho People user ID for sync'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "zohoUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ZOHO-PROJECT-456',
        description: 'Zoho People project ID for sync'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoSyncDailyUpdateDto.prototype, "zohoProjectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ZohoLogTimeEntry],
        description: 'Detailed log time entries for Zoho sync'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ZohoSyncDailyUpdateDto.prototype, "zohoLogTimeEntries", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: 'Whether to create as draft in Zoho (not submitted)'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoSyncDailyUpdateDto.prototype, "zohoDraft", void 0);
class ZohoSyncResponseDto {
}
exports.ZohoSyncResponseDto = ZohoSyncResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-daily-update-id' }),
    __metadata("design:type", String)
], ZohoSyncResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Daily update created and synced successfully' }),
    __metadata("design:type", String)
], ZohoSyncResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], ZohoSyncResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T10:30:00.000Z' }),
    __metadata("design:type", String)
], ZohoSyncResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { synced: true, zohoEntries: 3, errors: [] },
        description: 'Zoho sync details'
    }),
    __metadata("design:type", Object)
], ZohoSyncResponseDto.prototype, "zohoSyncDetails", void 0);
//# sourceMappingURL=zoho-sync-daily-update.dto.js.map