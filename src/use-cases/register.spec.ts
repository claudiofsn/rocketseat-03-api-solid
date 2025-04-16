import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";

describe("Register Use Case", () => {
  let usersRepository: UsersRepository;
  let sut: RegisterUseCase;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Teste",
      email: "teste@gmail.com",
      password: "teste",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Teste",
      email: "teste@gmail.com",
      password: "teste",
    });

    const isPasswordCorrectlyHashed = await compare(
      "teste",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Jhon Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Jhon Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
