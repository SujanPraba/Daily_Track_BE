"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const dotenv = require("dotenv");
dotenv.config();
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './src/database/schemas/*.ts',
    out: './drizzle/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
});
//# sourceMappingURL=drizzle.config.js.map