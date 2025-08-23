import { TeamRepository } from '../repositories/team.repository';
import { ProjectService } from '../../project/services/project.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';
import { Team } from '../../../database/schemas/team.schema';
export declare class TeamService {
    private readonly teamRepository;
    private readonly projectService;
    constructor(teamRepository: TeamRepository, projectService: ProjectService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<TeamResponseDto[]>;
    searchTeams(searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto>;
    findOne(id: string): Promise<TeamResponseDto>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    remove(id: string): Promise<void>;
    findByProject(projectId: string): Promise<TeamResponseDto[]>;
    findByLead(leadId: string): Promise<TeamResponseDto[]>;
}
