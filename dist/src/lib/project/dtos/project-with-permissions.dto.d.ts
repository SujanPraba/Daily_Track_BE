export declare class PermissionDto {
    id: string;
    name: string;
    description?: string;
    moduleId: string;
    moduleName: string;
    moduleCode: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class RoleWithPermissionsDto {
    id: string;
    name: string;
    description?: string;
    level: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: PermissionDto[];
}
export declare class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department?: string;
    position?: string;
    employeeId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class TeamDto {
    id: string;
    name: string;
    description?: string;
    leadId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: UserDto[];
}
export declare class ProjectWithPermissionsDto {
    id: string;
    name: string;
    description?: string;
    code: string;
    managerId?: string;
    status: string;
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    roles: RoleWithPermissionsDto[];
    teams: TeamDto[];
}
