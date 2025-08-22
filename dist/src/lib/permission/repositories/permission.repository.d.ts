import { Permission, NewPermission } from '../../../database/schemas/permission.schema';
export declare class PermissionRepository {
    private readonly db;
    constructor(db: any);
    create(permission: NewPermission): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission | null>;
    findByName(name: string): Promise<Permission | null>;
    findByModule(module: string): Promise<Permission[]>;
    update(id: string, permission: Partial<NewPermission>): Promise<Permission>;
    delete(id: string): Promise<void>;
}
