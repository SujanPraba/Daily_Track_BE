export declare class PermissionWithModuleDto {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ModuleWithPermissionsDto {
    id: string;
    name: string;
    description?: string;
    code: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: PermissionWithModuleDto[];
}
