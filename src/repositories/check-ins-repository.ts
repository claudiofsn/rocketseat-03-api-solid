import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRespository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(params: {
    userId: string;
    date: Date;
  }): Promise<CheckIn | null>;
  findManyByUserId(params: {
    userId: string;
    page: number;
  }): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findById(checkInId: string): Promise<CheckIn | null>;
  save(checkIn: CheckIn): Promise<CheckIn>;
}
