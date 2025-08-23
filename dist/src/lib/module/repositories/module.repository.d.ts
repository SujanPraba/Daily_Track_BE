import { Module, NewModule } from '../../../database/schemas/module.schema';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
import { CreateModulePermissionDto } from '../dtos/module-permission.dto';
export declare class ModuleRepository {
    private readonly db;
    constructor(db: any);
    create(module: NewModule): Promise<Module>;
    findAll(): Promise<Module[]>;
    searchModules(searchDto: SearchModulesDto): Promise<PaginatedModulesDto>;
    findById(id: string): Promise<Module | null>;
    findByIdWithPermissions(id: string): Promise<ModuleResponseDto | null>;
    findByCode(code: string): Promise<Module | null>;
    findActive(): Promise<Module[]>;
    findAllWithActivePermissions(): Promise<any[]>;
    update(id: string, module: Partial<NewModule>): Promise<Module>;
    updateWithPermissions(id: string, moduleData: Partial<NewModule>, permissionsData?: CreateModulePermissionDto[]): Promise<ModuleResponseDto>;
    delete(id: string): Promise<void>;
}
