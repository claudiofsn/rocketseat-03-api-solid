import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckInRepository,
  );

  return getUserMetricsUseCase;
}
