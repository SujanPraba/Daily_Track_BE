export declare class DailyUpdateWithTeamDto {
    id: string;
    userId: string;
    projectId: string;
    teamId: string | null;
    date: Date;
    tickets: string | null;
    internalMeetingHours: string;
    externalMeetingHours: string;
    otherActivities: string | null;
    otherActivityHours: string;
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
