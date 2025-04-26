import { CheckInRespository } from "@/repositories/check-ins-repository";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserMetricsUseCase } from "./get-user-metrics";

describe("Get User Metrics Use Case", () => {
  let checkInRepository: CheckInRespository;
  let sut: GetUserMetricsUseCase;

  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({ userId: "user-01" });

    expect(checkInsCount).toBe(2);
  });
});
