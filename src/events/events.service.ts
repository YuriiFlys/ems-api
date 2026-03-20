import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventQueryDto } from './dto/event-query.dto';
import { EventsRepository } from './events.repository';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class EventsService {
  constructor(private eventsRepository: EventsRepository) {}

  async create(createEventDto: CreateEventDto, userId: string) {
    return this.eventsRepository.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
      creator: { connect: { id: userId } },
    });
  }

  async findAll(query: EventQueryDto) {
    const where: Prisma.EventWhereInput = {};

    if (query.category) {
      where.category = query.category;
    }

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.dateFrom || query.dateTo) {
      where.date = {
        ...(query.dateFrom && { gte: new Date(query.dateFrom) }),
        ...(query.dateTo && { lte: new Date(query.dateTo) }),
      };
    }

    const sortBy = query.sortBy ?? 'date';
    const order = query.order ?? 'asc';
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.eventsRepository.findMany({
        where,
        orderBy: { [sortBy]: order },
        skip,
        take: limit,
        include: {
          creator: {
            select: { id: true, firstName: true, lastName: true },
          },
        },
      }),
      this.eventsRepository.count(where),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const event = await this.eventsRepository.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true },
        },
        attendances: true,
      },
    });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.findOne(id);

    const data: Prisma.EventUpdateInput = { ...updateEventDto };
    if (updateEventDto.date) {
      data.date = new Date(updateEventDto.date);
    }

    return this.eventsRepository.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.eventsRepository.delete({ id });
  }
}

