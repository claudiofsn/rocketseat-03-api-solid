import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchGymsUseCaseReponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    page,
    query,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseReponse> {
    const gyms = await this.gymRepository.searchMany({
      query,
      page,
    });

    return { gyms };
  }
}
