import { TeamRepository } from '../repositories/team.repository';
import { ProjectService } from '../../project/services/project.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
import { Team } from '../../../database/schemas/team.schema';
export declare class TeamService {
    private readonly teamRepository;
    private readonly projectService;
    constructor(teamRepository: TeamRepository, projectService: ProjectService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<Team[]>;
    findOne(id: string): Promise<Team>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    remove(id: string): Promise<void>;
    findByProject(projectId: string): Promise<Team[]>;
    findByLead(leadId: string): Promise<Team[]>;
}
