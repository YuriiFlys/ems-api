import * as bcrypt from 'bcrypt';
import { PrismaClient, Role } from '../../generated/prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding Users...');
  
  const hashedPass = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@ems.com',
      password: hashedPass,
      firstName: 'System',
      lastName: 'Admin',
      role: Role.ADMIN,
    },
  });

  const john = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password: hashedPass,
      firstName: 'John',
      lastName: 'Doe',
      role: Role.USER,
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password: hashedPass,
      firstName: 'Bob',
      lastName: 'Smith',
      role: Role.USER,
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password: hashedPass,
      firstName: 'Alice',
      lastName: 'Johnson',
      role: Role.USER,
    },
  });

  return { admin, john, bob, alice };
}
