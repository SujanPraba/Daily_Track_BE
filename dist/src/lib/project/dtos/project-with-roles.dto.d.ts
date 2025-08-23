export declare class ProjectRoleDto {
    id: string;
    name: string;
    description?: string;
    level: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ProjectTeamDto {
    id: string;
    name: string;
    description?: string;
    leadId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ProjectWithRolesAndTeamsDto {
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
    roles: ProjectRoleDto[];
    teams: ProjectTeamDto[];
}
