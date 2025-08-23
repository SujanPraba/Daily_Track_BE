import { User, NewUser } from '../../../database/schemas/user.schema';
import { SearchUsersDto } from '../dtos/search-users.dto';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { UserWithAssignmentsDto } from '../dtos/user-with-assignments.dto';
export declare class UserRepository {
    private readonly db;
    constructor(db: any);
    private processUserWithAssignments;
    create(user: NewUser): Promise<User>;
    findAll(): Promise<UserWithAssignmentsDto[]>;
    searchUsers(searchDto: SearchUsersDto): Promise<PaginatedUsersDto>;
    findById(id: string): Promise<UserWithAssignmentsDto | null>;
    findByEmailRaw(email: string): Promise<User | null>;
    findByEmail(email: string): Promise<UserWithAssignmentsDto | null>;
    update(id: string, user: Partial<NewUser>): Promise<User>;
    delete(id: string): Promise<void>;
    assignProjectRoles(userId: string, projectRoleAssignments: Array<{
        projectId: string;
        roleId: string;
        teamId?: string;
    }>): Promise<void>;
    assignTeam(userId: string, teamId: string): Promise<void>;
    getUserProjectRoles(userId: string): Promise<any>;
    getUserTeams(userId: string): Promise<any>;
    getUserRoles(userId: string): Promise<any>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    getUserProjectIds(userId: string): Promise<string[]>;
    findUserWithCompleteInformation(userId: string): Promise<any>;
}
