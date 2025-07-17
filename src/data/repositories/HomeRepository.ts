import { fetchHome } from '../../remote/request/homeRequest';
import type { HomeResponse } from '../../remote/response/homeResponse';
import EncryptedStorage from 'react-native-encrypted-storage';

export const getHomeData = async (): Promise<HomeResponse> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found');
  const response = await fetchHome(accessToken);
  return response;
};
