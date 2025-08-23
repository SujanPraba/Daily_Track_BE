import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ModuleRepository } from '../repositories/module.repository';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { UpdateModuleDto } from '../dtos/update-module.dto';
import { SearchModulesDto } from '../dtos/search-modules.dto';
import { PaginatedModulesDto } from '../dtos/paginated-modules.dto';
import { ModuleResponseDto } from '../dtos/module-response.dto';
import { Module } from '../../../database/schemas/module.schema';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async create(createModuleDto: CreateModuleDto): Promise<Module> {
    const existingModule = await this.moduleRepository.findByCode(createModuleDto.code);
    if (existingModule) {
      throw new BadRequestException('Module with this code already exists');
    }
    return this.moduleRepository.create(createModuleDto);
  }

  async findAll(): Promise<Module[]> {
    return this.moduleRepository.findAll();
  }

  async searchModules(searchDto: SearchModulesDto): Promise<PaginatedModulesDto> {
    return this.moduleRepository.searchModules(searchDto);
  }

  async findActive(): Promise<Module[]> {
    return this.moduleRepository.findActive();
  }

  async findAllWithActivePermissions(): Promise<any[]> {
    return this.moduleRepository.findAllWithActivePermissions();
  }

  async findOne(id: string): Promise<Module> {
    const module = await this.moduleRepository.findById(id);
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module;
  }

  async findOneWithPermissions(id: string): Promise<ModuleResponseDto> {
    const module = await this.moduleRepository.findByIdWithPermissions(id);
    if (!module) {
      throw new NotFoundException('Module not found');
    }
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto): Promise<Module> {
    const module = await this.findOne(id);
    
    if (updateModuleDto.code) {
      const existingModule = await this.moduleRepository.findByCode(updateModuleDto.code);
      if (existingModule && existingModule.id !== id) {
        throw new BadRequestException('Module with this code already exists');
      }
    }
    
    return this.moduleRepository.update(id, updateModuleDto);
  }

  async updateWithPermissions(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleResponseDto> {
    const module = await this.findOne(id);
    
    if (updateModuleDto.code) {
      const existingModule = await this.moduleRepository.findByCode(updateModuleDto.code);
      if (existingModule && existingModule.id !== id) {
        throw new BadRequestException('Module with this code already exists');
      }
    }
    
    // Extract permissions from the DTO
    const { permissions, ...moduleData } = updateModuleDto;
    
    return this.moduleRepository.updateWithPermissions(id, moduleData, permissions);
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepository.delete(id);
  }
}
