import { Role, NewRole } from '../../../database/schemas/role.schema';
export declare class RoleRepository {
    private readonly db;
    constructor(db: any);
    create(role: NewRole): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: string): Promise<Role | null>;
    findByName(name: string): Promise<Role | null>;
    update(id: string, role: Partial<NewRole>): Promise<Role>;
    delete(id: string): Promise<void>;
    assignPermissions(roleId: string, permissionIds: string[]): Promise<void>;
    getRolePermissions(roleId: string): Promise<any>;
}
