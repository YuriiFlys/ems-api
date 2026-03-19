import { PrismaClient, Category, User } from '../../generated/prisma/client';

export async function seedEvents(
  prisma: PrismaClient,
  users: { admin: User; bob: User; alice: User }
) {
  console.log('Seeding Events...');

  const d = (daysFromNow: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
  };

  const eventsData = [
    // ─── MUSIC ───────────────────────────────────────────────────────────────
    {
      title: 'Jazz Night in Lviv',
      description: 'An amazing evening with live jazz bands from all over Ukraine.',
      date: d(10), location: 'Lviv, Ukraine',
      latitude: 49.8397, longitude: 24.0297,
      category: Category.MUSIC, creatorId: users.admin.id,
    },
    {
      title: 'Kyiv Rock Festival',
      description: 'Three days of non-stop rock music with 20+ bands on two stages.',
      date: d(15), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.MUSIC, creatorId: users.bob.id,
    },
    {
      title: 'Classical Music Evening',
      description: 'An evening of Beethoven and Chopin performed by the National Orchestra.',
      date: d(22), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.MUSIC, creatorId: users.alice.id,
    },
    {
      title: 'EDM Rave — Kyiv Underground',
      description: 'All-night electronic dance music party in an iconic warehouse venue.',
      date: d(30), location: 'Kyiv, Ukraine',
      latitude: 50.4547, longitude: 30.5238,
      category: Category.MUSIC, creatorId: users.admin.id,
    },
    {
      title: 'Odesa Jazz & Blues Festival',
      description: 'International musicians gather at the Black Sea for a weekend of jazz and blues.',
      date: d(45), location: 'Odesa, Ukraine',
      latitude: 46.4825, longitude: 30.7233,
      category: Category.MUSIC, creatorId: users.bob.id,
    },
    {
      title: 'Folk Music Fest Poltava',
      description: 'Celebrating traditional Ukrainian folk music and dance in the heart of Poltava.',
      date: d(60), location: 'Poltava, Ukraine',
      latitude: 49.5883, longitude: 34.5514,
      category: Category.MUSIC, creatorId: users.alice.id,
    },
    {
      title: 'Indie Pop Showcase Lviv',
      description: 'Local and international indie pop artists perform in intimate venues across Lviv.',
      date: d(75), location: 'Lviv, Ukraine',
      latitude: 49.8429, longitude: 24.0269,
      category: Category.MUSIC, creatorId: users.admin.id,
    },

    // ─── IT ──────────────────────────────────────────────────────────────────
    {
      title: 'AI Conference Kyiv',
      description: 'The largest AI and machine learning event in Eastern Europe.',
      date: d(12), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.IT, creatorId: users.bob.id,
    },
    {
      title: 'WebDev Summit Lviv',
      description: 'Full-stack web development conference with workshops and talks from top engineers.',
      date: d(18), location: 'Lviv, Ukraine',
      latitude: 49.8397, longitude: 24.0297,
      category: Category.IT, creatorId: users.alice.id,
    },
    {
      title: 'Cybersecurity Forum Kyiv',
      description: 'Experts discuss the latest threats and defences in enterprise cybersecurity.',
      date: d(25), location: 'Kyiv, Ukraine',
      latitude: 50.4547, longitude: 30.5238,
      category: Category.IT, creatorId: users.admin.id,
    },
    {
      title: 'Startup Pitch Night',
      description: 'Ukrainian startups pitch their ideas to top investors and VCs.',
      date: d(35), location: 'Kyiv, Ukraine',
      latitude: 50.4577, longitude: 30.5197,
      category: Category.IT, creatorId: users.bob.id,
    },
    {
      title: 'Blockchain & Web3 Expo',
      description: 'Explore the future of decentralized technologies, DeFi, and NFTs.',
      date: d(50), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.IT, creatorId: users.alice.id,
    },
    {
      title: 'GameDev Hackathon Lviv',
      description: '48-hour game development hackathon open to individuals and small teams.',
      date: d(65), location: 'Lviv, Ukraine',
      latitude: 49.8429, longitude: 24.0269,
      category: Category.IT, creatorId: users.admin.id,
    },
    {
      title: 'Cloud Computing Day',
      description: 'Deep dives into AWS, Azure, and GCP architecture patterns and cost optimization.',
      date: d(80), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.IT, creatorId: users.bob.id,
    },

    // ─── SPORT ───────────────────────────────────────────────────────────────
    {
      title: 'Kyiv City Marathon',
      description: 'Annual city marathon for all running enthusiasts. 5k, 10k, half and full marathon distances.',
      date: d(20), location: 'Kyiv, Ukraine',
      latitude: 50.4475, longitude: 30.5221,
      category: Category.SPORT, creatorId: users.admin.id,
    },
    {
      title: 'Lviv Half Marathon',
      description: 'Scenic 21km run through the historic streets of old Lviv.',
      date: d(28), location: 'Lviv, Ukraine',
      latitude: 49.8397, longitude: 24.0297,
      category: Category.SPORT, creatorId: users.alice.id,
    },
    {
      title: 'Triathlon Dnipro',
      description: 'Full Ironman triathlon with swim in the Dnipro River, bike, and run.',
      date: d(40), location: 'Dnipro, Ukraine',
      latitude: 48.4647, longitude: 35.0462,
      category: Category.SPORT, creatorId: users.bob.id,
    },
    {
      title: 'Kyiv Cycling Grand Prix',
      description: 'Amateur and professional cycling race around the capital.',
      date: d(55), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.SPORT, creatorId: users.admin.id,
    },
    {
      title: 'Beach Volleyball Odesa Open',
      description: 'National beach volleyball championship on Arkadia beach.',
      date: d(70), location: 'Odesa, Ukraine',
      latitude: 46.4825, longitude: 30.7233,
      category: Category.SPORT, creatorId: users.alice.id,
    },
    {
      title: 'CrossFit Battle Kharkiv',
      description: 'Regional crossfit competition across 12 WOD events.',
      date: d(85), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.SPORT, creatorId: users.bob.id,
    },
    {
      title: 'Winter Trail Run Carpathians',
      description: 'Trail running festival through the snowy Carpathian mountains. 20km & 42km routes.',
      date: d(100), location: 'Zakarpattia, Ukraine',
      latitude: 48.6208, longitude: 22.2879,
      category: Category.SPORT, creatorId: users.admin.id,
    },

    // ─── FOOD ────────────────────────────────────────────────────────────────
    {
      title: 'Lviv Food Festival',
      description: 'A gastronomy festival celebrating the best of Ukrainian and European cuisine.',
      date: d(14), location: 'Lviv, Ukraine',
      latitude: 49.8516, longitude: 24.0517,
      category: Category.FOOD, creatorId: users.alice.id,
    },
    {
      title: 'Kyiv Street Food Fest',
      description: '100+ food stalls, live cooking demos, and local craft beer.',
      date: d(21), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.FOOD, creatorId: users.bob.id,
    },
    {
      title: 'Borsch & Wine Evening',
      description: 'An exclusive dinner pairing traditional Ukrainian borsch with curated wines.',
      date: d(33), location: 'Odesa, Ukraine',
      latitude: 46.4825, longitude: 30.7233,
      category: Category.FOOD, creatorId: users.admin.id,
    },
    {
      title: 'Chocolate Festival Lutsk',
      description: 'Three days of artisan chocolate making workshops, tasting, and competitions.',
      date: d(48), location: 'Lutsk, Ukraine',
      latitude: 50.7472, longitude: 25.3254,
      category: Category.FOOD, creatorId: users.alice.id,
    },
    {
      title: 'Farmers Market Poltava',
      description: 'Local farmers and producers showcase their seasonal produce and home cooking.',
      date: d(62), location: 'Poltava, Ukraine',
      latitude: 49.5883, longitude: 34.5514,
      category: Category.FOOD, creatorId: users.bob.id,
    },
    {
      title: 'Craft Beer Expo Kharkiv',
      description: 'Eastern Ukraine\'s largest craft beer event with 50+ local and international breweries.',
      date: d(77), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.FOOD, creatorId: users.admin.id,
    },
    {
      title: 'Sushi Masters Championship',
      description: 'Top sushi chefs from across Ukraine compete in speed and creativity.',
      date: d(90), location: 'Kyiv, Ukraine',
      latitude: 50.4547, longitude: 30.5238,
      category: Category.FOOD, creatorId: users.alice.id,
    },

    // ─── ART ─────────────────────────────────────────────────────────────────
    {
      title: 'Kyiv Art Week',
      description: 'A week-long festival featuring modern art exhibitions, installations, and performances.',
      date: d(17), location: 'Kyiv, Ukraine',
      latitude: 50.4467, longitude: 30.5174,
      category: Category.ART, creatorId: users.bob.id,
    },
    {
      title: 'Lviv Photography Biennial',
      description: 'International photography exhibition across 10 gallery spaces in Lviv.',
      date: d(26), location: 'Lviv, Ukraine',
      latitude: 49.8397, longitude: 24.0297,
      category: Category.ART, creatorId: users.alice.id,
    },
    {
      title: 'Street Art Festival Kharkiv',
      description: 'Live mural painting, graffiti competitions, and urban art tours.',
      date: d(38), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.ART, creatorId: users.admin.id,
    },
    {
      title: 'Odesa Film Festival',
      description: 'International film festival screening 200+ films from 40 countries.',
      date: d(52), location: 'Odesa, Ukraine',
      latitude: 46.4825, longitude: 30.7233,
      category: Category.ART, creatorId: users.bob.id,
    },
    {
      title: 'Ceramic & Pottery Fair',
      description: 'Artisans from across Ukraine showcase traditional and contemporary ceramic works.',
      date: d(67), location: 'Ivano-Frankivsk, Ukraine',
      latitude: 48.9226, longitude: 24.7111,
      category: Category.ART, creatorId: users.alice.id,
    },
    {
      title: 'Digital Art Expo Kyiv',
      description: 'Immersive digital art installations powered by projection mapping and AR technology.',
      date: d(82), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.ART, creatorId: users.admin.id,
    },
    {
      title: 'Sculpture Symposium Dnipro',
      description: 'International sculptors create large-scale public art works over 10 days.',
      date: d(95), location: 'Dnipro, Ukraine',
      latitude: 48.4647, longitude: 35.0462,
      category: Category.ART, creatorId: users.bob.id,
    },

    // ─── OTHER ───────────────────────────────────────────────────────────────
    {
      title: 'Kyiv International Book Fair',
      description: 'The biggest literary event in Ukraine with 300+ publishers and authors.',
      date: d(8), location: 'Kyiv, Ukraine',
      latitude: 50.4501, longitude: 30.5234,
      category: Category.OTHER, creatorId: users.alice.id,
    },
    {
      title: 'Science Festival Kharkiv',
      description: 'Hands-on science experiments, lectures, and robotics competitions for all ages.',
      date: d(23), location: 'Kharkiv, Ukraine',
      latitude: 49.9935, longitude: 36.2304,
      category: Category.OTHER, creatorId: users.admin.id,
    },
    {
      title: 'Volunteer Summit Dnipro',
      description: 'National summit bringing together volunteer organizations and NGOs.',
      date: d(37), location: 'Dnipro, Ukraine',
      latitude: 48.4647, longitude: 35.0462,
      category: Category.OTHER, creatorId: users.bob.id,
    },
    {
      title: 'Eco Forum Lviv',
      description: 'Sustainability and environmental protection forum with workshops and market.',
      date: d(53), location: 'Lviv, Ukraine',
      latitude: 49.8397, longitude: 24.0297,
      category: Category.OTHER, creatorId: users.alice.id,
    },
    {
      title: 'Youth Leadership Camp',
      description: 'A 5-day residential camp for emerging young leaders aged 18–30.',
      date: d(68), location: 'Bukovel, Ukraine',
      latitude: 48.3617, longitude: 24.4064,
      category: Category.OTHER, creatorId: users.admin.id,
    },
    {
      title: 'Pet Adoption Fair Kyiv',
      description: 'Adopt a pet, attend grooming workshops, and meet local animal shelters.',
      date: d(42), location: 'Kyiv, Ukraine',
      latitude: 50.4547, longitude: 30.5238,
      category: Category.OTHER, creatorId: users.bob.id,
    },
    {
      title: 'Carpathian Wellness Retreat',
      description: 'A weekend of yoga, meditation, and mindfulness in the Carpathian mountains.',
      date: d(88), location: 'Zakarpattia, Ukraine',
      latitude: 48.6208, longitude: 22.2879,
      category: Category.OTHER, creatorId: users.alice.id,
    },
  ];

  const created = await Promise.all(
    eventsData.map(data => prisma.event.create({ data }))
  );

  console.log(`✅ Seeded ${created.length} events`);

  return {
    eventMusic: created[0],
    eventIT: created[7],
    eventFood: created[21],
    eventSport: created[14],
  };
}
