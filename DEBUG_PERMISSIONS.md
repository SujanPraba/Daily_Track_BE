# Debugging Daily Update Permission Issues

## Problem Description
User Bala has `VIEW_DAILY_UPDATES_FULL` permission but is not seeing all daily updates in the search results.

## Debugging Steps

### 1. Test the Permission System
Use the new test endpoint to verify permissions:

```bash
GET /daily-updates/test/search-permissions
```

This will show:
- Current user permissions
- User's project IDs
- Search results with no filters
- Expected behavior

### 2. Check Application Logs
Look for these log messages in the console:

```
🔍 Search request from user {userId} with criteria: {searchDto}
🔐 User permissions - VIEW_DAILY_UPDATES_FULL: {boolean}, VIEW_DAILY_UPDATES: {boolean}
📋 User {userId} has access to projects: {projectIds}
🔍 Final search criteria: {searchCriteria}
🔐 Permission summary - hasFullPermission: {boolean}, hasBasicPermission: {boolean}
📋 User project IDs: {projectIds}
📄 Pagination - page: {page}, limit: {limit}, offset: {offset}
🔍 Repository searchWithPagination called with criteria: {criteria}
📊 Repository query returned {count} results
👁️ VIEW_DAILY_UPDATES_FULL: Showing {count} updates across user's projects
```

### 3. Common Issues and Solutions

#### Issue 1: Incorrect Join in Repository
**Problem**: The repository was joining teams on `projectId` instead of `teamId`
**Solution**: Fixed in the code - teams join now uses `dailyUpdates.teamId = teams.id`

#### Issue 2: Permission Check Not Working
**Problem**: The `hasPermission` method might not be returning the correct value
**Solution**: Check the database for role-permission assignments

#### Issue 3: Project Access Restriction
**Problem**: User might not have access to the projects where daily updates exist
**Solution**: Verify user-project assignments in the database

### 4. Database Verification Queries

#### Check User Permissions
```sql
SELECT 
  u.email,
  r.name as role_name,
  p.name as permission_name
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE u.email = 'bala@singlife.com'
  AND p.name IN ('VIEW_DAILY_UPDATES_FULL', 'VIEW_DAILY_UPDATES');
```

#### Check User Projects
```sql
SELECT 
  u.email,
  p.name as project_name,
  p.id as project_id
FROM users u
JOIN user_projects up ON u.id = up.user_id
JOIN projects p ON up.project_id = p.id
WHERE u.email = 'bala@singlife.com';
```

#### Check Daily Updates
```sql
SELECT 
  du.id,
  du.user_id,
  du.project_id,
  du.team_id,
  p.name as project_name,
  t.name as team_name
FROM daily_updates du
JOIN projects p ON du.project_id = p.id
LEFT JOIN teams t ON du.team_id = t.id
ORDER BY du.created_at DESC;
```

### 5. Expected Behavior

#### For Users with VIEW_DAILY_UPDATES_FULL:
- Should see ALL daily updates from their assigned projects
- Can filter by any user, team, or project they have access to
- No userId restriction should be applied unless explicitly requested

#### For Users with only VIEW_DAILY_UPDATES:
- Should see ONLY their own daily updates
- userId filters are ignored and restricted to current user
- Project access is still restricted to assigned projects

### 6. Testing Scenarios

#### Test 1: No Filters (Should show all updates for managers)
```json
POST /daily-updates/search
{
  "page": 1,
  "limit": 10
}
```

#### Test 2: Filter by Specific User (Managers should see that user's updates)
```json
POST /daily-updates/search
{
  "userId": "some-user-id",
  "page": 1,
  "limit": 10
}
```

#### Test 3: Filter by Project (Should work for assigned projects)
```json
POST /daily-updates/search
{
  "projectId": "project-id",
  "page": 1,
  "limit": 10
}
```

### 7. Troubleshooting Checklist

- [ ] User has correct role assigned
- [ ] Role has correct permissions assigned
- [ ] User is assigned to projects
- [ ] Daily updates exist in those projects
- [ ] Permission check method is working
- [ ] Repository query is correct
- [ ] Join conditions are correct
- [ ] No unexpected filters are being applied

### 8. Quick Fix Commands

If you need to reset and test:

```bash
# 1. Run the seed file to reset data
npm run seed

# 2. Test the search endpoint
curl -X POST http://localhost:3000/daily-updates/search \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{"page": 1, "limit": 10}'

# 3. Check the test endpoint
curl -X GET http://localhost:3000/daily-updates/test/search-permissions \
  -H "Authorization: Bearer {token}"
```

### 9. Contact Points

If the issue persists:
1. Check the application logs for detailed permission information
2. Verify the database state with the SQL queries above
3. Test with the debug endpoints
4. Check if the permission system is working correctly in other parts of the application
