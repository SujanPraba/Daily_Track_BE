import { DailyUpdate, NewDailyUpdate } from '../../../database/schemas/daily-update.schema';
export declare class DailyUpdateRepository {
    private readonly db;
    constructor(db: any);
    create(dailyUpdate: NewDailyUpdate): Promise<DailyUpdate>;
    findAll(): Promise<DailyUpdate[]>;
    findById(id: string): Promise<DailyUpdate | null>;
    findByUser(userId: string): Promise<DailyUpdate[]>;
    findByProject(projectId: string): Promise<DailyUpdate[]>;
    findByStatus(status: string): Promise<DailyUpdate[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<DailyUpdate[]>;
    update(id: string, dailyUpdate: Partial<NewDailyUpdate>): Promise<DailyUpdate>;
    delete(id: string): Promise<void>;
}
