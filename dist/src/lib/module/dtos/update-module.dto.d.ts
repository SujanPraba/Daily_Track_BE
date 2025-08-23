import { CreateModuleDto } from './create-module.dto';
import { CreateModulePermissionDto } from './module-permission.dto';
declare const UpdateModuleDto_base: import("@nestjs/common").Type<Partial<CreateModuleDto>>;
export declare class UpdateModuleDto extends UpdateModuleDto_base {
    permissions?: CreateModulePermissionDto[];
}
export {};
