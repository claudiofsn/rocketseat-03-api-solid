import { GymRepository } from "@/repositories/gym-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

describe("Fetch Nearby Gyms Use Case", () => {
  let gymRepository: GymRepository;
  let sut: FetchNearbyGymsUseCase;

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it("should be able to search gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      latitude: -21.273059,
      longitude: -47.306246,
    });

    await gymRepository.create({
      title: "Far Gym",
      latitude: -21.288429,
      longitude: -47.542373,
    });

    const { gyms } = await sut.execute({
      userLatitude: -21.264598,
      userLongitude: -47.298554,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
