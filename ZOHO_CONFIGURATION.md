# Zoho People Integration Configuration

## Overview

This integration allows you to automatically sync daily updates to Zoho People for log time tracking. When you create a daily update with `syncToZoho: true`, the system will automatically create corresponding log time entries in Zoho People.

## Environment Variables

Add these environment variables to your `.env` file:

```bash
# Zoho People API Configuration
ZOHO_PEOPLE_BASE_URL=https://people.zoho.com
ZOHO_PEOPLE_CLIENT_ID=your_client_id_here
ZOHO_PEOPLE_CLIENT_SECRET=your_client_secret_here
ZOHO_PEOPLE_REFRESH_TOKEN=your_refresh_token_here
ZOHO_PEOPLE_ORG_ID=your_organization_id_here
```

## Getting Zoho People API Credentials

### 1. Create Zoho App

1. Go to [Zoho Developer Console](https://api-console.zoho.com/)
2. Click "Add Client"
3. Choose "Self-Client" as client type
4. Fill in the required details:
   - **Client Name**: Daily Track BE Integration
   - **Homepage URL**: Your application URL
   - **Authorized Redirect URIs**: Your callback URL (if needed)
5. Save the client

### 2. Generate Refresh Token

1. In your Zoho app, go to "Self-Client" tab
2. Copy the **Client ID** and **Client Secret**
3. Generate a **Refresh Token** using the OAuth flow
4. Note down the **Organization ID** from your Zoho People account

### 3. API Scopes

Ensure your Zoho app has the following scopes:
- `ZohoPeople.logtime.ALL`
- `ZohoPeople.users.READ`
- `ZohoPeople.projects.READ`

## API Endpoints

### 1. Create Daily Update with Zoho Sync

```http
POST /daily-updates/zoho-sync
Content-Type: application/json
Authorization: Bearer {your_jwt_token}

{
  "userId": "user-uuid",
  "projectId": "project-uuid",
  "teamId": "team-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "tickets": "TICKET-001, TICKET-002",
  "ticketsHours": "4.50",
  "internalMeetingHours": "1.00",
  "externalMeetingHours": "0.50",
  "otherActivities": "Code review, documentation",
  "otherActivityHours": "2.00",
  "notes": "Completed user authentication feature",
  "syncToZoho": true,
  "zohoUserId": "ZOHO-USER-123",
  "zohoProjectId": "ZOHO-PROJECT-456",
  "zohoDraft": false
}
```

### 2. Test Zoho Connection

```http
GET /daily-updates/zoho/test-connection
Authorization: Bearer {your_jwt_token}
```

### 3. Get Activity Types

```http
GET /daily-updates/zoho/activity-types
Authorization: Bearer {your_jwt_token}
```

## Request Body Schema

### ZohoSyncDailyUpdateDto

```typescript
{
  // Required fields
  userId: string;           // UUID of the user
  projectId: string;        // UUID of the project
  date: string;            // ISO date string
  
  // Optional time fields
  teamId?: string;         // UUID of the team
  tickets?: string;        // Comma-separated ticket numbers
  ticketsHours?: string;   // Hours spent on tickets
  internalMeetingHours?: string;  // Internal meeting hours
  externalMeetingHours?: string;  // External meeting hours
  otherActivities?: string;      // Description of other activities
  otherActivityHours?: string;   // Hours for other activities
  leavePermissionHours?: string; // Leave/permission hours
  notes?: string;          // Additional notes
  
  // Zoho sync options
  syncToZoho?: boolean;    // Whether to sync to Zoho (default: false)
  zohoUserId?: string;     // Zoho People user ID
  zohoProjectId?: string;  // Zoho People project ID
  zohoDraft?: boolean;     // Create as draft in Zoho (default: false)
  
  // Detailed log time entries (optional)
  zohoLogTimeEntries?: ZohoLogTimeEntry[];
}
```

### ZohoLogTimeEntry

```typescript
{
  ticketId: string;        // Zoho ticket/issue ID
  activityType: string;    // Activity type (Development, Testing, etc.)
  hours: number;           // Hours spent
  description?: string;     // Description of work
  logDate: string;         // ISO date string
}
```

## Response Schema

### ZohoSyncResponseDto

```typescript
{
  id: string;              // UUID of created daily update
  message: string;         // Success/error message
  success: boolean;        // Whether operation was successful
  createdAt: string;       // ISO timestamp of creation
  
  zohoSyncDetails?: {
    synced: boolean;       // Whether Zoho sync was successful
    zohoEntries: number;   // Number of log time entries created
    errors: string[];      // Array of error messages
    zohoResponse?: any;    // Raw Zoho API response
  };
}
```

## Automatic Time Breakdown

If you don't provide `zohoLogTimeEntries`, the system automatically creates log time entries based on your time fields:

- **Tickets**: Maps to "Development" activity type
- **Internal Meetings**: Maps to "Meeting" activity type
- **External Meetings**: Maps to "Meeting" activity type
- **Other Activities**: Maps to "Other" activity type
- **Leave/Permission**: Maps to "Leave" activity type

## Error Handling

The system handles various error scenarios:

1. **Zoho API Errors**: Network issues, authentication failures, API limits
2. **Validation Errors**: Invalid user/project IDs, missing required fields
3. **Partial Sync**: Some entries succeed, others fail
4. **Fallback Behavior**: Uses employee ID or project code if Zoho IDs not provided

## Testing

### 1. Test Connection

```bash
curl -X GET "http://localhost:3000/daily-updates/zoho/test-connection" \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 2. Test Activity Types

```bash
curl -X GET "http://localhost:3000/daily-updates/zoho/activity-types" \
  -H "Authorization: Bearer {your_jwt_token}"
```

### 3. Test Sync

```bash
curl -X POST "http://localhost:3000/daily-updates/zoho-sync" \
  -H "Authorization: Bearer {your_jwt_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "projectId": "project-uuid",
    "date": "2024-01-15T00:00:00.000Z",
    "tickets": "TICKET-001",
    "ticketsHours": "4.00",
    "syncToZoho": true
  }'
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check client ID, client secret, and refresh token
   - Ensure refresh token hasn't expired
   - Verify organization ID is correct

2. **API Rate Limits**
   - Zoho has rate limits on API calls
   - Implement retry logic for failed requests
   - Monitor API usage

3. **Mapping Issues**
   - Ensure Zoho user IDs and project IDs are correct
   - Check if fallback IDs are working
   - Verify user has access to specified project

4. **Network Issues**
   - Check internet connectivity
   - Verify Zoho People API endpoints are accessible
   - Check firewall/proxy settings

### Debug Steps

1. Check application logs for detailed error messages
2. Use the test connection endpoint to verify API access
3. Verify environment variables are set correctly
4. Check Zoho People account permissions and settings
5. Monitor Zoho API response codes and error messages

## Best Practices

1. **Always test connection** before implementing in production
2. **Use draft mode** initially to avoid creating submitted entries
3. **Implement retry logic** for failed API calls
4. **Monitor sync status** and handle partial failures gracefully
5. **Cache activity types** to reduce API calls
6. **Log all sync operations** for audit trails
7. **Handle rate limits** by implementing delays between requests

## Security Considerations

1. **Store sensitive credentials** in environment variables
2. **Use HTTPS** for all API communications
3. **Implement proper authentication** for your endpoints
4. **Validate all input data** before processing
5. **Log security events** and monitor for suspicious activity
6. **Regularly rotate** refresh tokens
7. **Limit API access** to necessary scopes only
