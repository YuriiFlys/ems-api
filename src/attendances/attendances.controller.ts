import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AttendancesService } from './attendances.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('attendances')
@ApiBearerAuth()
@Controller('events')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @ApiOperation({ summary: 'Attend an event' })
  @ApiResponse({ status: 201, description: 'Successfully attended the event' })
  @UseGuards(JwtAuthGuard)
  @Post(':eventId/attend')
  attend(@Param('eventId') eventId: string, @Request() req) {
    return this.attendancesService.attendEvent(eventId, req.user.userId);
  }

  @ApiOperation({ summary: 'Remove attendance from an event' })
  @ApiResponse({ status: 200, description: 'Successfully removed attendance' })
  @UseGuards(JwtAuthGuard)
  @Delete(':eventId/attend')
  unattend(@Param('eventId') eventId: string, @Request() req) {
    return this.attendancesService.unattendEvent(eventId, req.user.userId);
  }
}
