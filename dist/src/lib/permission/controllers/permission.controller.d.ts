import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';
import { Permission } from '../../../database/schemas/permission.schema';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(moduleId?: string): Promise<any[]>;
    searchPermissions(searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        moduleId: string;
    }>;
    findOneWithModule(id: string): Promise<any>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
}
