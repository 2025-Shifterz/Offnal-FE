import api from '../api/axiosInstance';
import { HomeResponse } from '../response/homeResponse';

export const fetchHome = async (): Promise<HomeResponse> => {
  const response = await api.get<HomeResponse>('/home');
  return response.data;
};
