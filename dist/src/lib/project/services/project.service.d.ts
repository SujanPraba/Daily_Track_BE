import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
import { ProjectWithRolesAndTeamsDto } from '../dtos/project-with-roles.dto';
import { ProjectWithPermissionsDto } from '../dtos/project-with-permissions.dto';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    create(createProjectDto: CreateProjectDto): Promise<ProjectWithRolesAndTeamsDto>;
    findAll(): Promise<ProjectWithRolesAndTeamsDto[]>;
    searchProjects(searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto>;
    findOne(id: string): Promise<ProjectWithRolesAndTeamsDto>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectWithRolesAndTeamsDto>;
    remove(id: string): Promise<void>;
    findAllWithPermissions(): Promise<ProjectWithPermissionsDto[]>;
    getProjectUsers(projectId: string): Promise<any[]>;
    findByManager(managerId: string): Promise<ProjectWithRolesAndTeamsDto[]>;
    findByStatus(status: string): Promise<ProjectWithRolesAndTeamsDto[]>;
    assignRoles(projectId: string, roleIds: string[]): Promise<void>;
    getProjectRoles(projectId: string): Promise<any>;
}
