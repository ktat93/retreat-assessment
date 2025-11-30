import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const venues = [
  {
    name: 'Eau Palm Beach Resort & Spa',
    city: 'Manalapan',
    capacity: 309,
    pricePerNight: 4500.0,
  },
  {
    name: 'Conrad Nashville',
    city: 'Nashville',
    capacity: 234,
    pricePerNight: 3800.0,
  },
  {
    name: 'Hilton College Station & Conference Center',
    city: 'College Station',
    capacity: 301,
    pricePerNight: 2500.0,
  },
  {
    name: 'Hilton Palacio del Rio',
    city: 'San Antonio',
    capacity: 485,
    pricePerNight: 3200.0,
  },
  {
    name: 'Trump National Doral Miami',
    city: 'Doral',
    capacity: 643,
    pricePerNight: 5500.0,
  },
  {
    name: 'Margaritaville Hollywood Beach Resort',
    city: 'Hollywood',
    capacity: 369,
    pricePerNight: 4200.0,
  },
  {
    name: 'TradeWinds Resort',
    city: 'St. Pete Beach',
    capacity: 734,
    pricePerNight: 3500.0,
  },
  {
    name: 'InterContinental Cleveland',
    city: 'Cleveland',
    capacity: 294,
    pricePerNight: 2800.0,
  },
  {
    name: 'The Ritz-Carlton Oahu, Turtle Bay',
    city: 'Kahuku',
    capacity: 450,
    pricePerNight: 6500.0,
  },
  {
    name: 'Hilton Waikoloa Village',
    city: 'Waikoloa',
    capacity: 661,
    pricePerNight: 4800.0,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const venue of venues) {
    await prisma.venue.create({
      data: venue,
    });
  }

  console.log(`Created ${venues.length} venues`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
