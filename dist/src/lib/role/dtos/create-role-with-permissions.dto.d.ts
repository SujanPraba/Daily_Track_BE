export declare class ModulePermissionDto {
    moduleId: string;
    permissionId: string;
}
export declare class CreateRoleWithPermissionsDto {
    name: string;
    description?: string;
    level?: string;
    isActive?: boolean;
    modulePermissions?: ModulePermissionDto[];
}
