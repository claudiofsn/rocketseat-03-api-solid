import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";

export function makeCheckInUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const prismaGymRepository = new PrismaGymRepository();
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymRepository,
  );

  return checkInUseCase;
}
