export declare class ZohoLogTimeEntry {
    ticketId: string;
    activityType: string;
    hours: number;
    description?: string;
    logDate: string;
}
export declare class ZohoSyncDailyUpdateDto {
    userId: string;
    projectId: string;
    teamId?: string;
    date: string;
    tickets?: string;
    ticketsHours?: string;
    internalMeetingHours?: string;
    externalMeetingHours?: string;
    otherActivities?: string;
    otherActivityHours?: string;
    leavePermissionHours?: string;
    notes?: string;
    syncToZoho?: boolean;
    zohoUserId?: string;
    zohoProjectId?: string;
    zohoLogTimeEntries?: ZohoLogTimeEntry[];
    zohoDraft?: boolean;
}
export declare class ZohoSyncResponseDto {
    id: string;
    message: string;
    success: boolean;
    createdAt: string;
    zohoSyncDetails?: {
        synced: boolean;
        zohoEntries: number;
        errors: string[];
        zohoResponse?: any;
    };
}
