import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../../../database/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    const userData = {
      ...createUserDto,
      password: hashedPassword,
    };

    return this.userRepository.create(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.delete(id);
  }

  async assignToProject(userId: string, projectId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.assignToProject(userId, projectId);
  }

  async assignToTeam(userId: string, teamId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.assignToTeam(userId, teamId);
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    const user = await this.findOne(userId);
    await this.userRepository.assignRole(userId, roleId);
  }

  async getUserProjects(userId: string) {
    return this.userRepository.getUserProjects(userId);
  }

  async getUserTeams(userId: string) {
    return this.userRepository.getUserTeams(userId);
  }

  async getUserRoles(userId: string) {
    return this.userRepository.getUserRoles(userId);
  }
}