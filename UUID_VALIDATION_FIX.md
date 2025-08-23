# UUID Validation Fix for Optional Fields

## Problem Description

The error `{"message":["managerId must be a UUID"],"error":"Bad Request","statusCode":400}` occurs when creating a project without providing a `managerId`, even though the field is marked as optional.

## Root Cause

The issue is with the combination of `@IsOptional()` and `@IsUUID()` decorators. When a field is optional and not provided, the `@IsUUID()` validation still runs and fails because it receives `undefined` or an empty string.

## Solution

Use `@ValidateIf()` decorator to conditionally apply UUID validation only when the field has a value:

```typescript
@ApiProperty({ 
  example: 'uuid-manager-id',
  description: 'ID of the project manager (optional)',
  required: false
})
@IsOptional()
@ValidateIf((o) => o.managerId !== undefined && o.managerId !== null && o.managerId !== '')
@IsUUID()
managerId?: string;
```

## Files Fixed

### 1. Project DTOs
- **File:** `src/lib/project/dtos/create-project.dto.ts`
- **Field:** `managerId` - Now properly handles optional UUID validation

### 2. Team DTOs
- **File:** `src/lib/team/dtos/create-team.dto.ts`
- **Field:** `leadId` - Now properly handles optional UUID validation

### 3. Daily Update DTOs
- **File:** `src/lib/daily-update/dtos/create-daily-update.dto.ts`
- **Field:** `teamId` - Now properly handles optional UUID validation

## Validation Pattern

For any optional UUID field, use this pattern:

```typescript
@IsOptional()
@ValidateIf((o) => o.fieldName !== undefined && o.fieldName !== null && o.fieldName !== '')
@IsUUID()
fieldName?: string;
```

## Why This Happens

1. **`@IsOptional()`** - Makes the field optional in the schema
2. **`@IsUUID()`** - Validates that the field is a valid UUID format
3. **The Problem** - When the field is not provided, `@IsUUID()` still runs and receives `undefined`
4. **The Solution** - `@ValidateIf()` ensures validation only runs when the field has a value

## Alternative Solutions

### Option 1: Use ValidateIf (Recommended)
```typescript
@ValidateIf((o) => o.fieldName !== undefined && o.fieldName !== null && o.fieldName !== '')
@IsUUID()
fieldName?: string;
```

### Option 2: Use Transform
```typescript
@Transform(({ value }) => value === '' ? undefined : value)
@IsOptional()
@IsUUID()
fieldName?: string;
```

### Option 3: Use Custom Validator
```typescript
@IsOptional()
@IsUUID('4', { message: 'Field must be a valid UUID when provided' })
fieldName?: string;
```

## Best Practices

1. **Always use `@ValidateIf()`** for optional UUID fields
2. **Check for empty strings** in addition to undefined/null
3. **Provide clear API documentation** about which fields are optional
4. **Test with and without optional fields** to ensure validation works correctly

## Testing the Fix

### Test Case 1: Create Project Without Manager
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Project",
    "code": "TEST-001"
  }'
```
**Expected Result:** Success (no validation error)

### Test Case 2: Create Project With Manager
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Project",
    "code": "TEST-001",
    "managerId": "valid-uuid-here"
  }'
```
**Expected Result:** Success (with UUID validation)

### Test Case 3: Create Project With Invalid Manager UUID
```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Project",
    "code": "TEST-001",
    "managerId": "invalid-uuid"
  }'
```
**Expected Result:** Validation error for invalid UUID format

## Prevention

To prevent this issue in the future:

1. **Use the validation pattern** shown above for all optional UUID fields
2. **Add validation tests** for both scenarios (with and without the field)
3. **Document optional fields** clearly in API documentation
4. **Use TypeScript strict mode** to catch potential issues at compile time

## Related Issues

This same pattern should be applied to any optional field that has specific format validation:
- UUID fields
- Email fields
- Date fields
- Numeric fields with specific ranges
- Enum fields with specific values
