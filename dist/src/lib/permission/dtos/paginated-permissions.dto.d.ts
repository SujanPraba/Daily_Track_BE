import { PermissionResponseDto } from './permission-response.dto';
export declare class PaginatedPermissionsDto {
    data: PermissionResponseDto[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
