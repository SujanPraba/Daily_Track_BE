import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repository';
import { ProjectService } from '../../project/services/project.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';
import { Team } from '../../../database/schemas/team.schema';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly projectService: ProjectService,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    // Verify project exists
    await this.projectService.findOne(createTeamDto.projectId);
    
    // Clean up empty strings to undefined for optional UUID fields
    const cleanedDto = {
      ...createTeamDto,
      leadId: createTeamDto.leadId === '' ? undefined : createTeamDto.leadId,
    };

    return this.teamRepository.create(cleanedDto);
  }

  async findAll(): Promise<TeamResponseDto[]> {
    return this.teamRepository.findAll();
  }

  async searchTeams(searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto> {
    return this.teamRepository.searchTeams(searchDto);
  }

  async findOne(id: string): Promise<TeamResponseDto> {
    const team = await this.teamRepository.findById(id);
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.findOne(id);
    if (updateTeamDto.projectId) {
      await this.projectService.findOne(updateTeamDto.projectId);
    }
    
    // Clean up empty strings to undefined for optional UUID fields
    const cleanedDto = {
      ...updateTeamDto,
      leadId: updateTeamDto.leadId === '' ? undefined : updateTeamDto.leadId,
    };

    return this.teamRepository.update(id, cleanedDto);
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.delete(id);
  }

  async findByProject(projectId: string): Promise<TeamResponseDto[]> {
    return this.teamRepository.findByProject(projectId);
  }

  async findByLead(leadId: string): Promise<TeamResponseDto[]> {
    return this.teamRepository.findByLead(leadId);
  }
}