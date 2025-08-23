import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SearchUsersDto } from '../dtos/search-users.dto';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { User } from '../../../database/schemas/user.schema';
import { UserProjectRoleResponseDto } from '../dtos/user-project-role-response.dto';
import { UserWithAssignmentsDto } from '../dtos/user-with-assignments.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<UserWithAssignmentsDto[]>;
    searchUsers(searchDto: SearchUsersDto): Promise<PaginatedUsersDto>;
    findOne(id: string): Promise<UserWithAssignmentsDto>;
    findByEmail(email: string): Promise<UserWithAssignmentsDto | null>;
    findByEmailForAuth(email: string): Promise<User | null>;
    findUserWithCompleteInformation(userId: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    assignProjectRoles(userId: string, projectRoleAssignments: Array<{
        projectId: string;
        roleId: string;
    }>): Promise<void>;
    assignTeam(userId: string, teamId: string): Promise<void>;
    getUserProjectRoles(userId: string): Promise<UserProjectRoleResponseDto[]>;
    getUserTeams(userId: string): Promise<any>;
    getUserRoles(userId: string): Promise<any>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    getUserProjectIds(userId: string): Promise<string[]>;
}
