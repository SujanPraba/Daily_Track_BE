import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { AssignPermissionsDto } from '../dtos/assign-permissions.dto';
import { SearchRolesDto } from '../dtos/search-roles.dto';
import { PaginatedRolesDto } from '../dtos/paginated-roles.dto';
import { Role } from '../../../database/schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findByName(createRoleDto.name);
    if (existingRole) {
      throw new BadRequestException('Role with this name already exists');
    }
    
    // Extract permissionIds from the DTO
    const { permissionIds, ...roleData } = createRoleDto;
    
    // Create the role first
    const createdRole = await this.roleRepository.create(roleData);
    
    // If permissionIds are provided, assign them to the role
    if (permissionIds && permissionIds.length > 0) {
      await this.roleRepository.assignPermissions(createdRole.id, permissionIds);
    }
    
    return createdRole;
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async searchRoles(searchDto: SearchRolesDto): Promise<PaginatedRolesDto> {
    return this.roleRepository.searchRoles(searchDto);
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findById(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    return this.roleRepository.update(id, updateRoleDto);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.delete(id);
  }

  async assignPermissions(roleId: string, assignPermissionsDto: AssignPermissionsDto): Promise<void> {
    const role = await this.findOne(roleId);
    await this.roleRepository.assignPermissions(roleId, assignPermissionsDto.permissionIds);
  }

  async getRolePermissions(roleId: string) {
    const role = await this.findOne(roleId);
    return this.roleRepository.getRolePermissions(roleId);
  }
}