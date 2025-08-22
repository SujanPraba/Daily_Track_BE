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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_module_1 = require("../../../database/database.module");
const project_schema_1 = require("../../../database/schemas/project.schema");
let ProjectRepository = class ProjectRepository {
    constructor(db) {
        this.db = db;
    }
    async create(project) {
        const [result] = await this.db.insert(project_schema_1.projects).values(project).returning();
        return result;
    }
    async findAll() {
        return this.db.select().from(project_schema_1.projects);
    }
    async findById(id) {
        const [result] = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id));
        return result || null;
    }
    async findByCode(code) {
        const [result] = await this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.code, code));
        return result || null;
    }
    async findByManager(managerId) {
        return this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.managerId, managerId));
    }
    async findByStatus(status) {
        return this.db.select().from(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.status, status));
    }
    async update(id, project) {
        const [result] = await this.db
            .update(project_schema_1.projects)
            .set({ ...project, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id))
            .returning();
        return result;
    }
    async delete(id) {
        await this.db.delete(project_schema_1.projects).where((0, drizzle_orm_1.eq)(project_schema_1.projects.id, id));
    }
};
exports.ProjectRepository = ProjectRepository;
exports.ProjectRepository = ProjectRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_module_1.DATABASE_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ProjectRepository);
//# sourceMappingURL=project.repository.js.map