import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ModuleService } from '../services/module.service';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { UpdateModuleDto } from '../dtos/update-module.dto';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
import { Module } from '../../../database/schemas/module.schema';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ModuleWithPermissionsDto } from '../dtos/modules-with-permissions.dto';

@ApiTags('Modules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @ApiOperation({ summary: 'Create a new module' })
  @ApiResponse({ status: 201, description: 'Module created successfully' })
  @Post()
  create(@Body() createModuleDto: CreateModuleDto) {
    return this.moduleService.create(createModuleDto);
  }

  @ApiOperation({ summary: 'Get all modules (without pagination)' })
  @ApiResponse({ status: 200, description: 'List of all modules' })
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @ApiOperation({ summary: 'Search and get all modules with pagination and filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of modules',
    type: PaginatedModulesDto
  })
  @Post('search')
  searchModules(@Body() searchDto: SearchModulesDto): Promise<PaginatedModulesDto> {
    return this.moduleService.searchModules(searchDto);
  }

  @ApiOperation({ summary: 'Get all active modules' })
  @ApiResponse({ status: 200, description: 'List of active modules' })
  @Get('active')
  findActive() {
    return this.moduleService.findActive();
  }

  @ApiOperation({ summary: 'Get all modules with their active permissions' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all modules with their active permissions',
    type: [ModuleWithPermissionsDto]
  })
  @Get('with-permissions')
  findAllWithPermissions() {
    return this.moduleService.findAllWithActivePermissions();
  }

  @ApiOperation({ summary: 'Get module by ID with permissions' })
  @ApiResponse({ 
    status: 200, 
    description: 'Module found with permissions',
    type: ModuleResponseDto
  })
  @ApiResponse({ status: 404, description: 'Module not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ModuleResponseDto> {
    return this.moduleService.findOneWithPermissions(id);
  }

  @ApiOperation({ summary: 'Update module with permissions' })
  @ApiResponse({ 
    status: 200, 
    description: 'Module updated successfully with permissions',
    type: ModuleResponseDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto): Promise<ModuleResponseDto> {
    return this.moduleService.updateWithPermissions(id, updateModuleDto);
  }

  @ApiOperation({ summary: 'Delete module' })
  @ApiResponse({ status: 200, description: 'Module deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
