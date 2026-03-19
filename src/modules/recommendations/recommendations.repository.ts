import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RecommendationsRepository {
  constructor(private prisma: PrismaService) {}

  async findEvent(eventId: string) {
    return this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, category: true, date: true, latitude: true, longitude: true },
    });
  }

  async findCandidates(excludeEventId: string) {
    return this.prisma.event.findMany({
      where: { id: { not: excludeEventId } },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        location: true,
        latitude: true,
        longitude: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

