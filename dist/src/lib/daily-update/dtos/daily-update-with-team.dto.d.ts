export declare class DailyUpdateWithTeamDto {
    id: string;
    userId: string;
    projectId: string;
    teamId: string | null;
    date: Date;
    tickets: string | null;
    ticketsHours: string;
    internalMeetingHours: string;
    externalMeetingHours: string;
    otherActivities: string | null;
    otherActivityHours: string;
    leavePermissionHours: string;
    totalHours: string;
    notes: string | null;
    status: string;
    submittedAt: Date | null;
    approvedAt: Date | null;
    approvedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
    teamName: string | null;
    teamDescription: string | null;
}
