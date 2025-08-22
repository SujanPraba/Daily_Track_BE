import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        module: string;
        action: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    findAll(module?: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        module: string;
        action: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        module: string;
        action: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        module: string;
        action: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    remove(id: string): Promise<void>;
}
