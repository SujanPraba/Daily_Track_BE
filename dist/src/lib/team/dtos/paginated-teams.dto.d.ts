import { TeamResponseDto } from './team-response.dto';
export declare class PaginatedTeamsDto {
    data: TeamResponseDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
