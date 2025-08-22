"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./lib/auth/auth.module");
const permission_module_1 = require("./lib/permission/permission.module");
const role_module_1 = require("./lib/role/role.module");
const project_module_1 = require("./lib/project/project.module");
const team_module_1 = require("./lib/team/team.module");
const user_module_1 = require("./lib/user/user.module");
const daily_update_module_1 = require("./lib/daily-update/daily-update.module");
const migration_service_1 = require("./database/migration.service");
let AppModule = class AppModule {
    constructor(migrationService) {
        this.migrationService = migrationService;
        this.runMigrationsOnStartup();
    }
    async runMigrationsOnStartup() {
        await this.migrationService.runMigrations();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: Number(process.env.THROTTLE_TTL) || 60000,
                    limit: Number(process.env.THROTTLE_LIMIT) || 100,
                }]),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            permission_module_1.PermissionModule,
            role_module_1.RoleModule,
            project_module_1.ProjectModule,
            team_module_1.TeamModule,
            user_module_1.UserModule,
            daily_update_module_1.DailyUpdateModule,
        ],
        providers: [migration_service_1.MigrationService],
    }),
    __metadata("design:paramtypes", [migration_service_1.MigrationService])
], AppModule);
//# sourceMappingURL=app.module.js.map