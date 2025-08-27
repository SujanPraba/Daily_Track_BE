import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as schemas from '../schemas';

/**
 * Database Seeding with Permission Logic
 *
 * Permission Structure for Daily Updates:
 *
 * VIEW_DAILY_UPDATES_FULL:
 * - Users can see ALL daily updates across their assigned projects
 * - Can filter by any user, team, or project they have access to
 * - Assigned to: SUPER_ADMIN, PROJECT_MANAGER, TEAM_LEAD roles
 *
 * VIEW_DAILY_UPDATES:
 * - Users can only see their OWN daily updates
 * - userId filters are ignored and restricted to current user
 * - Assigned to: DEVELOPER role
 *
 * This creates a hierarchical access control where:
 * - Managers and Team Leads have full oversight
 * - Developers can only see their own work
 * - All users are restricted to projects they're assigned to
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema: schemas });

async function seed() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data to avoid conflicts
    console.log('🧹 Clearing existing data...');
    await db.delete(schemas.dailyUpdates);
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

    // Create modules first
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

    // Create permissions with moduleId references
    const permissionsData = [
      { name: 'VIEW_DASHBOARD', description: 'View dashboard', moduleId: createdModules.find(m => m.code === 'DASHBOARD')!.id },
      { name: 'VIEW_REPORTS', description: 'View reports', moduleId: createdModules.find(m => m.code === 'REPORTS')!.id },
      { name: 'VIEW_CONFIGURATION', description: 'View configuration', moduleId: createdModules.find(m => m.code === 'CONFIGURATION')!.id },
      // User Management
      { name: 'VIEW_USER_MANAGEMENT', description: 'View user management', moduleId: createdModules.find(m => m.code === 'USER')!.id },
      { name: 'CREATE_USER', description: 'Create new users', moduleId: createdModules.find(m => m.code === 'USER')!.id },
      { name: 'UPDATE_USER', description: 'Update user data', moduleId: createdModules.find(m => m.code === 'USER')!.id },
      { name: 'DELETE_USER', description: 'Delete users', moduleId: createdModules.find(m => m.code === 'USER')!.id },
      // Project Management
      { name: 'VIEW_PROJECT_MANAGEMENT', description: 'View project management', moduleId: createdModules.find(m => m.code === 'PROJECT')!.id },
      { name: 'CREATE_PROJECT', description: 'Create new projects', moduleId: createdModules.find(m => m.code === 'PROJECT')!.id },
      { name: 'UPDATE_PROJECT', description: 'Update project data', moduleId: createdModules.find(m => m.code === 'PROJECT')!.id },
      { name: 'DELETE_PROJECT', description: 'Delete projects', moduleId: createdModules.find(m => m.code === 'PROJECT')!.id },
      { name: 'MANAGE_TEAM', description: 'Manage teams', moduleId: createdModules.find(m => m.code === 'TEAM')!.id },
      // Daily Updates
      { name: 'VIEW_DAILY_UPDATES', description: 'View daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      { name: 'VIEW_DAILY_UPDATES_FULL', description: 'View all daily updates across projects', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      { name: 'APPROVE_UPDATES', description: 'Approve daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      { name: 'CREATE_DAILY_UPDATES', description: 'Create daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      { name: 'UPDATE_DAILY_UPDATES', description: 'Update daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      { name: 'DELETE_DAILY_UPDATES', description: 'Delete daily updates', moduleId: createdModules.find(m => m.code === 'DAILY_UPDATE')!.id },
      // Module Management
      { name: 'VIEW_MODULE_MANAGEMENT', description: 'View module management', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT')!.id },
      { name: 'CREATE_MODULE', description: 'Create new modules', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT')!.id },
      { name: 'UPDATE_MODULE', description: 'Update module data', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT')!.id },
      { name: 'DELETE_MODULE', description: 'Delete modules', moduleId: createdModules.find(m => m.code === 'MODULE_MANAGEMENT')!.id },
      // Permission Management
      { name: 'VIEW_PERMISSION_MANAGEMENT', description: 'View permission management', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT')!.id },
      { name: 'CREATE_PERMISSION', description: 'Create new permissions', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT')!.id },
      { name: 'UPDATE_PERMISSION', description: 'Update permission data', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT')!.id },
      { name: 'DELETE_PERMISSION', description: 'Delete permissions', moduleId: createdModules.find(m => m.code === 'PERMISSION_MANAGEMENT')!.id },
      // Role Management
      { name: 'VIEW_ROLE_MANAGEMENT', description: 'View role management', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT')!.id },
      { name: 'CREATE_ROLE', description: 'Create new roles', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT')!.id },
      { name: 'UPDATE_ROLE', description: 'Update role data', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT')!.id },
      { name: 'DELETE_ROLE', description: 'Delete roles', moduleId: createdModules.find(m => m.code === 'ROLE_MANAGEMENT')!.id },
      // Team Management
      { name: 'VIEW_TEAM_MANAGEMENT', description: 'View team management', moduleId: createdModules.find(m => m.code === 'TEAM')!.id },
      { name: 'CREATE_TEAM', description: 'Create new teams', moduleId: createdModules.find(m => m.code === 'TEAM')!.id },
      { name: 'UPDATE_TEAM', description: 'Update team data', moduleId: createdModules.find(m => m.code === 'TEAM')!.id },
      { name: 'DELETE_TEAM', description: 'Delete teams', moduleId: createdModules.find(m => m.code === 'TEAM')!.id },
    ];

    const createdPermissions = await db.insert(schemas.permissions).values(permissionsData).returning();
    console.log('✅ Permissions created');

    // Create roles
    const rolesData = [
      { name: 'SUPER_ADMIN', description: 'Super administrator with full access', level: 'ADMIN' },
      { name: 'PROJECT_MANAGER', description: 'Project manager role with full project permissions', level: 'MANAGER' },
      { name: 'TEAM_LEAD', description: 'Team lead role with team management permissions', level: 'MANAGER' },
      { name: 'DEVELOPER', description: 'Developer role with limited permissions', level: 'USER' },
    ];

    const createdRoles = await db.insert(schemas.roles).values(rolesData).returning();
    console.log('✅ Roles created');

    // Create users for Singlife project
    const hashedPassword = await bcrypt.hash('password123', 12);
    const usersData = [
      // Manager
      {
        firstName: 'Bala',
        lastName: 'Manager',
        email: 'bala@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'Project Manager',
        employeeId: 'SING-001',
      },
      // Team Lead
      {
        firstName: 'Ashok',
        lastName: 'TeamLead',
        email: 'ashok@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'Team Lead',
        employeeId: 'SING-002',
      },
      // Mobile Team
      {
        firstName: 'Shyaam',
        lastName: 'Mobile',
        email: 'shyaam@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'Mobile Developer',
        employeeId: 'SING-003',
      },
      // Web App Team
      {
        firstName: 'Sujan',
        lastName: 'WebApp',
        email: 'sujan@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'Web Developer',
        employeeId: 'SING-004',
      },
      {
        firstName: 'Anbu',
        lastName: 'WebApp',
        email: 'anbu@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'Web Developer',
        employeeId: 'SING-005',
      },
      // TechOps Team
      {
        firstName: 'Harish',
        lastName: 'TechOps',
        email: 'harish@singlife.com',
        password: hashedPassword,
        department: 'IT',
        position: 'DevOps Engineer',
        employeeId: 'SING-006',
      },
    ];

    const createdUsers = await db.insert(schemas.users).values(usersData).returning();
    console.log('✅ Users created');

    // Create projects
    const projectsData = [
      {
        name: 'Singlife Project',
        description: 'Singlife project containing multiple teams',
        code: 'SINGLIFE-2025',
        managerId: createdUsers.find(u => u.email === 'bala@singlife.com')!.id,
        status: 'ACTIVE',
      },
    ];

    const createdProjects = await db.insert(schemas.projects).values(projectsData).returning();
    console.log('✅ Projects created');

    // Create teams for each project
    const teamsData = [
      // Singlife Project
      {
        name: 'Mobile Team',
        description: 'Mobile development team for Singlife',
        projectId: createdProjects[0].id,
        leadId: createdUsers.find(u => u.email === 'shyaam@singlife.com')!.id,
      },
      {
        name: 'Web App Team',
        description: 'Web application development team for Singlife',
        projectId: createdProjects[0].id,
        leadId: createdUsers.find(u => u.email === 'sujan@singlife.com')!.id,
      },
      {
        name: 'TechOps Team',
        description: 'DevOps and infrastructure team for Singlife',
        projectId: createdProjects[0].id,
        leadId: createdUsers.find(u => u.email === 'harish@singlife.com')!.id,
      },
    ];

    const createdTeams = await db.insert(schemas.teams).values(teamsData).returning();
    console.log('✅ Teams created');

    // Assign roles to users
    const userRolesData = [
      // Singlife Project
      { userId: createdUsers.find(u => u.email === 'bala@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'PROJECT_MANAGER')!.id },
      { userId: createdUsers.find(u => u.email === 'ashok@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'TEAM_LEAD')!.id },
      { userId: createdUsers.find(u => u.email === 'shyaam@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'sujan@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'anbu@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'harish@singlife.com')!.id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
    ];

    await db.insert(schemas.userRoles).values(userRolesData);
    console.log('✅ User roles assigned');

    // Assign permissions to roles
    const rolePermissionsData: { roleId: string; permissionId: string }[] = [];

    // SUPER_ADMIN gets all permissions
    const superAdminRole = createdRoles.find(r => r.name === 'SUPER_ADMIN');
    if (superAdminRole) {
      createdPermissions.forEach(permission => {
        rolePermissionsData.push({
          roleId: superAdminRole.id,
          permissionId: permission.id,
        });
      });
    }

    // PROJECT_MANAGER gets all permissions (including VIEW_DAILY_UPDATES_FULL)
    const projectManagerRole = createdRoles.find(r => r.name === 'PROJECT_MANAGER');
    if (projectManagerRole) {
      createdPermissions.forEach(permission => {
        rolePermissionsData.push({
          roleId: projectManagerRole.id,
          permissionId: permission.id,
        });
      });
    }

    // TEAM_LEAD gets all permissions (including VIEW_DAILY_UPDATES_FULL)
    const teamLeadRole = createdRoles.find(r => r.name === 'TEAM_LEAD');
    if (teamLeadRole) {
      createdPermissions.forEach(permission => {
        rolePermissionsData.push({
          roleId: teamLeadRole.id,
          permissionId: permission.id,
        });
      });
    }

    // DEVELOPER gets only basic daily update permissions (VIEW_DAILY_UPDATES, not VIEW_DAILY_UPDATES_FULL)
    const developerRole = createdRoles.find(r => r.name === 'DEVELOPER');
    if (developerRole) {
      const dailyUpdatePermissions = createdPermissions.filter(p =>
        (p.name.includes('DAILY_UPDATES') && !p.name.includes('FULL')) ||
        p.name.includes('CREATE') ||
        p.name.includes('UPDATE') ||
        p.name.includes('DELETE')
      );
      dailyUpdatePermissions.forEach(permission => {
        rolePermissionsData.push({
          roleId: developerRole.id,
          permissionId: permission.id,
        });
      });
    }

    await db.insert(schemas.rolePermissions).values(rolePermissionsData);
    console.log('✅ Role permissions assigned');

    // Assign users to projects
    const userProjectsData = [
      // Singlife Project
      { userId: createdUsers.find(u => u.email === 'bala@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'PROJECT_MANAGER')!.id },
      { userId: createdUsers.find(u => u.email === 'ashok@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'TEAM_LEAD')!.id },
      { userId: createdUsers.find(u => u.email === 'shyaam@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'sujan@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'anbu@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
      { userId: createdUsers.find(u => u.email === 'harish@singlife.com')!.id, projectId: createdProjects[0].id, roleId: createdRoles.find(r => r.name === 'DEVELOPER')!.id },
    ];

    await db.insert(schemas.userProjects).values(userProjectsData);
    console.log('✅ Users assigned to projects');

    // Assign users to teams
    const userTeamsData = [
      // Singlife Project
      { userId: createdUsers.find(u => u.email === 'shyaam@singlife.com')!.id, teamId: createdTeams[0].id },
      { userId: createdUsers.find(u => u.email === 'sujan@singlife.com')!.id, teamId: createdTeams[1].id },
      { userId: createdUsers.find(u => u.email === 'anbu@singlife.com')!.id, teamId: createdTeams[1].id },
      { userId: createdUsers.find(u => u.email === 'harish@singlife.com')!.id, teamId: createdTeams[2].id },
    ];

    await db.insert(schemas.userTeams).values(userTeamsData);
    console.log('✅ Users assigned to teams');

    // Create sample daily updates for testing
    const dailyUpdatesData = [
      // Singlife Project
      {
        userId: createdUsers.find(u => u.email === 'shyaam@singlife.com')!.id,
        projectId: createdProjects[0].id,
        teamId: createdTeams[0].id,
        date: new Date('2025-01-15'),
        tickets: 'SINGLIFE-001',
        ticketsHours: '4.00',
        internalMeetingHours: '2.00',
        externalMeetingHours: '1.00',
        otherActivities: 'Mobile app development',
        otherActivityHours: '3.00',
        leavePermissionHours: '0.00',
        totalHours: '10.00',
        notes: 'Completed mobile app features',
        status: 'APPROVED',
        submittedAt: new Date('2025-01-15T18:00:00Z'),
        approvedAt: new Date('2025-01-16T09:00:00Z'),
        approvedBy: createdUsers.find(u => u.email === 'ashok@singlife.com')!.id,
      },
      {
        userId: createdUsers.find(u => u.email === 'sujan@singlife.com')!.id,
        projectId: createdProjects[0].id,
        teamId: createdTeams[1].id,
        date: new Date('2025-01-15'),
        tickets: 'SINGLIFE-002',
        ticketsHours: '3.50',
        internalMeetingHours: '1.50',
        externalMeetingHours: '0.50',
        otherActivities: 'Web app development',
        otherActivityHours: '4.00',
        leavePermissionHours: '0.00',
        totalHours: '9.50',
        notes: 'Implemented user authentication',
        status: 'APPROVED',
        submittedAt: new Date('2025-01-15T18:00:00Z'),
        approvedAt: new Date('2025-01-16T09:00:00Z'),
        approvedBy: createdUsers.find(u => u.email === 'ashok@singlife.com')!.id,
      },
      {
        userId: createdUsers.find(u => u.email === 'anbu@singlife.com')!.id,
        projectId: createdProjects[0].id,
        teamId: createdTeams[1].id,
        date: new Date('2025-01-15'),
        tickets: 'SINGLIFE-003',
        ticketsHours: '2.00',
        internalMeetingHours: '1.00',
        externalMeetingHours: '2.00',
        otherActivities: 'DevOps tasks',
        otherActivityHours: '3.00',
        leavePermissionHours: '0.00',
        totalHours: '8.00',
        notes: 'Deployed new version of web app',
        status: 'APPROVED',
        submittedAt: new Date('2025-01-15T18:00:00Z'),
        approvedAt: new Date('2025-01-16T09:00:00Z'),
        approvedBy: createdUsers.find(u => u.email === 'harish@singlife.com')!.id,
      },
    ];

    await db.insert(schemas.dailyUpdates).values(dailyUpdatesData);
    console.log('✅ Sample daily updates created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Project Structure:');
    console.log('1. Singlife Project (SINGLIFE-2025)');
    console.log('   - Manager: Bala Manager (bala@singlife.com)');
    console.log('   - Team Lead: Ashok TeamLead (ashok@singlife.com)');
    console.log('   - Mobile Team: Shyaam Mobile (shyaam@singlife.com)');
    console.log('   - Web App Team: Sujan WebApp (sujan@singlife.com), Anbu WebApp (anbu@singlife.com)');
    console.log('   - TechOps Team: Harish TechOps (harish@singlife.com)');
    console.log('');
    console.log('🔑 Sample credentials (all users):');
    console.log('Email: [user-email] / Password: password123');
    console.log('');
    console.log('📊 Permission Structure:');
    console.log('- Bala (Manager): All permissions (including VIEW_DAILY_UPDATES_FULL)');
    console.log('- Ashok (Team Lead): All permissions (including VIEW_DAILY_UPDATES_FULL)');
    console.log('- Developers: Only basic daily update permissions (VIEW_DAILY_UPDATES - own updates only)');
    console.log('');
    console.log('🔍 Daily Update Access:');
    console.log('- VIEW_DAILY_UPDATES_FULL: Can see all updates across the project');
    console.log('- VIEW_DAILY_UPDATES: Can only see their own updates');
    console.log('');
    console.log('🧪 Test the Permission Logic:');
    console.log('1. Login as Bala (Manager) - should see all updates');
    console.log('2. Login as Shyaam (Developer) - should only see own updates');
    console.log('3. Try filtering by userId - Managers can, Developers cannot');
    console.log('4. Check logs for permission decision details');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});