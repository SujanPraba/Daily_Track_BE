export declare class UserProjectRoleResponseDto {
    project: {
        id: string;
        name: string;
        description?: string;
        code: string;
        status: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    role: {
        id: string;
        name: string;
        description?: string;
        level: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    team?: {
        id: string;
        name: string;
        description?: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    assignedAt: Date;
}
