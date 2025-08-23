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
exports.ModuleService = void 0;
const common_1 = require("@nestjs/common");
const module_repository_1 = require("../repositories/module.repository");
let ModuleService = class ModuleService {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    async create(createModuleDto) {
        const existingModule = await this.moduleRepository.findByCode(createModuleDto.code);
        if (existingModule) {
            throw new common_1.BadRequestException('Module with this code already exists');
        }
        return this.moduleRepository.create(createModuleDto);
    }
    async findAll() {
        return this.moduleRepository.findAll();
    }
    async searchModules(searchDto) {
        return this.moduleRepository.searchModules(searchDto);
    }
    async findActive() {
        return this.moduleRepository.findActive();
    }
    async findAllWithActivePermissions() {
        return this.moduleRepository.findAllWithActivePermissions();
    }
    async findOne(id) {
        const module = await this.moduleRepository.findById(id);
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        return module;
    }
    async findOneWithPermissions(id) {
        const module = await this.moduleRepository.findByIdWithPermissions(id);
        if (!module) {
            throw new common_1.NotFoundException('Module not found');
        }
        return module;
    }
    async update(id, updateModuleDto) {
        const module = await this.findOne(id);
        if (updateModuleDto.code) {
            const existingModule = await this.moduleRepository.findByCode(updateModuleDto.code);
            if (existingModule && existingModule.id !== id) {
                throw new common_1.BadRequestException('Module with this code already exists');
            }
        }
        return this.moduleRepository.update(id, updateModuleDto);
    }
    async updateWithPermissions(id, updateModuleDto) {
        const module = await this.findOne(id);
        if (updateModuleDto.code) {
            const existingModule = await this.moduleRepository.findByCode(updateModuleDto.code);
            if (existingModule && existingModule.id !== id) {
                throw new common_1.BadRequestException('Module with this code already exists');
            }
        }
        const { permissions, ...moduleData } = updateModuleDto;
        return this.moduleRepository.updateWithPermissions(id, moduleData, permissions);
    }
    async remove(id) {
        const module = await this.findOne(id);
        await this.moduleRepository.delete(id);
    }
};
exports.ModuleService = ModuleService;
exports.ModuleService = ModuleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [module_repository_1.ModuleRepository])
], ModuleService);
//# sourceMappingURL=module.service.js.map