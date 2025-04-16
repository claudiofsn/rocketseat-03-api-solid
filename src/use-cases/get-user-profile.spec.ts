import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

describe("Authenticate Use Case", () => {
  let usersRepository: UsersRepository;
  let sut: GetUserProfileUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able get a user profile", async () => {
    const { id } = await usersRepository.create({
      name: "Jhon Doe",
      email: "teste@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: id });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able get a user profile with worng id", async () => {
    await expect(() =>
      sut.execute({ userId: "non-existing-id" }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
