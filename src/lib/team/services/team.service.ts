import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TeamRepository } from '../repositories/team.repository';
import { ProjectService } from '../../project/services/project.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
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
    return this.teamRepository.create(createTeamDto);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async findOne(id: string): Promise<Team> {
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
    return this.teamRepository.update(id, updateTeamDto);
  }

  async remove(id: string): Promise<void> {
    const team = await this.findOne(id);
    await this.teamRepository.delete(id);
  }

  async findByProject(projectId: string): Promise<Team[]> {
    return this.teamRepository.findByProject(projectId);
  }

  async findByLead(leadId: string): Promise<Team[]> {
    return this.teamRepository.findByLead(leadId);
  }
}