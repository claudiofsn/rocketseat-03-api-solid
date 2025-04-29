import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gymId);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async searchMany(data: { query: string; page: number }): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(data.query))
      .slice((data.page - 1) * 20, data.page * 20);
  }

  async findManyNearby(params: {
    latitude: number;
    longitude: number;
  }): Promise<Gym[]> {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates({
        from: { latitude: params.latitude, longitude: params.longitude },
        to: {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      });
      return distance < 10;
    });
  }
}
