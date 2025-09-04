import { ConfigService } from '@nestjs/config';
import { ZohoLogTimeEntry } from '../dtos/zoho-sync-daily-update.dto';
export interface ZohoPeopleConfig {
    baseUrl: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    organizationId: string;
}
export interface ZohoLogTimeRequest {
    user_id: string;
    project_id: string;
    date: string;
    hours: number;
    activity_type: string;
    description?: string;
    ticket_id?: string;
    is_draft?: boolean;
}
export interface ZohoLogTimeResponse {
    status: {
        code: number;
        description: string;
    };
    data: {
        log_time_id: string;
        user_id: string;
        project_id: string;
        date: string;
        hours: number;
        activity_type: string;
        description?: string;
        ticket_id?: string;
        is_draft: boolean;
        created_time: string;
        modified_time: string;
    };
}
export declare class ZohoPeopleService {
    private readonly configService;
    private readonly logger;
    private accessToken;
    private tokenExpiry;
    constructor(configService: ConfigService);
    private getZohoConfig;
    private getAccessToken;
    createLogTimeEntry(logTimeData: ZohoLogTimeRequest): Promise<ZohoLogTimeResponse>;
    createMultipleLogTimeEntries(userId: string, projectId: string, date: string, logTimeEntries: ZohoLogTimeEntry[], isDraft?: boolean): Promise<{
        success: boolean;
        entries: number;
        errors: string[];
        responses: any[];
    }>;
    testConnection(): Promise<{
        success: boolean;
        message: string;
        details?: any;
    }>;
    getActivityTypes(): Promise<string[]>;
}
