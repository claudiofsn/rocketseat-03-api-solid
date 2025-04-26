import { CheckIn, Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";
import { CheckInRespository } from "../check-ins-repository";

export class InMemoryCheckInRepository implements CheckInRespository {
  public items: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByuserIdOnDate(data: {
    userId: string;
    date: Date;
  }): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(data.date).startOf("date");
    const endOfTheDay = dayjs(data.date).endOf("date");

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === data.userId && isOnSameDate;
    });

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findManyByUserId(data: {
    userId: string;
    page: number;
  }): Promise<CheckIn[]> {
    return this.items
      .filter((item) => (item.user_id = data.userId))
      .slice((data.page - 1) * 20, data.page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((item) => item.user_id === userId).length;
  }
}
