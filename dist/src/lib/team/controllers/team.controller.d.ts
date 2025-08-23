import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';
import { Team } from '../../../database/schemas/team.schema';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    searchTeams(searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto>;
    findAll(projectId?: string, leadId?: string): Promise<TeamResponseDto[]>;
    findOne(id: string): Promise<TeamResponseDto>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    remove(id: string): Promise<void>;
}
