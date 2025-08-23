import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { AssignPermissionsDto } from '../dtos/assign-permissions.dto';
import { SearchRolesDto } from '../dtos/search-roles.dto';
import { PaginatedRolesDto } from '../dtos/paginated-roles.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(createRoleDto: CreateRoleDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        level: string;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        level: string;
    }[]>;
    searchRoles(searchDto: SearchRolesDto): Promise<PaginatedRolesDto>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        level: string;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        level: string;
    }>;
    remove(id: string): Promise<void>;
    assignPermissions(id: string, assignPermissionsDto: AssignPermissionsDto): Promise<void>;
    getRolePermissions(id: string): Promise<any>;
}
