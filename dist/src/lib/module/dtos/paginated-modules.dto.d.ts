import { Module } from '../../../database/schemas/module.schema';
export declare class PaginatedModulesDto {
    data: Module[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
