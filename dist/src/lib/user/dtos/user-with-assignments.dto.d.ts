export declare class UserProjectRoleDto {
    projectId: string;
    projectName: string;
    roleId: string;
    roleName: string;
    teamId?: string;
    teamName?: string;
    assignedAt: Date;
}
export declare class UserWithAssignmentsDto {
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
    projectRoles: UserProjectRoleDto[];
    teamIds: string[];
}
