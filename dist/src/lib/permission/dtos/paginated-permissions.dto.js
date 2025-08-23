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
exports.PaginatedPermissionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const permission_response_dto_1 = require("./permission-response.dto");
class PaginatedPermissionsDto {
}
exports.PaginatedPermissionsDto = PaginatedPermissionsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [permission_response_dto_1.PermissionResponseDto] }),
    __metadata("design:type", Array)
], PaginatedPermissionsDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PaginatedPermissionsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], PaginatedPermissionsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], PaginatedPermissionsDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], PaginatedPermissionsDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], PaginatedPermissionsDto.prototype, "hasNextPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], PaginatedPermissionsDto.prototype, "hasPrevPage", void 0);
//# sourceMappingURL=paginated-permissions.dto.js.map