import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DailyUpdateService } from '../services/daily-update.service';
import { CreateDailyUpdateDto } from '../dtos/create-daily-update.dto';
import { UpdateDailyUpdateDto } from '../dtos/update-daily-update.dto';
import { ApproveDailyUpdateDto } from '../dtos/approve-daily-update.dto';
import { SearchDailyUpdatesDto, TimeTrackingDto, TimeTrackingResponseDto } from '../dtos/search-daily-updates.dto';
import { PaginatedDailyUpdatesDto } from '../dtos/paginated-daily-updates.dto';
import { DailyUpdateWithTeamDto } from '../dtos/daily-update-with-team.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Daily Updates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('daily-updates')
export class DailyUpdateController {
  constructor(private readonly dailyUpdateService: DailyUpdateService) {}

  @ApiOperation({ summary: 'Create a new daily update' })
  @ApiResponse({ status: 201, description: 'Daily update created successfully' })
  @Post()
  create(@Body() createDailyUpdateDto: CreateDailyUpdateDto) {
    return this.dailyUpdateService.create(createDailyUpdateDto);
  }

  @ApiOperation({ summary: 'Search and filter daily updates with pagination and team information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of daily updates with team information', 
    type: PaginatedDailyUpdatesDto 
  })
  @Post('search')
  async searchDailyUpdates(
    @Body() searchDto: SearchDailyUpdatesDto,
    @Request() req: any
  ): Promise<PaginatedDailyUpdatesDto> {
    // Extract user ID from JWT token
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    return this.dailyUpdateService.searchDailyUpdates(searchDto, userId);
  }

  @ApiOperation({ summary: 'Get all daily updates (legacy endpoint)' })
  @ApiResponse({ status: 200, description: 'List of all daily updates' })
  @Get()
  async findAll(@Request() req: any) {
    // Extract user ID from JWT token
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    // Check if user has VIEW_DAILY_UPDATES_FULL permission
    const hasFullPermission = await this.dailyUpdateService.hasPermission(
      userId,
      'VIEW_DAILY_UPDATES_FULL'
    );

    if (hasFullPermission) {
      return this.dailyUpdateService.findAll();
    } else {
      // Get user's project IDs and return only those updates
      const projectIds = await this.dailyUpdateService.getUserProjectIds(userId);
      if (projectIds.length === 0) {
        return [];
      }
      
      // For now, return updates from the first project (you might want to enhance this)
      return this.dailyUpdateService.findByProject(projectIds[0]);
    }
  }

  @ApiOperation({ summary: 'Get daily update by ID' })
  @ApiResponse({ status: 200, description: 'Daily update found' })
  @ApiResponse({ status: 404, description: 'Daily update not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyUpdateService.findOne(id);
  }

  @ApiOperation({ summary: 'Get team information for a project' })
  @ApiResponse({ status: 200, description: 'Team information found' })
  @ApiResponse({ status: 404, description: 'Team not found for this project' })
  @Get('project/:projectId/team')
  async getTeamByProject(@Param('projectId') projectId: string) {
    return this.dailyUpdateService.getTeamByProject(projectId);
  }

  @ApiOperation({ summary: 'Update daily update' })
  @ApiResponse({ status: 200, description: 'Daily update updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyUpdateDto: UpdateDailyUpdateDto) {
    return this.dailyUpdateService.update(id, updateDailyUpdateDto);
  }

  @ApiOperation({ summary: 'Delete daily update' })
  @ApiResponse({ status: 200, description: 'Daily update deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyUpdateService.remove(id);
  }

  @ApiOperation({ summary: 'Submit daily update' })
  @ApiResponse({ status: 200, description: 'Daily update submitted successfully' })
  @Post(':id/submit')
  submit(@Param('id') id: string) {
    return this.dailyUpdateService.submit(id);
  }

  @ApiOperation({ summary: 'Get time tracking for users with filtering options' })
  @ApiResponse({ 
    status: 200, 
    description: 'Time tracking data retrieved successfully',
    type: [TimeTrackingResponseDto]
  })
  @Post('time-tracking')
  async getTimeTracking(@Body() timeTrackingDto: TimeTrackingDto, @Request() req: any) {
    console.log('Time tracking request:', timeTrackingDto);
    
    // Extract user ID from JWT token
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    const result = await this.dailyUpdateService.getTimeTracking(timeTrackingDto, userId);
    console.log('Time tracking result:', JSON.stringify(result, null, 2));
    return result;
  }

  @ApiOperation({ summary: 'Test endpoint to check database content' })
  @Get('test/db-content')
  async testDbContent(@Request() req: any) {
    // Extract user ID from JWT token
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    // Get all daily updates to see what's in the database
    const allUpdates = await this.dailyUpdateService.findAll();
    console.log('All daily updates:', JSON.stringify(allUpdates, null, 2));
    
    // Get user's projects
    const userProjectIds = await this.dailyUpdateService.getUserProjectIds(userId);
    console.log('User project IDs:', userProjectIds);
    
    // Get user's permissions
    const hasFullPermission = await this.dailyUpdateService.hasPermission(userId, 'VIEW_DAILY_UPDATES_FULL');
    console.log('User has VIEW_DAILY_UPDATES_FULL permission:', hasFullPermission);
    
    // Get all teams
    const teams = await this.dailyUpdateService.getTeamByProject('any-project-id');
    console.log('Teams:', JSON.stringify(teams, null, 2));
    
    return {
      currentUserId: userId,
      hasFullPermission,
      userProjectIds,
      dailyUpdatesCount: allUpdates.length,
      sampleDailyUpdate: allUpdates[0] || null,
      teams: teams
    };
  }

  @ApiOperation({ summary: 'Approve daily update' })
  @ApiResponse({ status: 200, description: 'Daily update approved successfully' })
  @Post(':id/approve')
  approve(@Param('id') id: string, @Body() approveDailyUpdateDto: ApproveDailyUpdateDto) {
    return this.dailyUpdateService.approve(id, approveDailyUpdateDto.approverId);
  }
}