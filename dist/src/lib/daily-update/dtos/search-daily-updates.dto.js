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
exports.SearchDailyUpdatesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SearchDailyUpdatesDto {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
}
exports.SearchDailyUpdatesDto = SearchDailyUpdatesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'User ID to filter by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Project ID to filter by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Team ID to filter by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Status to filter by' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Start date for date range filter' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'End date for date range filter' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Search in tickets text (comma-separated values)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchDailyUpdatesDto.prototype, "tickets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Page number for pagination', default: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchDailyUpdatesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Number of items per page', default: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], SearchDailyUpdatesDto.prototype, "limit", void 0);
//# sourceMappingURL=search-daily-updates.dto.js.map