import { DailyUpdateWithTeamDto } from './daily-update-with-team.dto';
export declare class PaginatedDailyUpdatesDto {
    data: DailyUpdateWithTeamDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
