import { Team, NewTeam } from '../../../database/schemas/team.schema';
import { SearchTeamsDto } from '../dtos/search-teams.dto';
import { PaginatedTeamsDto } from '../dtos/paginated-teams.dto';
import { TeamResponseDto } from '../dtos/team-response.dto';
export declare class TeamRepository {
    private readonly db;
    constructor(db: any);
    create(team: NewTeam): Promise<Team>;
    findAll(): Promise<TeamResponseDto[]>;
    findById(id: string): Promise<TeamResponseDto | null>;
    findByProject(projectId: string): Promise<TeamResponseDto[]>;
    findByLead(leadId: string): Promise<TeamResponseDto[]>;
    searchTeams(searchDto: SearchTeamsDto): Promise<PaginatedTeamsDto>;
    update(id: string, team: Partial<NewTeam>): Promise<Team>;
    delete(id: string): Promise<void>;
}
