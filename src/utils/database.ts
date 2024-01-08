import {
  PrismaClient,
  Prisma as PrismaTypes,
} from '../../prisma/src/prisma/client';

const prisma = new PrismaClient();

export { prisma, PrismaTypes };
