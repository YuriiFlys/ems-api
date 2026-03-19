import { PrismaClient, Category, User } from '../../generated/prisma/client';

export async function seedEvents(
  prisma: PrismaClient,
  users: { admin: User; bob: User; alice: User }
) {
  console.log('Seeding Events...');
  
  const dateNextMonth = new Date();
  dateNextMonth.setMonth(dateNextMonth.getMonth() + 1);

  const eventMusic = await prisma.event.create({
    data: {
      title: 'Jazz Night in Lviv',
      description: 'An amazing evening with live jazz bands.',
      date: dateNextMonth,
      location: 'Lviv, Ukraine',
      latitude: 49.8397,
      longitude: 24.0297,
      category: Category.MUSIC,
      creatorId: users.admin.id,
    },
  });

  const eventIT = await prisma.event.create({
    data: {
      title: 'AI Conference Kyiv',
      description: 'The largest AI event in Eastern Europe.',
      date: dateNextMonth,
      location: 'Kyiv, Ukraine',
      latitude: 50.4501,
      longitude: 30.5234,
      category: Category.IT,
      creatorId: users.bob.id,
    },
  });

  const eventFood = await prisma.event.create({
    data: {
      title: 'Food Festival Lviv',
      description: 'An amazing evening with live jazz bands.',
      date: dateNextMonth,
      location: 'Lviv, Ukraine',
      latitude: 49.8516467858072,
      longitude: 24.051694546519496,
      category: Category.FOOD,
      creatorId: users.alice.id,
    },
  });

  const eventSport = await prisma.event.create({
    data: {
      title: 'Kyiv City Marathon',
      description: 'Annual city marathon for all running enthusiasts.',
      date: dateNextMonth,
      location: 'Kyiv, Ukraine',
      category: Category.SPORT,
      creatorId: users.admin.id,
    },
  });

  return { eventMusic, eventIT, eventFood, eventSport };
}
