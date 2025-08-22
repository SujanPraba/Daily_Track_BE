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
exports.MigrationService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const child_process_1 = require("child_process");
let MigrationService = class MigrationService {
    constructor() {
        this.migrationMode = process.env['MIGRATION_MODE'] || 'NONE';
    }
    async runMigrations() {
        if (this.migrationMode === 'CREATE') {
            console.log('Migration Mode: CREATE - Dropping and recreating the public schema.');
            try {
                await this.dropAndCreateSchema();
                console.log('Generating migrations...');
                (0, child_process_1.execSync)('npm run db:generate', { stdio: 'inherit' });
                console.log('Applying migrations...');
                const client = new pg_1.Client({
                    connectionString: process.env['DATABASE_URL'],
                });
                await client.connect();
                const tableExists = await this.checkIfTableExists(client, 'users');
                if (!tableExists) {
                    (0, child_process_1.execSync)('npm run db:push', { stdio: 'inherit' });
                }
                else {
                    console.log("Table 'users' already exists, skipping creation.");
                }
                await client.end();
                (0, child_process_1.execSync)('npm run db:migrate', { stdio: 'inherit' });
                (0, child_process_1.execSync)('npm run seed', { stdio: 'inherit' });
                console.log('Migrations completed successfully.');
            }
            catch (error) {
                console.error('Error during migration process:', error instanceof Error ? error.message : error);
                console.error('Error output:', error.stdout || error.stderr);
            }
        }
        else {
            console.log('Migrations are not triggered as MIGRATION_MODE is not set to CREATE.');
        }
    }
    async checkIfTableExists(client, tableName) {
        const query = `SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    );`;
        const res = await client.query(query, [tableName]);
        return res.rows[0].exists;
    }
    async dropAndCreateSchema() {
        const client = new pg_1.Client({
            connectionString: process.env['DATABASE_URL'],
        });
        await client.connect();
        try {
            const query = `
        DO $$
        DECLARE
            r RECORD;
        BEGIN
            FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
                EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE;';
            END LOOP;
        END $$;

        CREATE SCHEMA IF NOT EXISTS public;
      `;
            await client.query(query);
            console.log('All tables in the public schema have been dropped, and the schema has been recreated.');
        }
        catch (error) {
            console.error('Error dropping and recreating public schema:', error);
            throw new Error('Failed to drop and recreate schema');
        }
        finally {
            await client.end();
        }
    }
};
exports.MigrationService = MigrationService;
exports.MigrationService = MigrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MigrationService);
//# sourceMappingURL=migration.service.js.map