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
var ZohoPeopleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZohoPeopleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let ZohoPeopleService = ZohoPeopleService_1 = class ZohoPeopleService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ZohoPeopleService_1.name);
        this.accessToken = null;
        this.tokenExpiry = 0;
    }
    getZohoConfig() {
        const clientId = this.configService.get('ZOHO_PEOPLE_CLIENT_ID');
        const clientSecret = this.configService.get('ZOHO_PEOPLE_CLIENT_SECRET');
        const refreshToken = this.configService.get('ZOHO_PEOPLE_REFRESH_TOKEN');
        const organizationId = this.configService.get('ZOHO_PEOPLE_ORG_ID');
        const config = {
            baseUrl: this.configService.get('ZOHO_PEOPLE_BASE_URL') || 'https://people.zoho.com',
            clientId: clientId || '',
            clientSecret: clientSecret || '',
            refreshToken: refreshToken || '',
            organizationId: organizationId || '',
        };
        if (!config.clientId || !config.clientSecret || !config.refreshToken || !config.organizationId) {
            throw new common_1.HttpException('Zoho People configuration is incomplete. Please check environment variables.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return config;
    }
    async getAccessToken() {
        const now = Date.now();
        if (this.accessToken && now < this.tokenExpiry - 300000) {
            return this.accessToken;
        }
        try {
            const config = this.getZohoConfig();
            const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
            const response = await axios_1.default.post(tokenUrl, {
                grant_type: 'refresh_token',
                client_id: config.clientId,
                client_secret: config.clientSecret,
                refresh_token: config.refreshToken,
            });
            if (response.data.error) {
                throw new Error(`Zoho API error: ${response.data.error_description || response.data.error}`);
            }
            this.accessToken = response.data.access_token;
            this.tokenExpiry = now + (response.data.expires_in * 1000);
            this.logger.log('Successfully obtained new Zoho access token');
            if (!this.accessToken) {
                throw new Error('Failed to obtain valid access token from Zoho');
            }
            return this.accessToken;
        }
        catch (error) {
            this.logger.error('Failed to get Zoho access token:', error);
            throw new common_1.HttpException('Failed to authenticate with Zoho People API', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createLogTimeEntry(logTimeData) {
        try {
            const accessToken = await this.getAccessToken();
            const config = this.getZohoConfig();
            const apiUrl = `${config.baseUrl}/api/people/v1/log_time`;
            const response = await axios_1.default.post(apiUrl, logTimeData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'orgId': config.organizationId,
                },
            });
            if (response.data.status?.code !== 200) {
                throw new Error(`Zoho API error: ${response.data.status?.description || 'Unknown error'}`);
            }
            this.logger.log(`Successfully created log time entry: ${response.data?.data?.log_time_id}`);
            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to create Zoho log time entry:', error);
            throw error;
        }
    }
    async createMultipleLogTimeEntries(userId, projectId, date, logTimeEntries, isDraft = false) {
        const results = {
            success: true,
            entries: 0,
            errors: [],
            responses: [],
        };
        this.logger.log(`Creating ${logTimeEntries.length} log time entries for user ${userId} on ${date}`);
        for (const entry of logTimeEntries) {
            try {
                const logTimeRequest = {
                    user_id: userId,
                    project_id: projectId,
                    date: entry.logDate,
                    hours: entry.hours,
                    activity_type: entry.activityType,
                    description: entry.description,
                    ticket_id: entry.ticketId,
                    is_draft: isDraft,
                };
                const response = await this.createLogTimeEntry(logTimeRequest);
                results.responses.push(response);
                results.entries++;
                this.logger.log(`Created log time entry for ticket ${entry.ticketId}: ${response.data?.log_time_id}`);
            }
            catch (error) {
                const errorMessage = `Failed to create log time entry for ticket ${entry.ticketId}: ${error.message}`;
                this.logger.error(errorMessage);
                results.errors.push(errorMessage);
                results.success = false;
            }
        }
        this.logger.log(`Completed log time creation: ${results.entries} successful, ${results.errors.length} errors`);
        return results;
    }
    async testConnection() {
        try {
            const accessToken = await this.getAccessToken();
            const config = this.getZohoConfig();
            const apiUrl = `${config.baseUrl}/api/people/v1/users`;
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'orgId': config.organizationId,
                },
            });
            return {
                success: true,
                message: 'Successfully connected to Zoho People API',
                details: {
                    organizationId: config.organizationId,
                    baseUrl: config.baseUrl,
                    userCount: response.data?.length || 'Unknown',
                },
            };
        }
        catch (error) {
            this.logger.error('Zoho People API connection test failed:', error);
            return {
                success: false,
                message: `Connection test failed: ${error.message}`,
            };
        }
    }
    async getActivityTypes() {
        try {
            const accessToken = await this.getAccessToken();
            const config = this.getZohoConfig();
            const apiUrl = `${config.baseUrl}/api/people/v1/activity_types`;
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'orgId': config.organizationId,
                },
            });
            if (response.data.status?.code !== 200) {
                throw new Error(`Zoho API error: ${response.data.status?.description || 'Unknown error'}`);
            }
            return response.data?.data?.map((item) => item.name) || [];
        }
        catch (error) {
            this.logger.error('Failed to get Zoho activity types:', error);
            return ['Development', 'Testing', 'Code Review', 'Documentation', 'Meeting', 'Support', 'Other'];
        }
    }
};
exports.ZohoPeopleService = ZohoPeopleService;
exports.ZohoPeopleService = ZohoPeopleService = ZohoPeopleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ZohoPeopleService);
//# sourceMappingURL=zoho-people.service.js.map