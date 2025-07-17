import { fetchHome } from '../../remote/request/home';
import type { HomeResponse } from '../../remote/request/home';

export const getHomeData = async (): Promise<HomeResponse> => {
  const response = await fetchHome();
  return response.data.data;
};
