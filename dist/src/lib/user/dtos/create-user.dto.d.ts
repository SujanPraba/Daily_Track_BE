import { ProjectRoleAssignmentDto } from './project-role-assignment.dto';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    department?: string;
    position?: string;
    employeeId?: string;
    teamId?: string;
    projectRoleAssignments?: ProjectRoleAssignmentDto[];
}
