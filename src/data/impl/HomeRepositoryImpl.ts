import { HomeService } from '../../infrastructure/remote/api/HomeService';
import { HomeResponse } from '../../infrastructure/remote/response/homeResponse';

export class HomeRepositoryImpl {
  constructor(private homeService: HomeService) {}

  async getHome(): Promise<HomeResponse['data']> {
    const data = await this.homeService.getHome();
    if (!data) {
      throw new Error('Home data is null');
    }
    return data;
  }
} 

