import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const password = await bcrypt.hash('password', roundsOfHashing);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: password,
      concerts: {
        create: [
          {
            name: 'Concert Name 1',
            description:
              'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
            seat: 500,
          },
          {
            name: 'Concert Name 2',
            description:
              'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
            seat: 500,
          },
          {
            name: 'Concert Name 3',
            description:
              'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
            seat: 500,
          },
          {
            name: 'Concert Name 4',
            description:
              'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
            seat: 500,
          },
          {
            name: 'Concert Name 5',
            description:
              'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
            seat: 500,
          },
        ],
      },
    },
  });

  const concert = await prisma.concert.upsert({
    where: { name: 'Concert Name 6' },
    update: {},
    create: {
      name: 'Concert Name 6',
      description:
        'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.2121',
      author: {
        connect: {
          id: admin.id,
        },
      },
      seat: 500,
      userLogs: {
        create: [
          {
            action: 'Reserve',
            userLog: {
              create: {
                name: 'user1',
                email: 'user1@user1.com',
                password: password,
              },
            },
          },
          {
            action: 'Reserve',
            userLog: {
              create: {
                name: 'user2',
                email: 'user1@user2.com',
                password: password,
              },
            },
          },
          {
            action: 'Reserve',
            userLog: {
              create: {
                name: 'user3',
                email: 'user1@user3.com',
                password: password,
              },
            },
          },
        ],
      },
    },
  });

  console.log({ admin, concert });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
