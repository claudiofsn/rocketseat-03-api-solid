import { CheckInRespository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LateCheckInValidateError } from "./errors/late-check-in-validate-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ValidateCheckInUseCase } from "./validate-check-in";

describe("Validate Check In Use Case", () => {
  let checkInRepository: CheckInRespository;
  let sut: ValidateCheckInUseCase;

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be validate the check-in", async () => {
    const { id } = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({ checkInId: id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("it should not be able to validate a check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const { id } = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const TWENTYONEMINUTESINMS = 1000 * 60 * 21;

    vi.advanceTimersByTime(TWENTYONEMINUTESINMS);

    await expect(() => sut.execute({ checkInId: id })).rejects.toBeInstanceOf(
      LateCheckInValidateError,
    );
  });
});
