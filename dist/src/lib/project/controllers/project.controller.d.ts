import { ProjectService } from '../services/project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
        managerId: string | null;
        status: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    findAll(status?: string, managerId?: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
        managerId: string | null;
        status: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
        managerId: string | null;
        status: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        code: string;
        managerId: string | null;
        status: string | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    remove(id: string): Promise<void>;
}
