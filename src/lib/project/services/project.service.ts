import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
import { ProjectWithRolesAndTeamsDto } from '../dtos/project-with-roles.dto';
import { ProjectWithPermissionsDto } from '../dtos/project-with-permissions.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto): Promise<ProjectWithRolesAndTeamsDto> {
    const existingProject = await this.projectRepository.findByCode(createProjectDto.code);
    if (existingProject) {
      throw new BadRequestException('Project with this code already exists');
    }

    // Clean up empty strings to undefined for optional UUID fields
    const cleanedDto = {
      ...createProjectDto,
      managerId: createProjectDto.managerId === '' ? undefined : createProjectDto.managerId,
    };

    // Extract roleIds from the DTO
    const { roleIds, ...projectData } = cleanedDto;

    // Create the project first
    const createdProject = await this.projectRepository.create(projectData as any);

    // If roleIds are provided, assign them to the project
    if (roleIds && roleIds.length > 0) {
      await this.projectRepository.assignRoles(createdProject.id, roleIds);
    }

    // Return the project with roles and teams
    return this.projectRepository.findById(createdProject.id);
  }

  async findAll(): Promise<ProjectWithRolesAndTeamsDto[]> {
    return this.projectRepository.findAll();
  }

  async searchProjects(searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto> {
    return this.projectRepository.searchProjects(searchDto);
  }

  async findOne(id: string): Promise<ProjectWithRolesAndTeamsDto> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectWithRolesAndTeamsDto> {
    const project = await this.findOne(id);
    
    // Clean up empty strings to undefined for optional UUID fields
    const cleanedDto = {
      ...updateProjectDto,
      managerId: updateProjectDto.managerId === '' ? undefined : updateProjectDto.managerId,
    };

    // Extract roleIds from the DTO
    const { roleIds, ...projectData } = cleanedDto;

    // Update the project first
    await this.projectRepository.update(id, projectData as any);
    
    // If roleIds are provided, update the role assignments
    if (roleIds !== undefined) {
      await this.projectRepository.assignRoles(id, roleIds);
    }
    
    // Return the updated project with roles and teams
    return this.projectRepository.findById(id);
  }

  async remove(id: string): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.delete(id);
  }

  async findAllWithPermissions(): Promise<ProjectWithPermissionsDto[]> {
    return this.projectRepository.findAllWithPermissions();
  }

  async getProjectUsers(projectId: string) {
    return this.projectRepository.getProjectUsers(projectId);
  }

  async findByManager(managerId: string): Promise<ProjectWithRolesAndTeamsDto[]> {
    return this.projectRepository.findByManager(managerId);
  }

  async findByStatus(status: string): Promise<ProjectWithRolesAndTeamsDto[]> {
    return this.projectRepository.findByStatus(status);
  }

  async assignRoles(projectId: string, roleIds: string[]): Promise<void> {
    const project = await this.findOne(projectId);
    await this.projectRepository.assignRoles(projectId, roleIds);
  }

  async getProjectRoles(projectId: string) {
    const project = await this.findOne(projectId);
    return this.projectRepository.getProjectRoles(projectId);
  }
}