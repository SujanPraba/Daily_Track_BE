import { Module } from '@nestjs/common';
import { ModuleService } from './services/module.service';
import { ModuleController } from './controllers/module.controller';
import { ModuleRepository } from './repositories/module.repository';

@Module({
  providers: [ModuleService, ModuleRepository],
  controllers: [ModuleController],
  exports: [ModuleService, ModuleRepository],
})
export class ModuleModule {}
