import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CheckInsUseCase } from "./check-ins";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

describe("CheckIns Use Case", () => {
  let checkInsRepository: CheckInsRespository;
  let sut: CheckInsUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInsUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "teste",
      userId: "teste",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
