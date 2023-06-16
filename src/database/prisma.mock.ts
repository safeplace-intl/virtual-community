import { PrismaClient } from "@prisma/client";
import { mockDeep } from "vitest-mock-extended";

const mockPrisma = mockDeep<PrismaClient>();

export default mockPrisma;
