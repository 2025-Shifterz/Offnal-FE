import { HomeService } from '../../remote/api/HomeService';
import { HomeResponse } from '../../remote/response/homeResponse';

export class HomeRepositoryImpl {
  constructor(private homeService: HomeService) {}

  async getHome(): Promise<HomeResponse['data']> {
    const data = await this.homeService.getHome();
    return data;
  }
} 