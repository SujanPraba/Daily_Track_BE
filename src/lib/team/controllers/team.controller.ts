import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';
import { Team } from '../../../database/schemas/team.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('Teams')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
    type: TeamResponseDto
  })
  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @ApiOperation({ summary: 'Search and get all teams with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of teams',
    type: PaginatedTeamsDto
  })
  @Post('search')
  searchTeams(@Body() searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto> {
    return this.teamService.searchTeams(searchDto);
  }

  @ApiOperation({ summary: 'Get all teams (without pagination)' })
  @ApiResponse({
    status: 200,
    description: 'List of all teams',
    type: [TeamResponseDto]
  })
  @Get()
  findAll(@Query('projectId') projectId?: string, @Query('leadId') leadId?: string) {
    if (projectId) {
      return this.teamService.findByProject(projectId);
    }
    if (leadId) {
      return this.teamService.findByLead(leadId);
    }
    return this.teamService.findAll();
  }

  @ApiOperation({ summary: 'Get a team by ID' })
  @ApiResponse({
    status: 200,
    description: 'Team found',
    type: TeamResponseDto
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<TeamResponseDto> {
    return this.teamService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({
    status: 200,
    description: 'Team updated successfully',
    type: TeamResponseDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<Team> {
    return this.teamService.update(id, updateTeamDto);
  }

  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({ status: 200, description: 'Team deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamService.remove(id);
  }
}