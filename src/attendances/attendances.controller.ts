import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':eventId/attend')
  attend(@Param('eventId') eventId: string, @Request() req) {
    return this.attendancesService.attendEvent(eventId, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':eventId/attend')
  unattend(@Param('eventId') eventId: string, @Request() req) {
    return this.attendancesService.unattendEvent(eventId, req.user.userId);
  }
}
