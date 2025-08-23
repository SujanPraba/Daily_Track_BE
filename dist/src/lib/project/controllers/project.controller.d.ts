import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
import { ProjectWithRolesAndTeamsDto } from '../dtos/project-with-roles.dto';
import { AssignRolesDto } from '../dtos/assign-roles.dto';
import { ProjectWithPermissionsDto } from '../dtos/project-with-permissions.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<ProjectWithRolesAndTeamsDto>;
    findAll(status?: string, managerId?: string): Promise<ProjectWithRolesAndTeamsDto[]>;
    findAllWithPermissions(): Promise<ProjectWithPermissionsDto[]>;
    getProjectUsers(id: string): Promise<any[]>;
    searchProjects(searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto>;
    findOne(id: string): Promise<ProjectWithRolesAndTeamsDto>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectWithRolesAndTeamsDto>;
    remove(id: string): Promise<void>;
    assignRoles(id: string, assignRolesDto: AssignRolesDto): Promise<void>;
    getProjectRoles(id: string): Promise<any>;
}
