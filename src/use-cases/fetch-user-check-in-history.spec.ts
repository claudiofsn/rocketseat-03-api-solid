import { CheckInRespository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-in-history";

describe("Fetch User Check In History Use Case", () => {
  let checkInRepository: CheckInRespository;
  let sut: FetchUserCheckInHistoryUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInHistoryUseCase(checkInRepository);
  });

  it("should be able to fetch check in history", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await sut.execute({ userId: "user-01", page: 1 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({ userId: "user-01", page: 2 });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
