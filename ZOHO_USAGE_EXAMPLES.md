# Zoho People Integration Usage Examples

## Quick Start

### 1. Basic Daily Update with Zoho Sync

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-uuid-here",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "TICKET-001, TICKET-002",
  "ticketsHours": "6.00",
  "internalMeetingHours": "1.00",
  "notes": "Implemented user authentication and fixed bug in dashboard",
  "syncToZoho": true
}
```

**Response:**
```json
{
  "id": "daily-update-uuid",
  "message": "Daily update created and synced to Zoho People successfully. 2 log time entries created.",
  "success": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "zohoSyncDetails": {
    "synced": true,
    "zohoEntries": 2,
    "errors": [],
    "zohoResponse": [...]
  }
}
```

### 2. Detailed Log Time Entries

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-uuid-here",
  "date": "2024-01-15T00:00:00.000Z",
  "syncToZoho": true,
  "zohoUserId": "ZOHO-USER-123",
  "zohoProjectId": "ZOHO-PROJECT-456",
  "zohoLogTimeEntries": [
    {
      "ticketId": "TICKET-001",
      "activityType": "Development",
      "hours": 4.0,
      "description": "Implemented user authentication feature",
      "logDate": "2024-01-15"
    },
    {
      "ticketId": "TICKET-002",
      "activityType": "Testing",
      "hours": 2.0,
      "description": "Unit tests for auth module",
      "logDate": "2024-01-15"
    }
  ]
}
```

### 3. Draft Mode (Not Submitted)

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-uuid-here",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "TICKET-003",
  "ticketsHours": "3.50",
  "syncToZoho": true,
  "zohoDraft": true
}
```

## Real-World Scenarios

### Scenario 1: Developer Daily Update

**Context**: A developer working on multiple tickets throughout the day

```json
POST /daily-updates/zoho-sync
{
  "userId": "dev-user-uuid",
  "projectId": "singlife-project-uuid",
  "teamId": "mobile-team-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "SINGLIFE-001, SINGLIFE-002",
  "ticketsHours": "5.50",
  "internalMeetingHours": "1.00",
  "externalMeetingHours": "0.50",
  "otherActivities": "Code review, documentation",
  "otherActivityHours": "1.00",
  "notes": "Completed mobile app authentication and started dashboard implementation",
  "syncToZoho": true,
  "zohoUserId": "SING-003",
  "zohoProjectId": "SINGLIFE-2025"
}
```

**What happens:**
1. Daily update is created in your system
2. 4 log time entries are created in Zoho People:
   - Development: 5.5 hours (SINGLIFE-001, SINGLIFE-002)
   - Meeting: 1.0 hours (Internal team meeting)
   - Meeting: 0.5 hours (Client meeting)
   - Other: 1.0 hours (Code review, documentation)

### Scenario 2: Manager Overview

**Context**: A project manager wants to log time for project planning

```json
POST /daily-updates/zoho-sync
{
  "userId": "manager-user-uuid",
  "projectId": "singlife-project-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "PLANNING-001",
  "ticketsHours": "2.00",
  "internalMeetingHours": "3.00",
  "otherActivities": "Project planning, resource allocation",
  "otherActivityHours": "3.00",
  "notes": "Weekly project planning and team coordination",
  "syncToZoho": true,
  "zohoUserId": "SING-001",
  "zohoProjectId": "SINGLIFE-2025"
}
```

### Scenario 3: Team Lead Daily Update

**Context**: A team lead managing development and team coordination

```json
POST /daily-updates/zoho-sync
{
  "userId": "teamlead-user-uuid",
  "projectId": "singlife-project-uuid",
  "teamId": "web-team-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "SINGLIFE-003",
  "ticketsHours": "3.00",
  "internalMeetingHours": "2.00",
  "otherActivities": "Code review, team mentoring, sprint planning",
  "otherActivityHours": "3.00",
  "notes": "Led team sprint planning and reviewed pull requests",
  "syncToZoho": true,
  "zohoUserId": "SING-002",
  "zohoProjectId": "SINGLIFE-2025"
}
```

## Advanced Features

### 1. Multiple Projects in One Day

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-1-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "PROJ1-001",
  "ticketsHours": "4.00",
  "syncToZoho": true,
  "zohoProjectId": "ZOHO-PROJ-1"
}

POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-2-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "PROJ2-001",
  "ticketsHours": "4.00",
  "syncToZoho": true,
  "zohoProjectId": "ZOHO-PROJ-2"
}
```

### 2. Leave/Permission Time

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-uuid-here",
  "date": "2024-01-15T00:00:00.000Z",
  "leavePermissionHours": "8.00",
  "notes": "Annual leave",
  "syncToZoho": true
}
```

### 3. Weekend/After Hours Work

```json
POST /daily-updates/zoho-sync
{
  "userId": "user-uuid-here",
  "projectId": "project-uuid-here",
  "date": "2024-01-20T00:00:00.000Z",
  "tickets": "URGENT-001",
  "ticketsHours": "3.00",
  "notes": "Emergency bug fix over weekend",
  "syncToZoho": true
}
```

## Testing and Validation

### 1. Test Connection First

```bash
curl -X GET "http://localhost:3000/daily-updates/zoho/test-connection" \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 2. Check Available Activity Types

```bash
curl -X GET "http://localhost:3000/daily-updates/zoho/activity-types" \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 3. Test with Minimal Data

```bash
curl -X POST "http://localhost:3000/daily-updates/zoho-sync" \
  -H "Authorization: Bearer {your_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-uuid",
    "projectId": "test-project-uuid",
    "date": "2024-01-15T00:00:00.000Z",
    "tickets": "TEST-001",
    "ticketsHours": "1.00",
    "syncToZoho": true,
    "zohoDraft": true
  }'
```

## Error Handling Examples

### 1. Invalid User ID

```json
{
  "error": "User with ID invalid-uuid not found",
  "statusCode": 404
}
```

### 2. Zoho Sync Failed

```json
{
  "id": "daily-update-uuid",
  "message": "Daily update created but Zoho sync failed.",
  "success": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "zohoSyncDetails": {
    "synced": false,
    "zohoEntries": 0,
    "errors": ["Failed to authenticate with Zoho People API"]
  }
}
```

### 3. Partial Sync Success

```json
{
  "id": "daily-update-uuid",
  "message": "Daily update created but Zoho sync had 1 errors.",
  "success": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "zohoSyncDetails": {
    "synced": false,
    "zohoEntries": 2,
    "errors": ["Failed to create log time entry for ticket TICKET-003: Invalid activity type"],
    "zohoResponse": [...]
  }
}
```

## Best Practices

### 1. Always Use Draft Mode Initially

```json
{
  "zohoDraft": true
}
```

### 2. Provide Clear Descriptions

```json
{
  "notes": "Implemented user authentication with JWT tokens, added password reset functionality, and updated API documentation"
}
```

### 3. Use Consistent Ticket Naming

```json
{
  "tickets": "SINGLIFE-001, SINGLIFE-002, SINGLIFE-003"
}
```

### 4. Validate Before Production

1. Test with draft mode
2. Verify Zoho IDs are correct
3. Check activity types are supported
4. Monitor sync results

### 5. Handle Errors Gracefully

```typescript
// In your frontend application
try {
  const response = await createDailyUpdateWithZohoSync(data);
  
  if (response.success) {
    if (response.zohoSyncDetails?.synced) {
      showSuccess(`Daily update created and synced to Zoho! ${response.zohoSyncDetails.zohoEntries} entries created.`);
    } else {
      showWarning(`Daily update created but Zoho sync had issues. Check details.`);
    }
  }
} catch (error) {
  showError('Failed to create daily update');
}
```

## Monitoring and Logs

### 1. Check Application Logs

Look for these log messages:
```
🚀 Creating daily update with Zoho sync for user: {userId}
✅ Daily update created with ID: {id}
🔄 Starting Zoho People sync for daily update: {id}
✅ Zoho sync completed successfully: {count} entries
```

### 2. Monitor Zoho API Usage

- Check rate limits
- Monitor authentication token expiry
- Track sync success/failure rates
- Monitor API response times

### 3. Audit Trail

All operations are logged with:
- User ID and timestamp
- Request details
- Zoho API responses
- Error details and stack traces
