export declare class MigrationService {
    private readonly migrationMode;
    constructor();
    runMigrations(): Promise<void>;
    private checkIfTableExists;
    private dropAndCreateSchema;
}
