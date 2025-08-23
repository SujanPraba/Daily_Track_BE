import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './lib/auth/auth.module';
import { PermissionModule } from './lib/permission/permission.module';
import { RoleModule } from './lib/role/role.module';
import { ProjectModule } from './lib/project/project.module';
import { TeamModule } from './lib/team/team.module';
import { UserModule } from './lib/user/user.module';
import { DailyUpdateModule } from './lib/daily-update/daily-update.module';
import { ModuleModule } from './lib/module/module.module';
import { MigrationService } from './database/migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: Number(process.env.THROTTLE_TTL) || 60000,
      limit: Number(process.env.THROTTLE_LIMIT) || 100,
    }]),
    DatabaseModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    ProjectModule,
    TeamModule,
    UserModule,
    DailyUpdateModule,
    ModuleModule,
  ],
  providers: [MigrationService],
})
export class AppModule {
  constructor(private readonly migrationService: MigrationService) {
    this.runMigrationsOnStartup();
  }

  private async runMigrationsOnStartup() {
    await this.migrationService.runMigrations();
  }
}