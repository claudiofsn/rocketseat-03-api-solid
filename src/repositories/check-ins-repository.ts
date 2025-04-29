import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByuserIdOnDate(data: {
    userId: string;
    date: Date;
  }): Promise<CheckIn | null>;
  findManyByUserId(data: { userId: string; page: number }): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findById(checkInId: string): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
