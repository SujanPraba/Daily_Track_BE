import { ModulePermissionDto } from './module-permission.dto';
export declare class ModuleResponseDto {
    id: string;
    name: string;
    description?: string;
    code: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: ModulePermissionDto[];
}
