import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const venues = [
  // Miami (5 venues)
  {
    name: 'Four Seasons Hotel Miami',
    city: 'Miami',
    capacity: 500,
    pricePerNight: 8500,
  },
  {
    name: 'Mandarin Oriental Miami',
    city: 'Miami',
    capacity: 350,
    pricePerNight: 7200,
  },
  {
    name: 'The Ritz-Carlton Miami',
    city: 'Miami',
    capacity: 420,
    pricePerNight: 6800,
  },
  {
    name: 'JW Marriott Miami',
    city: 'Miami',
    capacity: 600,
    pricePerNight: 4500,
  },
  {
    name: 'Faena Hotel Miami Beach',
    city: 'Miami',
    capacity: 280,
    pricePerNight: 9200,
  },

  // New York (5 venues)
  {
    name: 'The Plaza Hotel',
    city: 'New York',
    capacity: 800,
    pricePerNight: 12000,
  },
  {
    name: 'The St. Regis New York',
    city: 'New York',
    capacity: 450,
    pricePerNight: 9500,
  },
  {
    name: 'Park Hyatt New York',
    city: 'New York',
    capacity: 320,
    pricePerNight: 7800,
  },
  {
    name: 'The Peninsula New York',
    city: 'New York',
    capacity: 380,
    pricePerNight: 8200,
  },
  {
    name: 'Waldorf Astoria New York',
    city: 'New York',
    capacity: 1000,
    pricePerNight: 11000,
  },

  // Los Angeles (5 venues)
  {
    name: 'The Beverly Hills Hotel',
    city: 'Los Angeles',
    capacity: 400,
    pricePerNight: 8900,
  },
  {
    name: 'Hotel Bel-Air',
    city: 'Los Angeles',
    capacity: 180,
    pricePerNight: 9800,
  },
  {
    name: 'Four Seasons Los Angeles',
    city: 'Los Angeles',
    capacity: 350,
    pricePerNight: 7500,
  },
  {
    name: 'The Langham Huntington',
    city: 'Los Angeles',
    capacity: 550,
    pricePerNight: 5200,
  },
  {
    name: 'Shutters on the Beach',
    city: 'Los Angeles',
    capacity: 220,
    pricePerNight: 6400,
  },

  // San Francisco (4 venues)
  {
    name: 'The Ritz-Carlton San Francisco',
    city: 'San Francisco',
    capacity: 380,
    pricePerNight: 6500,
  },
  {
    name: 'Four Seasons San Francisco',
    city: 'San Francisco',
    capacity: 420,
    pricePerNight: 7200,
  },
  {
    name: 'Fairmont San Francisco',
    city: 'San Francisco',
    capacity: 700,
    pricePerNight: 5800,
  },
  {
    name: 'Palace Hotel San Francisco',
    city: 'San Francisco',
    capacity: 550,
    pricePerNight: 4900,
  },

  // Chicago (4 venues)
  {
    name: 'The Langham Chicago',
    city: 'Chicago',
    capacity: 320,
    pricePerNight: 5500,
  },
  {
    name: 'Four Seasons Chicago',
    city: 'Chicago',
    capacity: 400,
    pricePerNight: 6200,
  },
  {
    name: 'The Peninsula Chicago',
    city: 'Chicago',
    capacity: 350,
    pricePerNight: 5800,
  },
  {
    name: 'Waldorf Astoria Chicago',
    city: 'Chicago',
    capacity: 280,
    pricePerNight: 4800,
  },

  // Austin (4 venues)
  {
    name: 'Four Seasons Austin',
    city: 'Austin',
    capacity: 450,
    pricePerNight: 4200,
  },
  {
    name: 'The Driskill Hotel',
    city: 'Austin',
    capacity: 300,
    pricePerNight: 3500,
  },
  {
    name: 'Omni Austin Hotel',
    city: 'Austin',
    capacity: 520,
    pricePerNight: 3800,
  },
  {
    name: 'Lake Austin Spa Resort',
    city: 'Austin',
    capacity: 80,
    pricePerNight: 5700,
  },

  // Nashville (4 venues)
  {
    name: 'The Hermitage Hotel',
    city: 'Nashville',
    capacity: 250,
    pricePerNight: 4500,
  },
  {
    name: 'JW Marriott Nashville',
    city: 'Nashville',
    capacity: 600,
    pricePerNight: 3900,
  },
  {
    name: 'Conrad Nashville',
    city: 'Nashville',
    capacity: 350,
    pricePerNight: 4200,
  },
  {
    name: 'Thompson Nashville',
    city: 'Nashville',
    capacity: 280,
    pricePerNight: 3200,
  },

  // Denver (3 venues)
  {
    name: 'Four Seasons Denver',
    city: 'Denver',
    capacity: 380,
    pricePerNight: 4800,
  },
  {
    name: 'The Brown Palace Hotel',
    city: 'Denver',
    capacity: 450,
    pricePerNight: 3600,
  },
  {
    name: 'The Oxford Hotel',
    city: 'Denver',
    capacity: 200,
    pricePerNight: 2800,
  },

  // Seattle (3 venues)
  {
    name: 'Four Seasons Seattle',
    city: 'Seattle',
    capacity: 350,
    pricePerNight: 5200,
  },
  {
    name: 'The Edgewater Hotel',
    city: 'Seattle',
    capacity: 280,
    pricePerNight: 3800,
  },
  {
    name: 'Fairmont Olympic Seattle',
    city: 'Seattle',
    capacity: 500,
    pricePerNight: 4200,
  },

  // Boston (3 venues)
  {
    name: 'Four Seasons Boston',
    city: 'Boston',
    capacity: 400,
    pricePerNight: 6800,
  },
  {
    name: 'The Liberty Hotel',
    city: 'Boston',
    capacity: 320,
    pricePerNight: 4500,
  },
  {
    name: 'Mandarin Oriental Boston',
    city: 'Boston',
    capacity: 280,
    pricePerNight: 5900,
  },

  // San Diego (3 venues)
  {
    name: 'Hotel del Coronado',
    city: 'San Diego',
    capacity: 650,
    pricePerNight: 5500,
  },
  {
    name: 'Fairmont Grand Del Mar',
    city: 'San Diego',
    capacity: 400,
    pricePerNight: 6200,
  },
  {
    name: 'The Lodge at Torrey Pines',
    city: 'San Diego',
    capacity: 250,
    pricePerNight: 4800,
  },

  // Scottsdale (3 venues)
  {
    name: 'The Phoenician',
    city: 'Scottsdale',
    capacity: 500,
    pricePerNight: 5200,
  },
  {
    name: 'Four Seasons Scottsdale',
    city: 'Scottsdale',
    capacity: 350,
    pricePerNight: 6500,
  },
  {
    name: 'The Boulders Resort',
    city: 'Scottsdale',
    capacity: 280,
    pricePerNight: 4600,
  },

  // Aspen (2 venues)
  {
    name: 'The St. Regis Aspen',
    city: 'Aspen',
    capacity: 200,
    pricePerNight: 9500,
  },
  {
    name: 'The Little Nell',
    city: 'Aspen',
    capacity: 150,
    pricePerNight: 8800,
  },

  // Napa Valley (2 venues)
  {
    name: 'Meadowood Napa Valley',
    city: 'Napa Valley',
    capacity: 120,
    pricePerNight: 7800,
  },
  {
    name: 'Calistoga Ranch',
    city: 'Napa Valley',
    capacity: 100,
    pricePerNight: 6900,
  },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.bookingInquiry.deleteMany();
  await prisma.venue.deleteMany();

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
