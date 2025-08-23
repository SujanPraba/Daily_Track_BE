import { Role, NewRole } from '../../../database/schemas/role.schema';
import { SearchRolesDto } from '../dtos/search-roles.dto';
import { PaginatedRolesDto } from '../dtos/paginated-roles.dto';
export declare class RoleRepository {
    private readonly db;
    constructor(db: any);
    create(role: NewRole): Promise<Role>;
    findAll(): Promise<Role[]>;
    searchRoles(searchDto: SearchRolesDto): Promise<PaginatedRolesDto>;
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    update(id: string, role: Partial<NewRole>): Promise<Role>;
    delete(id: string): Promise<void>;
    assignPermissions(roleId: string, permissionIds: string[]): Promise<void>;
    getRolePermissions(roleId: string): Promise<any>;
}
