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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DailyUpdateService } from '../services/daily-update.service';
import { CreateDailyUpdateDto } from '../dtos/create-daily-update.dto';
import { UpdateDailyUpdateDto } from '../dtos/update-daily-update.dto';
import { ApproveDailyUpdateDto } from '../dtos/approve-daily-update.dto';
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

  @ApiOperation({ summary: 'Get all daily updates' })
  @ApiResponse({ status: 200, description: 'List of all daily updates' })
  @Get()
  findAll(
    @Query('userId') userId?: string,
    @Query('projectId') projectId?: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (userId) {
      return this.dailyUpdateService.findByUser(userId);
    }
    if (projectId) {
      return this.dailyUpdateService.findByProject(projectId);
    }
    if (status) {
      return this.dailyUpdateService.findByStatus(status);
    }
    if (startDate && endDate) {
      return this.dailyUpdateService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.dailyUpdateService.findAll();
  }

  @ApiOperation({ summary: 'Get daily update by ID' })
  @ApiResponse({ status: 200, description: 'Daily update found' })
  @ApiResponse({ status: 404, description: 'Daily update not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyUpdateService.findOne(id);
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

  @ApiOperation({ summary: 'Approve daily update' })
  @ApiResponse({ status: 200, description: 'Daily update approved successfully' })
  @Post(':id/approve')
  approve(@Param('id') id: string, @Body() approveDailyUpdateDto: ApproveDailyUpdateDto) {
    return this.dailyUpdateService.approve(id, approveDailyUpdateDto.approverId);
  }
}