import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { AssignPermissionsDto } from '../dtos/assign-permissions.dto';
import { Role } from '../../../database/schemas/role.schema';
export declare class RoleService {
    private readonly roleRepository;
    constructor(roleRepository: RoleRepository);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: string): Promise<Role>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: string): Promise<void>;
    assignPermissions(roleId: string, assignPermissionsDto: AssignPermissionsDto): Promise<void>;
    getRolePermissions(roleId: string): Promise<any>;
}
