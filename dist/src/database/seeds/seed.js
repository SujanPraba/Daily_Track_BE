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
        console.log('🧹 Clearing existing data...');
        await db.delete(schemas.userProjects);
        await db.delete(schemas.userTeams);
        await db.delete(schemas.userRoles);
        await db.delete(schemas.rolePermissions);
        await db.delete(schemas.permissions);
        await db.delete(schemas.roles);
        await db.delete(schemas.teams);
        await db.delete(schemas.projects);
        await db.delete(schemas.users);
        await db.delete(schemas.modules);
        console.log('✅ Existing data cleared');
        const modulesData = [
            { name: 'Dashboard', description: 'Dashboard operations', code: 'DASHBOARD' },
            { name: 'Reports', description: 'Reports operations', code: 'REPORTS' },
            { name: 'Configuration', description: 'Configuration management operations', code: 'CONFIGURATION' },
            { name: 'Daily Updates', description: 'Daily update operations', code: 'DAILY_UPDATE' },
            { name: 'Module Management', description: 'Module management operations', code: 'MODULE_MANAGEMENT' },
            { name: 'Permission Management', description: 'Permission management operations', code: 'PERMISSION_MANAGEMENT' },
            { name: 'Role Management', description: 'Role management operations', code: 'ROLE_MANAGEMENT' },
            { name: 'Project Management', description: 'Project management operations', code: 'PROJECT' },
            { name: 'Team Management', description: 'Team management operations', code: 'TEAM' },
            { name: 'User Management', description: 'User management operations', code: 'USER' },
        ];
        const createdModules = await db.insert(schemas.modules).values(modulesData).returning();
        console.log('✅ Modules created');
        const permissionsData = [
            { name: 'VIEW_DASHBOARD', description: 'View dashboard', moduleId: createdModules.find(m => m.code === 'DASHBOARD').id },
            { name: 'VIEW_REPORTS', description: 'View reports', moduleId: createdModules.find(m => m.code === 'REPORTS').id },
            { name: 'VIEW_CONFIGURATION', description: 'View configuration', moduleId: createdModules.find(m => m.code === 'CONFIGURATION').id },
            { name: 'VIEW_USER_MANAGEMENT', description: 'View user management', moduleId: createdModules.find(m => m.code === 'USER').id },
            { name: 'CREATE_USER', description: 'Create new users', moduleId: createdModules.find(m => m.code === 'USER').id },
            { name: 'UPDATE_USER', description: 'Update user data', moduleId: createdModules.find(m => m.code === 'USER').id },
            { name: 'DELETE_USER', description: 'Delete users', moduleId: createdModules.find(m => m.code === 'USER').id },
            { name: 'VIEW_PROJECT_MANAGEMENT', description: 'View project management', moduleId: createdModules.find(m => m.code === 'PROJECT').id },
            { name: 'CREATE_PROJECT', description: 'Create new projects', moduleId: createdModules.find(m => m.code === 'PROJECT').id },
            { name: 'UPDATE_PROJECT', description: 'Update project data', moduleId: createdModules.find(m => m.code === 'PROJECT').id },
            { name: 'DELETE_PROJECT', description: 'Delete projects', moduleId: createdModules.find(m => m.code === 'PROJECT').id },
            { name: 'MANAGE_TEAM', description: 'Manage teams', moduleId: createdModules.find(m => m.code === 'TEAM').id },
            { name: 'VIEW_DAILY_UPDATES', description: 'View daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'APPROVE_UPDATES', description: 'Approve daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'VIEW_DAILY_UPDATES_FULL', description: 'View daily updates full', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'CREATE_DAILY_UPDATES', description: 'Create daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'UPDATE_DAILY_UPDATES', description: 'Update daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'DELETE_DAILY_UPDATES', description: 'Delete daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE').id },
            { name: 'VIEW_MODULE_MANAGEMENT', description: 'View module management', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT').id },
            { name: 'CREATE_MODULE', description: 'Create new modules', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT').id },
            { name: 'UPDATE_MODULE', description: 'Update module data', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT').id },
            { name: 'DELETE_MODULE', description: 'Delete modules', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT').id },
            { name: 'VIEW_PERMISSION_MANAGEMENT', description: 'View permission management', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT').id },
            { name: 'CREATE_PERMISSION', description: 'Create new permissions', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT').id },
            { name: 'UPDATE_PERMISSION', description: 'Update permission data', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT').id },
            { name: 'DELETE_PERMISSION', description: 'Delete permissions', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT').id },
            { name: 'VIEW_ROLE_MANAGEMENT', description: 'View role management', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT').id },
            { name: 'CREATE_ROLE', description: 'Create new roles', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT').id },
            { name: 'UPDATE_ROLE', description: 'Update role data', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT').id },
            { name: 'DELETE_ROLE', description: 'Delete roles', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT').id },
            { name: 'VIEW_TEAM_MANAGEMENT', description: 'View team management', moduleId: createdModules.find(m => m.code === 'TEAM').id },
            { name: 'CREATE_TEAM', description: 'Create new teams', moduleId: createdModules.find(m => m.code === 'TEAM').id },
            { name: 'UPDATE_TEAM', description: 'Update team data', moduleId: createdModules.find(m => m.code === 'TEAM').id },
            { name: 'DELETE_TEAM', description: 'Delete teams', moduleId: createdModules.find(m => m.code === 'TEAM').id },
        ];
        const createdPermissions = await db.insert(schemas.permissions).values(permissionsData).returning();
        console.log('✅ Permissions created');
        const rolesData = [
            { name: 'SUPER_ADMIN', description: 'Super administrator with full access', level: 'ADMIN' },
            { name: 'PROJECT MANAGER SINGLIFE', description: 'Project manager role', level: 'MANAGER' },
            { name: 'TEAM_LEAD SINGLIFE', description: 'Team lead role', level: 'MANAGER' },
            { name: 'DEVELOPER SINGLIFE', description: 'Developer role', level: 'USER' },
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
                firstName: 'Sujan',
                lastName: 'Praba',
                email: 'sujan@gmail.com',
                password: hashedPassword,
                department: 'IT',
                position: 'Project Developer',
                employeeId: 'PI-IT-109',
            },
            {
                firstName: 'Manager',
                lastName: 'User',
                email: 'manager@example.com',
                password: hashedPassword,
                department: 'IT',
                position: 'Project Manager',
                employeeId: 'PI-IT-110',
            },
            {
                firstName: 'Developer',
                lastName: 'User',
                email: 'developer@example.com',
                password: hashedPassword,
                department: 'IT',
                position: 'Developer',
                employeeId: 'PI-IT-111',
            },
        ];
        const createdUsers = await db.insert(schemas.users).values(usersData).returning();
        console.log('✅ Users created');
        const adminUser = createdUsers.find(user => user.email === 'sujan@gmail.com');
        const managerUser = createdUsers.find(user => user.email === 'manager@example.com');
        const devUser = createdUsers.find(user => user.email === 'developer@example.com');
        const userRolesData = [];
        if (adminUser && superAdminRole) {
            userRolesData.push({ userId: adminUser.id, roleId: superAdminRole.id });
        }
        if (managerUser) {
            const pmRole = createdRoles.find(role => role.name === 'PROJECT MANAGER SINGLIFE');
            if (pmRole)
                userRolesData.push({ userId: managerUser.id, roleId: pmRole.id });
        }
        if (devUser) {
            const devRole = createdRoles.find(role => role.name === 'DEVELOPER SINGLIFE');
            if (devRole)
                userRolesData.push({ userId: devUser.id, roleId: devRole.id });
        }
        if (userRolesData.length > 0) {
            await db.insert(schemas.userRoles).values(userRolesData);
        }
        const projectsData = [
            {
                name: 'Singlife',
                description: 'Singlife is a platform for creating and managing your own website',
                code: 'SINGLIFE-2025',
                managerId: managerUser?.id,
                status: 'ACTIVE',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-12-31'),
            },
            {
                name: 'ERL',
                description: 'ERL is a platform for creating and managing your own website',
                code: 'ERL-2025',
                managerId: managerUser?.id,
                status: 'ACTIVE',
                startDate: new Date('2025-01-01'),
                endDate: new Date('2025-12-31'),
            },
        ];
        const createdProjects = await db.insert(schemas.projects).values(projectsData).returning();
        console.log('✅ Projects created');
        const teamsData = [
            {
                name: 'Singlife Team',
                description: 'Team responsible for Singlife',
                projectId: createdProjects[0].id,
                leadId: devUser?.id,
            },
            {
                name: 'ERL Team',
                description: 'Team responsible for ERL',
                projectId: createdProjects[1].id,
                leadId: devUser?.id,
            },
        ];
        const createdTeams = await db.insert(schemas.teams).values(teamsData).returning();
        console.log('✅ Teams created');
        if (devUser && createdProjects.length > 0 && createdTeams.length > 0) {
            const devRole = createdRoles.find(role => role.name === 'DEVELOPER SINGLIFE');
            if (devRole) {
                await db.insert(schemas.userProjects).values({
                    userId: devUser.id,
                    projectId: createdProjects[0].id,
                    roleId: devRole.id,
                });
            }
            await db.insert(schemas.userTeams).values({
                userId: devUser.id,
                teamId: createdTeams[0].id,
            });
        }
        if (managerUser && createdProjects.length > 0) {
            const pmRole = createdRoles.find(role => role.name === 'PROJECT MANAGER SINGLIFE');
            if (pmRole) {
                for (const project of createdProjects) {
                    await db.insert(schemas.userProjects).values({
                        userId: managerUser.id,
                        projectId: project.id,
                        roleId: pmRole.id,
                    });
                }
            }
        }
        if (adminUser && createdProjects.length > 0) {
            const superAdminRole = createdRoles.find(role => role.name === 'SUPER_ADMIN');
            if (superAdminRole) {
                await db.insert(schemas.userProjects).values({
                    userId: adminUser.id,
                    projectId: createdProjects[0].id,
                    roleId: superAdminRole.id,
                });
            }
        }
        console.log('🎉 Database seeding completed successfully!');
        console.log('');
        console.log('Sample credentials:');
        console.log('Admin: sujan@gmail.com / password123');
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