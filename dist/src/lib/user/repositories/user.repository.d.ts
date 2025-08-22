import { User, NewUser } from '../../../database/schemas/user.schema';
export declare class UserRepository {
    private readonly db;
    constructor(db: any);
    create(user: NewUser): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, user: Partial<NewUser>): Promise<User>;
    delete(id: string): Promise<void>;
    assignToProject(userId: string, projectId: string): Promise<void>;
    assignToTeam(userId: string, teamId: string): Promise<void>;
    assignRole(userId: string, roleId: string): Promise<void>;
    getUserProjects(userId: string): Promise<any>;
    getUserTeams(userId: string): Promise<any>;
    getUserRoles(userId: string): Promise<any>;
}
