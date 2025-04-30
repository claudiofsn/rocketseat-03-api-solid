import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-in-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInHistoryUseCase(
    prismaCheckInRepository,
  );

  return fetchUserCheckInsHistoryUseCase;
}
