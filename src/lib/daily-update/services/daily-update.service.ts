import { Injectable, NotFoundException } from '@nestjs/common';
import { DailyUpdateRepository } from '../repositories/daily-update.repository';
import { UserService } from '../../user/services/user.service';
import { ProjectService } from '../../project/services/project.service';
import { CreateDailyUpdateDto } from '../dtos/create-daily-update.dto';
import { UpdateDailyUpdateDto } from '../dtos/update-daily-update.dto';
import { DailyUpdate } from '../../../database/schemas/daily-update.schema';

@Injectable()
export class DailyUpdateService {
  constructor(
    private readonly dailyUpdateRepository: DailyUpdateRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createDailyUpdateDto: CreateDailyUpdateDto): Promise<DailyUpdate> {
    // Verify user and project exist
    await this.userService.findOne(createDailyUpdateDto.userId);
    await this.projectService.findOne(createDailyUpdateDto.projectId);

    // Calculate total hours
    const totalHours = (
      parseFloat(createDailyUpdateDto.internalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.externalMeetingHours || '0') +
      parseFloat(createDailyUpdateDto.otherActivityHours || '0')
    ).toString();

    const updateData: Omit<DailyUpdate, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: createDailyUpdateDto.userId,
      projectId: createDailyUpdateDto.projectId,
      teamId: createDailyUpdateDto.teamId || null,
      date: new Date(createDailyUpdateDto.date),
      tickets: createDailyUpdateDto.tickets || null,
      internalMeetingHours: createDailyUpdateDto.internalMeetingHours || '0',
      externalMeetingHours: createDailyUpdateDto.externalMeetingHours || '0',
      otherActivities: createDailyUpdateDto.otherActivities || null,
      otherActivityHours: createDailyUpdateDto.otherActivityHours || '0',
      totalHours,
      notes: createDailyUpdateDto.notes || null,
      status: 'PENDING',
      submittedAt: null,
      approvedAt: null,
      approvedBy: null
    };

    return this.dailyUpdateRepository.create(updateData);
  }

  async findAll(): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findAll();
  }

  async findOne(id: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.dailyUpdateRepository.findById(id);
    if (!dailyUpdate) {
      throw new NotFoundException('Daily update not found');
    }
    return dailyUpdate;
  }

  async update(id: string, updateDailyUpdateDto: UpdateDailyUpdateDto): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);

    // Recalculate total hours if time fields are being updated
    const currentUpdate = await this.findOne(id);
    const updateData: Partial<DailyUpdate> = {};

    // Copy only the fields we want to update
    Object.keys(updateDailyUpdateDto).forEach(key => {
      if (updateDailyUpdateDto[key] !== undefined) {
        updateData[key] = updateDailyUpdateDto[key];
      }
    });

    // Convert date string to Date object if present
    if (updateDailyUpdateDto.date) {
      updateData.date = new Date(updateDailyUpdateDto.date);
    }

    // Handle hours calculation
    if (
      updateDailyUpdateDto.internalMeetingHours ||
      updateDailyUpdateDto.externalMeetingHours ||
      updateDailyUpdateDto.otherActivityHours
    ) {
      const internalHours = updateDailyUpdateDto.internalMeetingHours || 
        (currentUpdate.internalMeetingHours?.toString() || '0');
      const externalHours = updateDailyUpdateDto.externalMeetingHours || 
        (currentUpdate.externalMeetingHours?.toString() || '0');
      const otherHours = updateDailyUpdateDto.otherActivityHours || 
        (currentUpdate.otherActivityHours?.toString() || '0');

      const totalHours = (
        parseFloat(internalHours) +
        parseFloat(externalHours) +
        parseFloat(otherHours)
      ).toString();

      updateData.totalHours = totalHours;
    }

    return this.dailyUpdateRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    const dailyUpdate = await this.findOne(id);
    await this.dailyUpdateRepository.delete(id);
  }

  async findByUser(userId: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByUser(userId);
  }

  async findByProject(projectId: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByProject(projectId);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByDateRange(startDate, endDate);
  }

  async findByStatus(status: string): Promise<DailyUpdate[]> {
    return this.dailyUpdateRepository.findByStatus(status);
  }

  async approve(id: string, approverId: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);
    await this.userService.findOne(approverId);

    return this.dailyUpdateRepository.update(id, {
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedBy: approverId,
    });
  }

  async submit(id: string): Promise<DailyUpdate> {
    const dailyUpdate = await this.findOne(id);

    return this.dailyUpdateRepository.update(id, {
      status: 'SUBMITTED',
      submittedAt: new Date(),
    });
  }
}