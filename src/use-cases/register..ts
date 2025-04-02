import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const prismaUsersRepository = new PrismaUsersRepository();

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("e-mail already in use");
  }

  const passwordHash = await hash(password, 10);

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  });
}
