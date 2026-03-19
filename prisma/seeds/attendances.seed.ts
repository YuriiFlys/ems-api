import { PrismaClient, User, Event } from '../../generated/prisma/client';

export async function seedAttendances(
  prisma: PrismaClient,
  users: { admin: User; john: User; bob: User; alice: User },
  events: { eventMusic: Event; eventIT: Event; eventFood: Event; eventSport: Event }
) {
  console.log('Seeding Attendances...');
  
  await prisma.attendance.createMany({
    data: [
      { userId: users.bob.id, eventId: events.eventMusic.id },
      { userId: users.alice.id, eventId: events.eventMusic.id },
      { userId: users.john.id, eventId: events.eventIT.id },
      { userId: users.admin.id, eventId: events.eventIT.id },
      { userId: users.bob.id, eventId: events.eventSport.id },
      { userId: users.alice.id, eventId: events.eventFood.id },
    ],
  });
}
