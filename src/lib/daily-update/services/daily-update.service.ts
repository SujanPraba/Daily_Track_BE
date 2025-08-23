import { Injectable, NotFoundException } from '@nestjs/common';
import { DailyUpdateRepository } from '../repositories/daily-update.repository';
import { UserService } from '../../user/services/user.service';
import { ProjectService } from '../../project/services/project.service';
import { CreateDailyUpdateDto } from '../dtos/create-daily-update.dto';
import { UpdateDailyUpdateDto } from '../dtos/update-daily-update.dto';
import { SearchDailyUpdatesDto } from '../dtos/search-daily-updates.dto';
import { PaginatedDailyUpdatesDto } from '../dtos/paginated-daily-updates.dto';
import { DailyUpdateWithTeamDto } from '../dtos/daily-update-with-team.dto';
import { DailyUpdate } from '../../../database/schemas/daily-update.schema';

@Injectable()
export class DailyUpdateService {
  constructor(
    private readonly dailyUpdateRepository: DailyUpdateRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createDailyUpdateDto: CreateDailyUpdateDto): Promise<DailyUpdate> {
    // Verify user and project exist
    await this.userService.findOne(createDailyUpdateDto.userId);
    await this.projectService.findOne(createDailyUpdateDto.projectId);

    // Calculate total hours
    const totalHours = (
      parseFloat(createDailyUpdateDto.internalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.externalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.otherActivityHours || '0')
    ).toString();

    const updateData: Omit<DailyUpdate, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: createDailyUpdateDto.userId,
      projectId: createDailyUpdateDto.projectId,
      teamId: createDailyUpdateDto.teamId || null,
      date: new Date(createDailyUpdateDto.date),
      tickets: createDailyUpdateDto.tickets || null,
      internalMeetingHours: createDailyUpdateDto.internalMeetingHours || '0',
      externalMeetingHours: createDailyUpdateDto.externalMeetingHours || '0',
      otherActivities: createDailyUpdateDto.otherActivities || null,
      otherActivityHours: createDailyUpdateDto.otherActivityHours || '0',
      totalHours,
      notes: createDailyUpdateDto.notes || null,
      status: 'PENDING',
      submittedAt: null,
      approvedAt: null,
      approvedBy: null
    };

    return this.dailyUpdateRepository.create(updateData);
  }

  async findAll(): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findAll();
  }

  async findOne(id: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.dailyUpdateRepository.findById(id);
    if (!dailyUpdate) {
      throw new NotFoundException('Daily update not found');
    }
    return dailyUpdate;
  }

  async update(id: string, updateDailyUpdateDto: UpdateDailyUpdateDto): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);

    // Recalculate total hours if time fields are being updated
    const currentUpdate = await this.findOne(id);
    const updateData: Partial<DailyUpdate> = {};

    // Copy only the fields we want to update
    Object.keys(updateDailyUpdateDto).forEach(key => {
      if (updateDailyUpdateDto[key] !== undefined) {
        updateData[key] = updateDailyUpdateDto[key];
      }
    });

    // Convert date string to Date object if present
    if (updateDailyUpdateDto.date) {
      updateData.date = new Date(updateDailyUpdateDto.date);
    }

    // Handle hours calculation
    if (
      updateDailyUpdateDto.internalMeetingHours ||
      updateDailyUpdateDto.externalMeetingHours ||
      updateDailyUpdateDto.otherActivityHours
    ) {
      const internalHours = updateDailyUpdateDto.internalMeetingHours || 
        (currentUpdate.internalMeetingHours?.toString() || '0');
      const externalHours = updateDailyUpdateDto.externalMeetingHours || 
        (currentUpdate.externalMeetingHours?.toString() || '0');
      const otherHours = updateDailyUpdateDto.otherActivityHours || 
        (currentUpdate.otherActivityHours?.toString() || '0');

      const totalHours = (
        parseFloat(internalHours) +
        parseFloat(externalHours) +
        parseFloat(otherHours)
      ).toString();

      updateData.totalHours = totalHours;
    }

    return this.dailyUpdateRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    const dailyUpdate = await this.findOne(id);
    await this.dailyUpdateRepository.delete(id);
  }

  async findByUser(userId: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByUser(userId);
  }

  async findByProject(projectId: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByProject(projectId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByDateRange(startDate, endDate);
  }

  async findByStatus(status: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByStatus(status);
  }

  async searchDailyUpdates(
    searchDto: SearchDailyUpdatesDto,
    currentUserId: string
  ): Promise<PaginatedDailyUpdatesDto> {
    // Check if user has VIEW_DAILY_UPDATES_FULL permission
    const hasFullPermission = await this.userService.hasPermission(
      currentUserId,
      'VIEW_DAILY_UPDATES_FULL'
    );

    let projectIds: string[] = [];
    
    // If user doesn't have full permission, get their project IDs
    if (!hasFullPermission) {
      projectIds = await this.userService.getUserProjectIds(currentUserId);
      
      // If user has no projects, return empty result
      if (projectIds.length === 0) {
        return {
          data: [],
          total: 0,
          page: searchDto.page || 1,
          limit: searchDto.limit || 10,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        };
      }
    }

    // Build search criteria
    const searchCriteria: any = {};
    
    if (searchDto.userId) {
      searchCriteria.userId = searchDto.userId;
    }
    
    if (searchDto.projectId) {
      searchCriteria.projectId = searchDto.projectId;
    } else if (!hasFullPermission) {
      // If no specific project filter and user doesn't have full permission, 
      // restrict to their projects
      searchCriteria.projectId = projectIds;
    }
    
    if (searchDto.teamId) {
      searchCriteria.teamId = searchDto.teamId;
    }
    
    if (searchDto.status) {
      searchCriteria.status = searchDto.status;
    }
    
    if (searchDto.tickets) {
      searchCriteria.tickets = searchDto.tickets;
    }
    
    if (searchDto.startDate && searchDto.endDate) {
      searchCriteria.startDate = new Date(searchDto.startDate);
      searchCriteria.endDate = new Date(searchDto.endDate);
    }

    const page = searchDto.page || 1;
    const limit = searchDto.limit || 10;
    const offset = (page - 1) * limit;

    // Get paginated results
    const [rawData, total] = await Promise.all([
      this.dailyUpdateRepository.searchWithPagination(searchCriteria, limit, offset),
      this.dailyUpdateRepository.countWithCriteria(searchCriteria)
    ]);

    // Transform the raw data to match the DTO structure
    const data: DailyUpdateWithTeamDto[] = rawData.map(item => ({
      id: item.id,
      userId: item.userId,
      projectId: item.projectId,
      teamId: item.teamId,
      date: item.date,
      tickets: item.tickets,
      internalMeetingHours: item.internalMeetingHours,
      externalMeetingHours: item.externalMeetingHours,
      otherActivities: item.otherActivities,
      otherActivityHours: item.otherActivityHours,
      totalHours: item.totalHours,
      notes: item.notes,
      status: item.status,
      submittedAt: item.submittedAt,
      approvedAt: item.approvedAt,
      approvedBy: item.approvedBy,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      teamName: item.teamName,
      teamDescription: item.teamDescription,
    }));

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
    };
  }

  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    return this.userService.hasPermission(userId, permissionName);
  }

  async getUserProjectIds(userId: string): Promise<string[]> {
    return this.userService.getUserProjectIds(userId);
  }

  async getTeamByProject(projectId: string): Promise<{ id: string; name: string; description: string | null } | null> {
    const result = await this.dailyUpdateRepository.getTeamByProject(projectId);
    return result;
  }

  async approve(id: string, approverId: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);
    await this.userService.findOne(approverId);

    return this.dailyUpdateRepository.update(id, {
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedBy: approverId,
    });
  }

  async submit(id: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);

    return this.dailyUpdateRepository.update(id, {
      status: 'SUBMITTED',
      submittedAt: new Date(),
    });
  }
}