import { Team, NewTeam } from '../../../database/schemas/team.schema';
export declare class TeamRepository {
    private readonly db;
    constructor(db: any);
    create(team: NewTeam): Promise<Team>;
    findAll(): Promise<Team[]>;
    findById(id: string): Promise<Team | null>;
    findByProject(projectId: string): Promise<Team[]>;
    findByLead(leadId: string): Promise<Team[]>;
    update(id: string, team: Partial<NewTeam>): Promise<Team>;
    delete(id: string): Promise<void>;
}
