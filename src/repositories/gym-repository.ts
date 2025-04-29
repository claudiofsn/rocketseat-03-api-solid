import { Gym, Prisma } from "@prisma/client";

export interface GymRepository {
  findById(gymId: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(params: { query: string; page: number }): Promise<Gym[]>;
  findManyNearby(params: {
    latitude: number;
    longitude: number;
  }): Promise<Gym[]>;
}
