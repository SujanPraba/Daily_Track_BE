import { TeamService } from '../services/team.service';
import { CreateTeamDto } from '../dtos/create-team.dto';
import { UpdateTeamDto } from '../dtos/update-team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(createTeamDto: CreateTeamDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        projectId: string;
        leadId: string | null;
    }>;
    findAll(projectId?: string, leadId?: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        projectId: string;
        leadId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        projectId: string;
        leadId: string | null;
    }>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        projectId: string;
        leadId: string | null;
    }>;
    remove(id: string): Promise<void>;
}
