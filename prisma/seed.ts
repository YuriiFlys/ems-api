import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
import { seedUsers } from './seeds/users.seed';
import { seedEvents } from './seeds/events.seed';
import { seedAttendances } from './seeds/attendances.seed';

dotenv.config();

const connectionString = process.env.DATABASE_URL || '';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed process...');
  
  console.log('Clearing old data...');
  await prisma.attendance.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  const users = await seedUsers(prisma);

  const events = await seedEvents(prisma, users);

  await seedAttendances(prisma, users, events);

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
