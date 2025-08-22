import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../../../database/schemas/project.schema';
export declare class ProjectService {
    private readonly projectRepository;
    constructor(projectRepository: ProjectRepository);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: string): Promise<Project>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: string): Promise<void>;
    findByManager(managerId: string): Promise<Project[]>;
    findByStatus(status: string): Promise<Project[]>;
}
