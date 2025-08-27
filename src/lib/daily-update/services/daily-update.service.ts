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
      parseFloat(createDailyUpdateDto.ticketsHours || '0') +
      parseFloat(createDailyUpdateDto.internalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.externalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.otherActivityHours || '0') +
      parseFloat(createDailyUpdateDto.leavePermissionHours || '0')
    ).toString();

    const updateData: Omit<DailyUpdate, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: createDailyUpdateDto.userId,
      projectId: createDailyUpdateDto.projectId,
      teamId: createDailyUpdateDto.teamId || null,
      date: new Date(createDailyUpdateDto.date),
      tickets: createDailyUpdateDto.tickets || null,
      ticketsHours: createDailyUpdateDto.ticketsHours || '0',
      internalMeetingHours: createDailyUpdateDto.internalMeetingHours || '0',
      externalMeetingHours: createDailyUpdateDto.externalMeetingHours || '0',
      otherActivities: createDailyUpdateDto.otherActivities || null,
      otherActivityHours: createDailyUpdateDto.otherActivityHours || '0',
      leavePermissionHours: createDailyUpdateDto.leavePermissionHours || '0',
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
      updateDailyUpdateDto.ticketsHours ||
      updateDailyUpdateDto.internalMeetingHours ||
      updateDailyUpdateDto.externalMeetingHours ||
      updateDailyUpdateDto.otherActivityHours ||
      updateDailyUpdateDto.leavePermissionHours
    ) {
      const ticketsHours = updateDailyUpdateDto.ticketsHours ||
        (currentUpdate.ticketsHours?.toString() || '0');
      const internalHours = updateDailyUpdateDto.internalMeetingHours ||
        (currentUpdate.internalMeetingHours?.toString() || '0');
      const externalHours = updateDailyUpdateDto.externalMeetingHours ||
        (currentUpdate.externalMeetingHours?.toString() || '0');
      const otherHours = updateDailyUpdateDto.otherActivityHours ||
        (currentUpdate.otherActivityHours?.toString() || '0');
      const leavePermissionHours = updateDailyUpdateDto.leavePermissionHours ||
        (currentUpdate.leavePermissionHours?.toString() || '0');

      const totalHours = (
        parseFloat(ticketsHours) +
        parseFloat(internalHours) +
        parseFloat(externalHours) +
        parseFloat(otherHours) +
        parseFloat(leavePermissionHours)
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
    console.log(`🔍 Search request from user ${currentUserId} with criteria:`, searchDto);

    // Check if user has VIEW_DAILY_UPDATES_FULL permission
    const hasFullPermission = await this.userService.hasPermission(
      currentUserId,
      'VIEW_DAILY_UPDATES_FULL'
    );

    // Check if user has basic VIEW_DAILY_UPDATES permission
    const hasBasicPermission = await this.userService.hasPermission(
      currentUserId,
      'VIEW_DAILY_UPDATES'
    );

    console.log(`🔐 User permissions - VIEW_DAILY_UPDATES_FULL: ${hasFullPermission}, VIEW_DAILY_UPDATES: ${hasBasicPermission}`);

    if (!hasBasicPermission && !hasFullPermission) {
      console.log(`❌ User ${currentUserId} has no permission to view daily updates`);
      // User has no permission to view daily updates
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

    let projectIds: string[] = [];

    // Get user's project IDs
    projectIds = await this.userService.getUserProjectIds(currentUserId);
    console.log(`📋 User ${currentUserId} has access to projects:`, projectIds);

    // If user has no projects, return empty result
    if (projectIds.length === 0) {
      console.log(`❌ User ${currentUserId} has no projects assigned`);
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

    // Build search criteria
    const searchCriteria: any = {};

    // Handle userId filter based on permissions
    if (searchDto.userId) {
      if (hasFullPermission) {
        // Users with VIEW_DAILY_UPDATES_FULL can filter by any user within their projects
        searchCriteria.userId = searchDto.userId;
        console.log(`✅ User with VIEW_DAILY_UPDATES_FULL can filter by userId: ${searchDto.userId}`);
      } else {
        // Users with only VIEW_DAILY_UPDATES can only see their own updates
        // If they try to filter by another user, ignore the filter and show only their own
        searchCriteria.userId = currentUserId;
        console.log(`⚠️ User with only VIEW_DAILY_UPDATES - ignoring requested userId ${searchDto.userId}, showing own updates only`);
      }
    } else if (!hasFullPermission) {
      // If no userId specified and user doesn't have full permission,
      // restrict to their own updates
      searchCriteria.userId = currentUserId;
      console.log(`🔒 User without VIEW_DAILY_UPDATES_FULL - restricting to own updates only`);
    }
    // Note: If user has VIEW_DAILY_UPDATES_FULL and no userId specified,
    // we don't add userId filter, allowing them to see all updates

    if (searchDto.projectId) {
      // If user doesn't have full permission and specified project is not in their projects, return empty
      if (!hasFullPermission && !projectIds.includes(searchDto.projectId)) {
        console.log(`❌ User ${currentUserId} tried to access project ${searchDto.projectId} without permission`);
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
      searchCriteria.projectId = searchDto.projectId;
      console.log(`✅ Project filter applied: ${searchDto.projectId}`);
    } else if (!hasFullPermission) {
      // If no specific project filter and user doesn't have full permission, 
      // restrict to their projects
      searchCriteria.projectId = projectIds;
      console.log(`🔒 Restricting to user's projects:`, projectIds);
    }
    // Note: If user has VIEW_DAILY_UPDATES_FULL and no projectId specified,
    // we don't add projectId filter, allowing them to see updates from all their projects
    
    if (searchDto.teamId) {
      searchCriteria.teamId = searchDto.teamId;
      console.log(`✅ Team filter applied: ${searchDto.teamId}`);
    }
    
    if (searchDto.status) {
      searchCriteria.status = searchDto.status;
      console.log(`✅ Status filter applied: ${searchDto.status}`);
    }
    
    if (searchDto.tickets) {
      searchCriteria.tickets = searchDto.tickets;
      console.log(`✅ Tickets filter applied: ${searchDto.tickets}`);
    }
    
    if (searchDto.startDate && searchDto.endDate) {
      searchCriteria.startDate = new Date(searchDto.startDate);
      searchCriteria.endDate = new Date(searchDto.endDate);
      console.log(`✅ Date range filter applied: ${searchDto.startDate} to ${searchDto.endDate}`);
    }

    console.log(`🔍 Final search criteria:`, searchCriteria);
    console.log(`🔐 Permission summary - hasFullPermission: ${hasFullPermission}, hasBasicPermission: ${hasBasicPermission}`);
    console.log(`📋 User project IDs: ${projectIds.join(', ')}`);

    const page = searchDto.page || 1;
    const limit = searchDto.limit || 10;
    const offset = (page - 1) * limit;

    console.log(`📄 Pagination - page: ${page}, limit: ${limit}, offset: ${offset}`);

    // Get paginated results
    const [rawData, total] = await Promise.all([
      this.dailyUpdateRepository.searchWithPagination(searchCriteria, limit, offset),
      this.dailyUpdateRepository.countWithCriteria(searchCriteria)
    ]);

    console.log(`📊 Raw data count: ${rawData.length}, Total count: ${total}`);
    if (rawData.length > 0) {
      console.log(`📝 Sample raw data:`, {
        id: rawData[0].id,
        userId: rawData[0].userId,
        projectId: rawData[0].projectId,
        teamId: rawData[0].teamId
      });
    }

    // Additional filtering based on permissions (double-check for security)
    let filteredData = rawData;
    
    if (hasFullPermission) {
      // VIEW_DAILY_UPDATES_FULL: Show all updates under user's projects
      filteredData = rawData.filter(item => 
        projectIds.includes(item.projectId)
      );
      console.log(`👁️ VIEW_DAILY_UPDATES_FULL: Showing ${filteredData.length} updates across user's projects`);
    } else {
      // VIEW_DAILY_UPDATES: Show only user's own updates
      filteredData = rawData.filter(item => 
        item.userId === currentUserId
      );
      console.log(`👤 VIEW_DAILY_UPDATES: Showing ${filteredData.length} updates for user ${currentUserId} only`);
    }

    // Transform the filtered data to match the DTO structure
    const data: DailyUpdateWithTeamDto[] = filteredData.map(item => ({
      id: item.id,
      userId: item.userId,
      projectId: item.projectId,
      teamId: item.teamId,
      date: item.date,
      tickets: item.tickets,
      ticketsHours: item.ticketsHours,
      internalMeetingHours: item.internalMeetingHours,
      externalMeetingHours: item.externalMeetingHours,
      otherActivities: item.otherActivities,
      otherActivityHours: item.otherActivityHours,
      leavePermissionHours: item.leavePermissionHours,
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

    const totalPages = Math.ceil(filteredData.length / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    console.log(`✅ Search completed - Returning ${filteredData.length} results, page ${page}/${totalPages}`);

    return {
      data,
      total: filteredData.length,
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

  async getTimeTracking(timeTrackingDto: any, currentUserId: string): Promise<any[]> {
    const { projectId, teamId, startDate, endDate, filterTimeBy } = timeTrackingDto;
    
    console.log('Getting time tracking with criteria:', { projectId, teamId, startDate, endDate, filterTimeBy });
    console.log('Current user ID:', currentUserId);
    
    // Set default date range if not provided (last 30 days)
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);
    
    const searchStartDate = startDate ? new Date(startDate) : defaultStartDate;
    const searchEndDate = endDate ? new Date(endDate) : new Date();
    
    console.log('Using date range:', { searchStartDate, searchEndDate });
    
    // Check user permissions
    const hasFullPermission = await this.userService.hasPermission(
      currentUserId,
      'VIEW_DAILY_UPDATES_FULL'
    );
    
    console.log('User has VIEW_DAILY_UPDATES_FULL permission:', hasFullPermission);
    
    let userProjectIds: string[] = [];
    
    // Get user's project IDs
    userProjectIds = await this.userService.getUserProjectIds(currentUserId);
    console.log('User project IDs:', userProjectIds);
    
    // If user has no projects, return empty result
    if (userProjectIds.length === 0) {
      console.log('User has no projects assigned');
      return [];
    }
    
    // Build search criteria
    let searchProjectId = projectId;
    let searchTeamId = teamId;
    
    // If no specific project filter, restrict to user's projects
    if (!projectId) {
      searchProjectId = userProjectIds[0]; // Use first project as default
      console.log('Restricting to user project:', searchProjectId);
    }
    
    // If specified project is not in user's projects, return empty
    if (projectId && !userProjectIds.includes(projectId)) {
      console.log('User does not have access to specified project');
      return [];
    }
    
    // Get daily updates with team information for the date range
    const dailyUpdates = await this.dailyUpdateRepository.findDailyUpdatesWithTeamInfo(
      searchStartDate,
      searchEndDate,
      searchProjectId,
      searchTeamId
    );

    console.log('Raw daily updates from DB:', JSON.stringify(dailyUpdates, null, 2));

    if (!dailyUpdates || dailyUpdates.length === 0) {
      console.log('No daily updates found for the given criteria');
      return [];
    }

    // Filter updates based on user permissions
    let filteredUpdates = dailyUpdates;
    
    if (hasFullPermission) {
      // VIEW_DAILY_UPDATES_FULL: Show all updates under user's projects
      filteredUpdates = dailyUpdates.filter(update => 
        userProjectIds.includes(update.projectId)
      );
      console.log('Full permission: showing all updates under user projects, count:', filteredUpdates.length);
    } else {
      // VIEW_DAILY_UPDATES: Show only user's own updates
      filteredUpdates = dailyUpdates.filter(update => 
        update.userId === currentUserId
      );
      console.log('Limited permission: showing only user updates, count:', filteredUpdates.length);
    }

    if (filterTimeBy === 'fullTime') {
      // Return summary totals
      return this.calculateSummaryTotals(filteredUpdates);
    } else {
      // Return daily breakdown
      return this.calculateDailyBreakdown(filteredUpdates);
    }
  }

  private async calculateSummaryTotals(dailyUpdates: any[]): Promise<any[]> {
    const userMap = new Map();

    for (const update of dailyUpdates) {
      const key = `${update.userId}-${update.projectId}-${update.teamId || 'no-team'}`;
      
      if (!userMap.has(key)) {
        const user = await this.userService.findOne(update.userId);
        const project = await this.projectService.findOne(update.projectId);
        
        userMap.set(key, {
          userId: update.userId,
          userName: user.firstName + ' ' + user.lastName,
          projectId: update.projectId,
          projectName: project.name,
          teamId: update.teamId,
          teamName: update.teamName,
          totalInternalMeetingHours: '0',
          totalExternalMeetingHours: '0',
          totalOtherActivityHours: '0',
          totalTicketsHours: '0',
          totalLeavePermissionHours: '0',
          grandTotalHours: '0',
        });
      }

      const userData = userMap.get(key);
      userData.totalInternalMeetingHours = (
        parseFloat(userData.totalInternalMeetingHours) + 
        parseFloat(update.internalMeetingHours?.toString() || '0')
      ).toFixed(2);
      userData.totalExternalMeetingHours = (
        parseFloat(userData.totalExternalMeetingHours) + 
        parseFloat(update.externalMeetingHours?.toString() || '0')
      ).toFixed(2);
      userData.totalOtherActivityHours = (
        parseFloat(userData.totalOtherActivityHours) + 
        parseFloat(update.otherActivityHours?.toString() || '0')
      ).toFixed(2);
      userData.totalTicketsHours = (
        parseFloat(userData.totalTicketsHours) + 
        0 // Temporarily set to 0 until migration is run
      ).toFixed(2);
      userData.totalLeavePermissionHours = (
        parseFloat(userData.totalLeavePermissionHours) + 
        0 // Temporarily set to 0 until migration is run
      ).toFixed(2);
      userData.grandTotalHours = (
        parseFloat(userData.totalInternalMeetingHours) +
        parseFloat(userData.totalExternalMeetingHours) +
        parseFloat(userData.totalOtherActivityHours) +
        parseFloat(userData.totalTicketsHours) +
        parseFloat(userData.totalLeavePermissionHours)
      ).toFixed(2);
    }

    return Array.from(userMap.values());
  }

  private async calculateDailyBreakdown(dailyUpdates: any[]): Promise<any[]> {
    const result: any[] = [];

    for (const update of dailyUpdates) {
      const user = await this.userService.findOne(update.userId);
      const project = await this.projectService.findOne(update.projectId);

      result.push({
        userId: update.userId,
        userName: user.firstName + ' ' + user.lastName,
        projectId: update.projectId,
        projectName: project.name,
        teamId: update.teamId,
        teamName: update.teamName,
        date: update.date.toISOString().split('T')[0],
        internalMeetingHours: update.internalMeetingHours?.toString() || '0',
        externalMeetingHours: update.externalMeetingHours?.toString() || '0',
        otherActivityHours: update.otherActivityHours?.toString() || '0',
        ticketsHours: '0', // Temporarily set to 0 until migration is run
        leavePermissionHours: '0', // Temporarily set to 0 until migration is run
        totalHours: update.totalHours?.toString() || '0',
      });
    }

    return result;
  }
}