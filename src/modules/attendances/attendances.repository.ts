import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../../generated/prisma/client';

@Injectable()
export class AttendancesRepository {
  constructor(private prisma: PrismaService) {}

  async findFirst(params: { where: Prisma.AttendanceWhereInput }) {
    return this.prisma.attendance.findFirst(params);
  }

  async create(data: Prisma.AttendanceUncheckedCreateInput) {
    return this.prisma.attendance.create({ data });
  }

  async delete(where: Prisma.AttendanceWhereUniqueInput) {
    return this.prisma.attendance.delete({ where });
  }
}
