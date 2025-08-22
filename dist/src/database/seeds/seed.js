"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const bcrypt = require("bcryptjs");
const schemas = require("../schemas");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = (0, node_postgres_1.drizzle)(pool, { schema: schemas });
async function seed() {
    console.log('🌱 Starting database seeding...');
    try {
        const permissionsData = [
            { name: 'CREATE_USER', description: 'Create new users', module: 'USER', action: 'CREATE' },
            { name: 'READ_USER', description: 'Read user data', module: 'USER', action: 'READ' },
            { name: 'UPDATE_USER', description: 'Update user data', module: 'USER', action: 'UPDATE' },
            { name: 'DELETE_USER', description: 'Delete users', module: 'USER', action: 'DELETE' },
            { name: 'CREATE_PROJECT', description: 'Create new projects', module: 'PROJECT', action: 'CREATE' },
            { name: 'READ_PROJECT', description: 'Read project data', module: 'PROJECT', action: 'READ' },
            { name: 'UPDATE_PROJECT', description: 'Update project data', module: 'PROJECT', action: 'UPDATE' },
            { name: 'DELETE_PROJECT', description: 'Delete projects', module: 'PROJECT', action: 'DELETE' },
            { name: 'MANAGE_TEAM', description: 'Manage teams', module: 'TEAM', action: 'MANAGE' },
            { name: 'APPROVE_UPDATES', description: 'Approve daily updates', module: 'DAILY_UPDATE', action: 'APPROVE' },
        ];
        const createdPermissions = await db.insert(schemas.permissions).values(permissionsData).returning();
        console.log('✅ Permissions created');
        const rolesData = [
            { name: 'SUPER_ADMIN', description: 'Super administrator with full access', level: 'ADMIN' },
            { name: 'PROJECT_MANAGER', description: 'Project manager role', level: 'MANAGER' },
            { name: 'TEAM_LEAD', description: 'Team lead role', level: 'MANAGER' },
            { name: 'DEVELOPER', description: 'Developer role', level: 'USER' },
        ];
        const createdRoles = await db.insert(schemas.roles).values(rolesData).returning();
        console.log('✅ Roles created');
        const superAdminRole = createdRoles.find(role => role.name === 'SUPER_ADMIN');
        if (superAdminRole) {
            const rolePermissionsData = createdPermissions.map(permission => ({
                roleId: superAdminRole.id,
                permissionId: permission.id,
            }));
            await db.insert(schemas.rolePermissions).values(rolePermissionsData);
        }
        const hashedPassword = await bcrypt.hash('password123', 12);
        const usersData = [
            {
                firstName: 'Super',
                lastName: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                department: 'IT',
                position: 'System Administrator',
                employeeId: 'EMP001',
            },
            {
                firstName: 'John',
                lastName: 'Manager',
                email: 'manager@example.com',
                password: hashedPassword,
                department: 'Engineering',
                position: 'Project Manager',
                employeeId: 'EMP002',
            },
            {
                firstName: 'Jane',
                lastName: 'Developer',
                email: 'developer@example.com',
                password: hashedPassword,
                department: 'Engineering',
                position: 'Senior Developer',
                employeeId: 'EMP003',
            },
        ];
        const createdUsers = await db.insert(schemas.users).values(usersData).returning();
        console.log('✅ Users created');
        const adminUser = createdUsers.find(user => user.email === 'admin@example.com');
        const managerUser = createdUsers.find(user => user.email === 'manager@example.com');
        const devUser = createdUsers.find(user => user.email === 'developer@example.com');
        const userRolesData = [];
        if (adminUser && superAdminRole) {
            userRolesData.push({ userId: adminUser.id, roleId: superAdminRole.id });
        }
        if (managerUser) {
            const pmRole = createdRoles.find(role => role.name === 'PROJECT_MANAGER');
            if (pmRole)
                userRolesData.push({ userId: managerUser.id, roleId: pmRole.id });
        }
        if (devUser) {
            const devRole = createdRoles.find(role => role.name === 'DEVELOPER');
            if (devRole)
                userRolesData.push({ userId: devUser.id, roleId: devRole.id });
        }
        if (userRolesData.length > 0) {
            await db.insert(schemas.userRoles).values(userRolesData);
        }
        const projectsData = [
            {
                name: 'E-Commerce Platform',
                description: 'Modern e-commerce platform with microservices architecture',
                code: 'ECOM-2024',
                managerId: managerUser?.id,
                status: 'ACTIVE',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-12-31'),
            },
            {
                name: 'Mobile App Development',
                description: 'Cross-platform mobile application',
                code: 'MOB-2024',
                managerId: managerUser?.id,
                status: 'ACTIVE',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-08-31'),
            },
        ];
        const createdProjects = await db.insert(schemas.projects).values(projectsData).returning();
        console.log('✅ Projects created');
        const teamsData = [
            {
                name: 'Frontend Development Team',
                description: 'Team responsible for frontend development and UI/UX',
                projectId: createdProjects[0].id,
                leadId: devUser?.id,
            },
            {
                name: 'Backend Development Team',
                description: 'Team responsible for backend services and APIs',
                projectId: createdProjects[0].id,
                leadId: devUser?.id,
            },
        ];
        const createdTeams = await db.insert(schemas.teams).values(teamsData).returning();
        console.log('✅ Teams created');
        if (devUser && createdProjects.length > 0 && createdTeams.length > 0) {
            await db.insert(schemas.userProjects).values({
                userId: devUser.id,
                projectId: createdProjects[0].id,
            });
            await db.insert(schemas.userTeams).values({
                userId: devUser.id,
                teamId: createdTeams[0].id,
            });
        }
        console.log('🎉 Database seeding completed successfully!');
        console.log('');
        console.log('Sample credentials:');
        console.log('Admin: admin@example.com / password123');
        console.log('Manager: manager@example.com / password123');
        console.log('Developer: developer@example.com / password123');
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
    finally {
        await pool.end();
    }
}
seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map