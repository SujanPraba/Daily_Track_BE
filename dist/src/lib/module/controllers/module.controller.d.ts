import { ModuleService } from '../services/module.service';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { UpdateModuleDto } from '../dtos/update-module.dto';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
export declare class ModuleController {
    private readonly moduleService;
    constructor(moduleService: ModuleService);
    create(createModuleDto: CreateModuleDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
    }[]>;
    searchModules(searchDto: SearchModulesDto): Promise<PaginatedModulesDto>;
    findActive(): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
    }[]>;
    findAllWithPermissions(): Promise<any[]>;
    findOne(id: string): Promise<ModuleResponseDto>;
    update(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleResponseDto>;
    remove(id: string): Promise<void>;
}
