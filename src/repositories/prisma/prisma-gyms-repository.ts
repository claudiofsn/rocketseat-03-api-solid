import { prisma } from "@/lib/prisma";
import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";

export class PrismaGymRepository implements GymRepository {
  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findFirst({
      where: {
        id: gymId,
      },
    });

    return gym;
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async searchMany(params: { query: string; page: number }): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: params.query,
        },
      },
      take: 20,
      skip: (params.page - 1) * 20,
    });

    return gyms;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms
        WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
