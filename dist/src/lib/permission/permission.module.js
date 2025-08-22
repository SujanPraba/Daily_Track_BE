"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModule = void 0;
const common_1 = require("@nestjs/common");
const permission_service_1 = require("./services/permission.service");
const permission_controller_1 = require("./controllers/permission.controller");
const permission_repository_1 = require("./repositories/permission.repository");
let PermissionModule = class PermissionModule {
};
exports.PermissionModule = PermissionModule;
exports.PermissionModule = PermissionModule = __decorate([
    (0, common_1.Module)({
        providers: [permission_service_1.PermissionService, permission_repository_1.PermissionRepository],
        controllers: [permission_controller_1.PermissionController],
        exports: [permission_service_1.PermissionService, permission_repository_1.PermissionRepository],
    })
], PermissionModule);
//# sourceMappingURL=permission.module.js.map