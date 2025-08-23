import { PermissionRepository } from '../repositories/permission.repository';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';
import { Permission } from '../../../database/schemas/permission.schema';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findAllWithModule(): Promise<any[]>;
    searchPermissions(searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto>;
    findOne(id: string): Promise<Permission>;
    findOneWithModule(id: string): Promise<any>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
    findByModuleId(moduleId: string): Promise<Permission[]>;
}
