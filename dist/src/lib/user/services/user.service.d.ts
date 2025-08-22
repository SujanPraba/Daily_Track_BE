import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../../database/schemas/user.schema';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    assignToProject(userId: string, projectId: string): Promise<void>;
    assignToTeam(userId: string, teamId: string): Promise<void>;
    assignRole(userId: string, roleId: string): Promise<void>;
    getUserProjects(userId: string): Promise<any>;
    getUserTeams(userId: string): Promise<any>;
    getUserRoles(userId: string): Promise<any>;
}
