import { Role } from '../../../database/schemas/role.schema';
export declare class PaginatedRolesDto {
    data: Role[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
