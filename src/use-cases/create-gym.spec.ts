import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";

describe("CheckIns Use Case", () => {
  let gymRepository: InMemoryGymRepository;
  let sut: CreateGymUseCase;

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -21.269238,
      longitude: -47.301589,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
