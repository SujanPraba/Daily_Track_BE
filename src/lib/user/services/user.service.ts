import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SearchUsersDto } from '../dtos/search-users.dto';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { User } from '../../../database/schemas/user.schema';
import { UserProjectRoleResponseDto } from '../dtos/user-project-role-response.dto';
import { UserWithAssignmentsDto } from '../dtos/user-with-assignments.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Extract assignment fields before creating user
    const { projectRoleAssignments, teamId, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };

    // Create the user first
    const createdUser = await this.userRepository.create(userToCreate);

    // Handle project-role assignments (which now include team assignments)
    if (projectRoleAssignments && projectRoleAssignments.length > 0) {
      await this.userRepository.assignProjectRoles(createdUser.id, projectRoleAssignments);
    }

    // Handle legacy team assignment if provided (for backward compatibility)
    if (teamId && (!projectRoleAssignments || projectRoleAssignments.length === 0)) {
      await this.userRepository.assignTeam(createdUser.id, teamId);
    }

    return createdUser;
  }

  async findAll(): Promise<UserWithAssignmentsDto[]> {
    return this.userRepository.findAll();
  }

  async searchUsers(searchDto: SearchUsersDto): Promise<PaginatedUsersDto> {
    return this.userRepository.searchUsers(searchDto);
  }

  async findOne(id: string): Promise<UserWithAssignmentsDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserWithAssignmentsDto | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByEmailForAuth(email: string): Promise<User | null> {
    // This method is specifically for authentication and returns the user with password
    const result = await this.userRepository.findByEmailRaw(email);
    return result;
  }

  async findUserWithCompleteInformation(userId: string) {
    return this.userRepository.findUserWithCompleteInformation(userId);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    // Extract assignment fields before updating user
    const { projectRoleAssignments, teamId, ...userData } = updateUserDto;

    // Update the user first
    const updatedUser = await this.userRepository.update(id, userData);

    // Handle project-role assignments if provided (which now include team assignments)
    if (projectRoleAssignments !== undefined) {
      await this.userRepository.assignProjectRoles(id, projectRoleAssignments);
    }

    // Handle legacy team assignment if provided (for backward compatibility)
    if (teamId !== undefined && projectRoleAssignments === undefined) {
      await this.userRepository.assignTeam(id, teamId);
    }

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
  }

  async assignProjectRoles(userId: string, projectRoleAssignments: Array<{ projectId: string; roleId: string }>): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.assignProjectRoles(userId, projectRoleAssignments);
  }

  async assignTeam(userId: string, teamId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.assignTeam(userId, teamId);
  }

  async getUserProjectRoles(userId: string): Promise<UserProjectRoleResponseDto[]> {
    return this.userRepository.getUserProjectRoles(userId);
  }

  async getUserTeams(userId: string) {
    return this.userRepository.getUserTeams(userId);
  }

  async getUserRoles(userId: string) {
    return this.userRepository.getUserRoles(userId);
  }

  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    return this.userRepository.hasPermission(userId, permissionName);
  }

  async getUserProjectIds(userId: string): Promise<string[]> {
    return this.userRepository.getUserProjectIds(userId);
  }
}