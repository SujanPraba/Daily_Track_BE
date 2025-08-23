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
exports.PaginatedModulesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginatedModulesDto {
}
exports.PaginatedModulesDto = PaginatedModulesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of modules',
        type: 'array',
        items: { $ref: '#/components/schemas/Module' }
    }),
    __metadata("design:type", Array)
], PaginatedModulesDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current page number',
        example: 1
    }),
    __metadata("design:type", Number)
], PaginatedModulesDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items per page',
        example: 10
    }),
    __metadata("design:type", Number)
], PaginatedModulesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of modules matching the criteria',
        example: 25
    }),
    __metadata("design:type", Number)
], PaginatedModulesDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of pages',
        example: 3
    }),
    __metadata("design:type", Number)
], PaginatedModulesDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a next page',
        example: true
    }),
    __metadata("design:type", Boolean)
], PaginatedModulesDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether there is a previous page',
        example: false
    }),
    __metadata("design:type", Boolean)
], PaginatedModulesDto.prototype, "hasPrevPage", void 0);
//# sourceMappingURL=paginated-modules.dto.js.map