import { PermissionRepository } from '../repositories/permission.repository';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { Permission } from '../../../database/schemas/permission.schema';
export declare class PermissionService {
    private readonly permissionRepository;
    constructor(permissionRepository: PermissionRepository);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findOne(id: string): Promise<Permission>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: string): Promise<void>;
    findByModule(module: string): Promise<Permission[]>;
}
