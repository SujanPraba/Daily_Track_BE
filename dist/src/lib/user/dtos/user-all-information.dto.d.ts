export declare class UserTeamDto {
    id: string;
    name: string;
    description?: string;
    leadId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UserRoleDto {
    id: string;
    name: string;
    description?: string;
    level: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    permissions: string[];
}
export declare class UserProjectDto {
    id: string;
    name: string;
    description?: string;
    code: string;
    status: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    teams: UserTeamDto[];
    roles: UserRoleDto[];
}
export declare class UserAllInformationDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    department?: string;
    position?: string;
    employeeId?: string;
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    projects: UserProjectDto[];
    commonPermissions: string[];
}
