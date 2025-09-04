import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ZohoLogTimeEntry } from '../dtos/zoho-sync-daily-update.dto';

export interface ZohoPeopleConfig {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  organizationId: string;
}

export interface ZohoLogTimeRequest {
  user_id: string;
  project_id: string;
  date: string;
  hours: number;
  activity_type: string;
  description?: string;
  ticket_id?: string;
  is_draft?: boolean;
}

export interface ZohoLogTimeResponse {
  status: {
    code: number;
    description: string;
  };
  data: {
    log_time_id: string;
    user_id: string;
    project_id: string;
    date: string;
    hours: number;
    activity_type: string;
    description?: string;
    ticket_id?: string;
    is_draft: boolean;
    created_time: string;
    modified_time: string;
  };
}

@Injectable()
export class ZohoPeopleService {
  private readonly logger = new Logger(ZohoPeopleService.name);
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(private readonly configService: ConfigService) {}

  /**
   * Get Zoho People configuration from environment variables
   */
  private getZohoConfig(): ZohoPeopleConfig {
    const clientId = this.configService.get<string>('ZOHO_PEOPLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('ZOHO_PEOPLE_CLIENT_SECRET');
    const refreshToken = this.configService.get<string>('ZOHO_PEOPLE_REFRESH_TOKEN');
    const organizationId = this.configService.get<string>('ZOHO_PEOPLE_ORG_ID');

    const config: ZohoPeopleConfig = {
      baseUrl: this.configService.get<string>('ZOHO_PEOPLE_BASE_URL') || 'https://people.zoho.com',
      clientId: clientId || '',
      clientSecret: clientSecret || '',
      refreshToken: refreshToken || '',
      organizationId: organizationId || '',
    };

    // Validate required configuration
    if (!config.clientId || !config.clientSecret || !config.refreshToken || !config.organizationId) {
      throw new HttpException(
        'Zoho People configuration is incomplete. Please check environment variables.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return config;
  }

  /**
   * Get or refresh access token for Zoho People API
   */
  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    
    // Check if current token is still valid (with 5 minute buffer)
    if (this.accessToken && now < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    try {
      const config = this.getZohoConfig();
      const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
      
      const response = await axios.post(tokenUrl, {
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
      
      // Ensure we have a valid token before returning
      if (!this.accessToken) {
        throw new Error('Failed to obtain valid access token from Zoho');
      }
      
      return this.accessToken;
    } catch (error) {
      this.logger.error('Failed to get Zoho access token:', error);
      throw new HttpException(
        'Failed to authenticate with Zoho People API',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Create log time entry in Zoho People
   */
  async createLogTimeEntry(logTimeData: ZohoLogTimeRequest): Promise<ZohoLogTimeResponse> {
    try {
      const accessToken = await this.getAccessToken();
      const config = this.getZohoConfig();
      
      const apiUrl = `${config.baseUrl}/api/people/v1/log_time`;
      
      const response = await axios.post(apiUrl, logTimeData, {
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
    } catch (error) {
      this.logger.error('Failed to create Zoho log time entry:', error);
      throw error;
    }
  }

  /**
   * Create multiple log time entries for a daily update
   */
  async createMultipleLogTimeEntries(
    userId: string,
    projectId: string,
    date: string,
    logTimeEntries: ZohoLogTimeEntry[],
    isDraft: boolean = false
  ): Promise<{ success: boolean; entries: number; errors: string[]; responses: any[] }> {
    const results = {
      success: true,
      entries: 0,
      errors: [] as string[],
      responses: [] as any[],
    };

    this.logger.log(`Creating ${logTimeEntries.length} log time entries for user ${userId} on ${date}`);

    for (const entry of logTimeEntries) {
      try {
        const logTimeRequest: ZohoLogTimeRequest = {
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
      } catch (error) {
        const errorMessage = `Failed to create log time entry for ticket ${entry.ticketId}: ${error.message}`;
        this.logger.error(errorMessage);
        results.errors.push(errorMessage);
        results.success = false;
      }
    }

    this.logger.log(`Completed log time creation: ${results.entries} successful, ${results.errors.length} errors`);
    return results;
  }

  /**
   * Test Zoho People API connection
   */
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      const accessToken = await this.getAccessToken();
      const config = this.getZohoConfig();
      
      // Try to get user info to test the connection
      const apiUrl = `${config.baseUrl}/api/people/v1/users`;
      
      const response = await axios.get(apiUrl, {
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
    } catch (error) {
      this.logger.error('Zoho People API connection test failed:', error);
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
      };
    }
  }

  /**
   * Get available activity types from Zoho People
   */
  async getActivityTypes(): Promise<string[]> {
    try {
      const accessToken = await this.getAccessToken();
      const config = this.getZohoConfig();
      
      const apiUrl = `${config.baseUrl}/api/people/v1/activity_types`;
      
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'orgId': config.organizationId,
        },
      });

      if (response.data.status?.code !== 200) {
        throw new Error(`Zoho API error: ${response.data.status?.description || 'Unknown error'}`);
      }

      return response.data?.data?.map((item: any) => item.name) || [];
    } catch (error) {
      this.logger.error('Failed to get Zoho activity types:', error);
      // Return default activity types if API call fails
      return ['Development', 'Testing', 'Code Review', 'Documentation', 'Meeting', 'Support', 'Other'];
    }
  }
}
