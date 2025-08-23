import { UserWithAssignmentsDto } from './user-with-assignments.dto';
export declare class PaginatedUsersDto {
    data: UserWithAssignmentsDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
