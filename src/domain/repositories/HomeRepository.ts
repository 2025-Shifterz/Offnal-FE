import { HomeResponse } from '../../remote/response/homeResponse';
import { HomeData } from '../../data/impl/HomeRepositoryImpl';

export interface HomeRepository {
  /**
   * 홈 화면에 필요한 데이터를 조회합니다.
   * @returns 홈 데이터
   */
  getHomeData(): Promise<HomeResponse>;

  /**
   * UI 컴포넌트에 맞게 변환된 홈 데이터를 조회합니다.
   * @returns UI용 홈 데이터
   */
  getHomeDataForUI(): Promise<HomeData>;
} 
