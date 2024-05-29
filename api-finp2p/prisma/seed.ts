import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { hashSync } from 'bcrypt';

async function main() {
  await prisma.user.create({
    data: {
      email: 'finp2p@gmail.com',
      password: hashSync('123456789', 10),
      isAdmin: true,
      firstName: 'Admin',
      lastName: 'FinP2P',
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
