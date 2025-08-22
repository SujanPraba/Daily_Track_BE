import { MigrationService } from './database/migration.service';
export declare class AppModule {
    private readonly migrationService;
    constructor(migrationService: MigrationService);
    private runMigrationsOnStartup;
}
