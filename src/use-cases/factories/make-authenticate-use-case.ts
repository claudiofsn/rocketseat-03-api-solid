import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return registerUseCase;
}
