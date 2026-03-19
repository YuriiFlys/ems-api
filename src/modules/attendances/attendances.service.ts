import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AttendancesRepository } from './attendances.repository';
import { EventsService } from '../events/events.service';

@Injectable()
export class AttendancesService {
  constructor(
    private attendancesRepo: AttendancesRepository,
    private eventsService: EventsService,
  ) {}

  async attendEvent(eventId: string, userId: string) {
    await this.eventsService.findOne(eventId);

    const existing = await this.attendancesRepo.findFirst({
      where: { eventId, userId }
    });
    
    if (existing) {
      throw new ConflictException('Already attending this event');
    }

    return this.attendancesRepo.create({
      eventId,
      userId
    });
  }

  async unattendEvent(eventId: string, userId: string) {
    const existing = await this.attendancesRepo.findFirst({
      where: { eventId, userId }
    });

    if (!existing) {
      throw new NotFoundException('Attendance record not found');
    }

    return this.attendancesRepo.delete({ id: existing.id });
  }
}
