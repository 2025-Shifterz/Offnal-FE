import { HomeRepository } from '../repositories/HomeRepository';
import { HomeResponse } from '../../remote/response/homeResponse';
import { HomeData } from '../../data/impl/HomeRepositoryImpl';

export class GetHomeDataUseCase {
  constructor(private homeRepository: HomeRepository) {}

  async execute(): Promise<HomeResponse> {
    return await this.homeRepository.getHomeData();
  }

  async executeForUI(): Promise<HomeData> {
    return await this.homeRepository.getHomeDataForUI();
  }
}