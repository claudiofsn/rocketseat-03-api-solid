import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRespository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInsRespository {
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
    const checkIn = this.items.find(
      (checkIn) => checkIn.user_id === data.userId,
    );

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }
}
