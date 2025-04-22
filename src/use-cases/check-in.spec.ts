import { CheckInsRespository } from "@/repositories/check-ins-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInTwiceOnDayError } from "./errors/check-in-twice-on-day.error";

describe("CheckIns Use Case", () => {
  let checkInsRepository: CheckInsRespository;
  let sut: CheckInUseCase;

  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "teste",
      userId: "teste",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice on the same day", async () => {
    await sut.execute({
      gymId: "teste",
      userId: "teste",
    });

    await expect(() =>
      sut.execute({
        gymId: "teste",
        userId: "teste",
      }),
    ).rejects.toBeInstanceOf(CheckInTwiceOnDayError);
  });

  it("should be able to check in twice on diferent days", async () => {
    await sut.execute({
      gymId: "teste",
      userId: "teste",
    });

    const { checkIn } = await sut.execute({
      gymId: "teste",
      userId: "teste",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
