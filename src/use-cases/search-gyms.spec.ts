import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

describe("Search Gyms Use Case", () => {
  let gymRepository: InMemoryGymRepository;
  let sut: SearchGymsUseCase;

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new SearchGymsUseCase(gymRepository);
  });

  it("should be able to search gyms", async () => {
    await gymRepository.create({
      title: "gym-01",
      latitude: -21.273033,
      longitude: -47.306356,
    });

    await gymRepository.create({
      title: "gym-02",
      latitude: -21.284957567479257,
      longitude: -47.30457689093509,
    });

    const { gyms } = await sut.execute({
      query: "01",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym-01" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Javascript Gym ${i}`,
        latitude: -21.273033,
        longitude: -47.306356,
      });
    }

    const { gyms } = await sut.execute({
      query: "Javascript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Javascript Gym 21" }),
      expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});
