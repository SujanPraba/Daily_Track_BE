export declare class SearchDailyUpdatesDto {
    userId?: string;
    projectId?: string;
    teamId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    tickets?: string;
    page?: number;
    limit?: number;
}
export declare class TimeTrackingDto {
    projectId?: string;
    teamId?: string;
    startDate: string;
    endDate: string;
    filterTimeBy: 'day' | 'fullTime';
}
export declare class TimeTrackingResponseDto {
    userId: string;
    userName: string;
    projectId: string;
    projectName: string;
    teamId?: string;
    teamName?: string;
    date: string;
    internalMeetingHours: string;
    externalMeetingHours: string;
    otherActivityHours: string;
    ticketsHours: string;
    leavePermissionHours: string;
    totalHours: string;
}
export declare class TimeTrackingSummaryResponseDto {
    userId: string;
    userName: string;
    projectId: string;
    projectName: string;
    teamId?: string;
    teamName?: string;
    totalInternalMeetingHours: string;
    totalExternalMeetingHours: string;
    totalOtherActivityHours: string;
    totalTicketsHours: string;
    totalLeavePermissionHours: string;
    grandTotalHours: string;
}
