import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

export function makeSearchGymsUseCase() {
  const prismaGymRepository = new PrismaGymRepository();
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymRepository);

  return searchGymsUseCase;
}
