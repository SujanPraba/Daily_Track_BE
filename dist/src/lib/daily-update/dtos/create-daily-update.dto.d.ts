export declare class CreateDailyUpdateDto {
    userId: string;
    projectId: string;
    teamId?: string;
    date: string;
    tickets?: string;
    internalMeetingHours?: string;
    externalMeetingHours?: string;
    otherActivities?: string;
    otherActivityHours?: string;
    notes?: string;
}
