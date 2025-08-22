import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../../../database/schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const existingProject = await this.projectRepository.findByCode(createProjectDto.code);
    if (existingProject) {
      throw new BadRequestException('Project with this code already exists');
    }
    return this.projectRepository.create(createProjectDto as any);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    return this.projectRepository.update(id, updateProjectDto as any);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.delete(id);
  }

  async findByManager(managerId: string): Promise<Project[]> {
    return this.projectRepository.findByManager(managerId);
  }

  async findByStatus(status: string): Promise<Project[]> {
    return this.projectRepository.findByStatus(status);
  }
}