import { ModuleRepository } from '../repositories/module.repository';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { UpdateModuleDto } from '../dtos/update-module.dto';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
import { Module } from '../../../database/schemas/module.schema';
export declare class ModuleService {
    private readonly moduleRepository;
    constructor(moduleRepository: ModuleRepository);
    create(createModuleDto: CreateModuleDto): Promise<Module>;
    findAll(): Promise<Module[]>;
    searchModules(searchDto: SearchModulesDto): Promise<PaginatedModulesDto>;
    findActive(): Promise<Module[]>;
    findAllWithActivePermissions(): Promise<any[]>;
    findOne(id: string): Promise<Module>;
    findOneWithPermissions(id: string): Promise<ModuleResponseDto>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module>;
    updateWithPermissions(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleResponseDto>;
    remove(id: string): Promise<void>;
}
