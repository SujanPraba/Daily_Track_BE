import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { SearchPermissionsDto } from '../dtos/search-permissions.dto';
import { PaginatedPermissionsDto } from '../dtos/paginated-permissions.dto';
import { Permission } from '../../../database/schemas/permission.schema';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findByName(createPermissionDto.name);
    if (existingPermission) {
      throw new BadRequestException('Permission with this name already exists');
    }
    return this.permissionRepository.create(createPermissionDto);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async findAllWithModule(): Promise<any[]> {
    return this.permissionRepository.findAllWithModule();
  }

  async searchPermissions(searchDto: SearchPermissionsDto): Promise<PaginatedPermissionsDto> {
    return this.permissionRepository.searchPermissions(searchDto);
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async findOneWithModule(id: string): Promise<any> {
    const permission = await this.permissionRepository.findByIdWithModule(id);
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);
    return this.permissionRepository.update(id, updatePermissionDto);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.delete(id);
  }

  async findByModuleId(moduleId: string): Promise<Permission[]> {
    return this.permissionRepository.findByModuleId(moduleId);
  }
}