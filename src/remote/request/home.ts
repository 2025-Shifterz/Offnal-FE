import api from '../api/axiosInstance';
import { AxiosResponse } from 'axios';

interface TodayRoutine {
  meals: {
    label: string;
    time: string;
    description: string;
    items: string[];
  }[];
  health: {
    fastingComment: string;
    fastingSchedule: string;
    sleepGuide: string[];
    sleepSchedule: string;
  };
}

export interface HomeResponse {
  yesterdayType: 'DAY' | 'NIGHT' | 'OFF';
  todayType: 'DAY' | 'NIGHT' | 'OFF';
  tomorrowType: 'DAY' | 'NIGHT' | 'OFF';
  todayRoutine: TodayRoutine;
}

export const fetchHome = async (): Promise<AxiosResponse<{ data: HomeResponse }>> => {
  return api.get('/home');
};
