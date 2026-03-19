import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.eventsService.create(createEventDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: EventQueryDto) {
    return this.eventsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req,
  ) {
    const event = await this.eventsService.findOne(id);
    const isOwner = event.creatorId === req.user.userId;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You do not have permission to edit this event');
    }

    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const event = await this.eventsService.findOne(id);
    const isOwner = event.creatorId === req.user.userId;
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('You do not have permission to delete this event');
    }

    return this.eventsService.remove(id);
  }
}

