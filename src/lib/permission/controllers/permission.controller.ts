import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';
import { PermissionResponseDto } from '../dtos/permission-response.dto';
import { Permission } from '../../../database/schemas/permission.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ 
    status: 201, 
    description: 'Permission created successfully',
    type: PermissionResponseDto
  })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Get all permissions (without pagination)' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all permissions',
    type: [PermissionResponseDto]
  })
  @Get()
  findAll(@Query('moduleId') moduleId?: string) {
    if (moduleId) {
      return this.permissionService.findByModuleId(moduleId);
    }
    return this.permissionService.findAllWithModule();
  }

  @ApiOperation({ summary: 'Search and get all permissions with pagination and filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of permissions',
    type: PaginatedPermissionsDto
  })
  @Post('search')
  searchPermissions(@Body() searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto> {
    return this.permissionService.searchPermissions(searchDto);
  }

  @ApiOperation({ summary: 'Get permission by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Permission found',
    type: PermissionResponseDto
  })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }

  @ApiOperation({ summary: 'Get permission by ID with module information' })
  @ApiResponse({ 
    status: 200, 
    description: 'Permission found with module information',
    type: PermissionResponseDto
  })
  @ApiResponse({ status: 404, description: 'Permission not found' })
  @Get(':id/with-module')
  findOneWithModule(@Param('id') id: string) {
    return this.permissionService.findOneWithModule(id);
  }

  @ApiOperation({ summary: 'Update permission' })
  @ApiResponse({ 
    status: 200, 
    description: 'Permission updated successfully',
    type: PermissionResponseDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Delete permission' })
  @ApiResponse({ status: 200, description: 'Permission deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.permissionService.remove(id);
  }
}