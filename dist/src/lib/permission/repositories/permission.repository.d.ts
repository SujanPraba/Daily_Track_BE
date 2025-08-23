import { Permission, NewPermission } from '../../../database/schemas/permission.schema';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';
export declare class PermissionRepository {
    private readonly db;
    constructor(db: any);
    create(permission: NewPermission): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findAllWithModule(): Promise<any[]>;
    findByIdWithModule(id: string): Promise<any | null>;
    searchPermissions(searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto>;
    findById(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    findByModuleId(moduleId: string): Promise<Permission[]>;
    update(id: string, permission: Partial<NewPermission>): Promise<Permission>;
    delete(id: string): Promise<void>;
}
