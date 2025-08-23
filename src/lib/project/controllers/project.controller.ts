import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
import { ProjectWithRolesAndTeamsDto } from '../dtos/project-with-roles.dto';
import { ProjectRoleResponseDto } from '../dtos/project-roles-response.dto';
import { AssignRolesDto } from '../dtos/assign-roles.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProjectWithPermissionsDto } from '../dtos/project-with-permissions.dto';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ 
    summary: 'Create a new project',
    description: 'Create a new project with optional role assignments'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Project created successfully',
    type: ProjectWithRolesAndTeamsDto
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'Get all projects (without pagination)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all projects with their roles and teams',
    type: [ProjectWithRolesAndTeamsDto]
  })
  @Get()
  findAll(@Query('status') status?: string, @Query('managerId') managerId?: string) {
    if (status) {
      return this.projectService.findByStatus(status);
    }
    if (managerId) {
      return this.projectService.findByManager(managerId);
    }
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Get all projects with teams, roles, and permissions' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all projects with their teams, roles, and permissions',
    type: [ProjectWithPermissionsDto]
  })
  @Get('with-permissions')
  findAllWithPermissions() {
    return this.projectService.findAllWithPermissions();
  }

  @ApiOperation({ summary: 'Get users assigned to a specific project' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of users assigned to the project with their roles and teams',
    type: 'array'
  })
  @Get(':id/users')
  getProjectUsers(@Param('id') id: string) {
    return this.projectService.getProjectUsers(id);
  }

  @ApiOperation({ summary: 'Search and get all projects with pagination and filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of projects with their roles and teams',
    type: PaginatedProjectsDto
  })
  @Post('search')
  searchProjects(@Body() searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto> {
    return this.projectService.searchProjects(searchDto);
  }

  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Project found with roles and teams',
    type: ProjectWithRolesAndTeamsDto
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @ApiOperation({ 
    summary: 'Update project',
    description: 'Update project data and optionally update role assignments'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project updated successfully with roles and teams',
    type: ProjectWithRolesAndTeamsDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }

  @ApiOperation({ summary: 'Assign roles to project' })
  @ApiResponse({ status: 200, description: 'Roles assigned successfully' })
  @Post(':id/roles')
  assignRoles(
    @Param('id') id: string,
    @Body() assignRolesDto: AssignRolesDto,
  ) {
    return this.projectService.assignRoles(id, assignRolesDto.roleIds);
  }

  @ApiOperation({ summary: 'Get project roles' })
  @ApiResponse({ 
    status: 200, 
    description: 'Project roles retrieved successfully',
    type: [ProjectRoleResponseDto]
  })
  @Get(':id/roles')
  getProjectRoles(@Param('id') id: string) {
    return this.projectService.getProjectRoles(id);
  }
}