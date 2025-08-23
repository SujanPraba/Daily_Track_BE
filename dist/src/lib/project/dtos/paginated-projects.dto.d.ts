import { ProjectWithRolesAndTeamsDto } from './project-with-roles.dto';
export declare class PaginatedProjectsDto {
    data: ProjectWithRolesAndTeamsDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
