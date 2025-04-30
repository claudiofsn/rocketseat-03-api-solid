import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCase } from "../create-gym";

export function makeCreateGymUseCase() {
  const prismaGymRepository = new PrismaGymRepository();
  const createGymUseCase = new CreateGymUseCase(prismaGymRepository);

  return createGymUseCase;
}
