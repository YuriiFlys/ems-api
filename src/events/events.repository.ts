import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class EventsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
    include?: Prisma.EventInclude;
  }) {
    return this.prisma.event.findMany(params);
  }

  async count(where?: Prisma.EventWhereInput) {
    return this.prisma.event.count({ where });
  }

  async findUnique(params: {
    where: Prisma.EventWhereUniqueInput;
    include?: Prisma.EventInclude;
  }) {
    return this.prisma.event.findUnique(params);
  }

  async update(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }) {
    return this.prisma.event.update(params);
  }

  async delete(where: Prisma.EventWhereUniqueInput) {
    return this.prisma.event.delete({ where });
  }
}
