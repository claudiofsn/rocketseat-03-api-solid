import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register.";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
      name: "Teste",
      email: "teste@gmail.com",
      password: "teste",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const { user } = await registerUserCase.execute({
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
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUserCase = new RegisterUseCase(inMemoryUsersRepository);

    const email = "jhondoe@example.com";

    await registerUserCase.execute({
      name: "Jhon Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUserCase.execute({
        name: "Jhon Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
