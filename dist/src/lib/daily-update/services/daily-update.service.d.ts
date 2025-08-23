import { DailyUpdateRepository } from '../repositories/daily-update.repository';
import { UserService } from '../../user/services/user.service';
import { ProjectService } from '../../project/services/project.service';
import { CreateDailyUpdateDto } from '../dtos/create-daily-update.dto';
import { UpdateDailyUpdateDto } from '../dtos/update-daily-update.dto';
import { SearchDailyUpdatesDto } from '../dtos/search-daily-updates.dto';
import { PaginatedDailyUpdatesDto } from '../dtos/paginated-daily-updates.dto';
import { DailyUpdate } from '../../../database/schemas/daily-update.schema';
export declare class DailyUpdateService {
    private readonly dailyUpdateRepository;
    private readonly userService;
    private readonly projectService;
    constructor(dailyUpdateRepository: DailyUpdateRepository, userService: UserService, projectService: ProjectService);
    create(createDailyUpdateDto: CreateDailyUpdateDto): Promise<DailyUpdate>;
    findAll(): Promise<DailyUpdate[]>;
    findOne(id: string): Promise<DailyUpdate>;
    update(id: string, updateDailyUpdateDto: UpdateDailyUpdateDto): Promise<DailyUpdate>;
    remove(id: string): Promise<void>;
    findByUser(userId: string): Promise<DailyUpdate[]>;
    findByProject(projectId: string): Promise<DailyUpdate[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<DailyUpdate[]>;
    findByStatus(status: string): Promise<DailyUpdate[]>;
    searchDailyUpdates(searchDto: SearchDailyUpdatesDto, currentUserId: string): Promise<PaginatedDailyUpdatesDto>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    getUserProjectIds(userId: string): Promise<string[]>;
    getTeamByProject(projectId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
    } | null>;
    approve(id: string, approverId: string): Promise<DailyUpdate>;
    submit(id: string): Promise<DailyUpdate>;
}
