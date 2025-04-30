import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRespository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInRepository implements CheckInRespository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findByUserIdOnDate(params: {
    userId: string;
    date: Date;
  }): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(params.date).startOf("date");
    const endOfTheDay = dayjs(params.date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: params.userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(params: {
    userId: string;
    page: number;
  }): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: params.userId,
      },
      take: 20,
      skip: (params.page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const checkInUpdated = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });
    return checkInUpdated;
  }
}
