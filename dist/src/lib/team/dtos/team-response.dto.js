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
exports.TeamResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TeamResponseDto {
}
exports.TeamResponseDto = TeamResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-team-id' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Frontend Development Team' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Team responsible for frontend development and UI/UX' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-project-id' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'E-Commerce Platform' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "projectName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-lead-id' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "leadId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Name of the team lead' }),
    __metadata("design:type", String)
], TeamResponseDto.prototype, "leadName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Number of users mapped to this team' }),
    __metadata("design:type", Number)
], TeamResponseDto.prototype, "userCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], TeamResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], TeamResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], TeamResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=team-response.dto.js.map