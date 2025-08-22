import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { execSync } from 'child_process';

@Injectable()
export class MigrationService {
  private readonly migrationMode: string;

  constructor() {
    this.migrationMode = process.env['MIGRATION_MODE'] || 'NONE';
  }

  async runMigrations() {
    if (this.migrationMode === 'CREATE') {
      console.log('Migration Mode: CREATE - Dropping and recreating the public schema.');

      try {
        await this.dropAndCreateSchema();
        console.log('Generating migrations...');
        execSync('npm run db:generate', { stdio: 'inherit' });
        console.log('Applying migrations...');
        
        const client = new Client({
          connectionString: process.env['DATABASE_URL'],
        });
        await client.connect();
        
        const tableExists = await this.checkIfTableExists(client, 'users');
        if (!tableExists) {
          execSync('npm run db:push', { stdio: 'inherit' });
        } else {
          console.log("Table 'users' already exists, skipping creation.");
        }
        
        await client.end();
        execSync('npm run db:migrate', { stdio: 'inherit' });
        execSync('npm run seed', { stdio: 'inherit' });
        console.log('Migrations completed successfully.');
      } catch (error: unknown) {
        console.error('Error during migration process:', error instanceof Error ? error.message : error);
        console.error('Error output:', (error as any).stdout || (error as any).stderr);
      }
    } else {
      console.log('Migrations are not triggered as MIGRATION_MODE is not set to CREATE.');
    }
  }

  private async checkIfTableExists(client: Client, tableName: string): Promise<boolean> {
    const query = `SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    );`;
    const res = await client.query(query, [tableName]);
    return res.rows[0].exists;
  }

  private async dropAndCreateSchema() {
    const client = new Client({
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
    } catch (error) {
      console.error('Error dropping and recreating public schema:', error);
      throw new Error('Failed to drop and recreate schema');
    } finally {
      await client.end();
    }
  }
}