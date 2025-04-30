import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export function makeFetchGymsNearbyUseCase() {
  const prismaGymRepository = new PrismaGymRepository();
  const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(
    prismaGymRepository,
  );

  return fetchNearbyGymsUseCase;
}
