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
exports.PaginatedProjectsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginatedProjectsDto {
}
exports.PaginatedProjectsDto = PaginatedProjectsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of projects with their associated roles and teams',
        type: 'array',
        items: { $ref: '#/components/schemas/ProjectWithRolesAndTeamsDto' }
    }),
    __metadata("design:type", Array)
], PaginatedProjectsDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current page number',
        example: 1
    }),
    __metadata("design:type", Number)
], PaginatedProjectsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items per page',
        example: 10
    }),
    __metadata("design:type", Number)
], PaginatedProjectsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of projects matching the criteria',
        example: 25
    }),
    __metadata("design:type", Number)
], PaginatedProjectsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of pages',
        example: 3
    }),
    __metadata("design:type", Number)
], PaginatedProjectsDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a next page',
        example: true
    }),
    __metadata("design:type", Boolean)
], PaginatedProjectsDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a previous page',
        example: false
    }),
    __metadata("design:type", Boolean)
], PaginatedProjectsDto.prototype, "hasPrevPage", void 0);
//# sourceMappingURL=paginated-projects.dto.js.map