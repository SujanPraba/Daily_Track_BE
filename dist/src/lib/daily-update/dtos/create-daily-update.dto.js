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
exports.CreateDailyUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDailyUpdateDto {
}
exports.CreateDailyUpdateDto = CreateDailyUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-project-id' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-team-id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15T00:00:00.000Z' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['TICKET-001', 'TICKET-002'],
        description: 'Array of ticket numbers worked on'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateDailyUpdateDto.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2.50' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "internalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.00' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "externalMeetingHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Code review, documentation' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "otherActivities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.50' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "otherActivityHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Additional notes about the day' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDailyUpdateDto.prototype, "notes", void 0);
//# sourceMappingURL=create-daily-update.dto.js.map