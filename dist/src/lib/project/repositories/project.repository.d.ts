import { Project, NewProject } from '../../../database/schemas/project.schema';
export declare class ProjectRepository {
    private readonly db;
    constructor(db: any);
    create(project: NewProject): Promise<Project>;
    findAll(): Promise<Project[]>;
    findById(id: string): Promise<Project | null>;
    findByCode(code: string): Promise<Project | null>;
    findByManager(managerId: string): Promise<Project[]>;
    findByStatus(status: string): Promise<Project[]>;
    update(id: string, project: Partial<NewProject>): Promise<Project>;
    delete(id: string): Promise<void>;
}
