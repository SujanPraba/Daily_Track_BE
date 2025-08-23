import { Project, NewProject } from '../../../database/schemas/project.schema';
import { SearchProjectsDto } from '../dtos/search-projects.dto';
import { PaginatedProjectsDto } from '../dtos/paginated-projects.dto';
export declare class ProjectRepository {
    private readonly db;
    constructor(db: any);
    create(project: NewProject): Promise<Project>;
    assignRoles(projectId: string, roleIds: string[]): Promise<void>;
    getProjectRoles(projectId: string): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any>;
    findByCode(code: string): Promise<any>;
    findByManager(managerId: string): Promise<any[]>;
    findByStatus(status: string): Promise<any[]>;
    searchProjects(searchDto: SearchProjectsDto): Promise<PaginatedProjectsDto>;
    update(id: string, project: Partial<NewProject>): Promise<Project>;
    delete(id: string): Promise<void>;
    findAllWithPermissions(): Promise<any[]>;
    getProjectUsers(projectId: string): Promise<any[]>;
}
