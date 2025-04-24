import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { MaxCheckInError } from "./errors/max-check-in-error";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckInRespository } from "@/repositories/check-ins-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { MaxDistanceError } from "./errors/max-distance-error";

describe("CheckIns Use Case", () => {
  let checkInsRepository: CheckInRespository;
  let gymRepository: GymRepository;
  let sut: CheckInUseCase;

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInsRepository, gymRepository);
    vi.useFakeTimers();

    await gymRepository.create({
      id: "gym-01",
      title: "Teste",
      description: "testee",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: "169999999",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "teste",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice on the same day", async () => {
    await sut.execute({
      gymId: "gym-01",
      userId: "teste",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "teste",
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInError);
  });

  it("should be able to check in twice on diferent days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "teste",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "teste",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check on distant gym", async () => {
    await gymRepository.create({
      id: "gym-02",
      title: "Teste",
      description: "testee",
      latitude: new Decimal(-21.273127),
      longitude: new Decimal(-47.306342),
      phone: "169999999",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "teste",
        userLatitude: -21.269238,
        userLongitude: -47.301589,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
