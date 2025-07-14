import React, { createContext, useContext } from 'react';

export interface WorkTime {
  D: { startTime: string; endTime: string };
  E: { startTime: string; endTime: string };
  N: { startTime: string; endTime: string };
}

export const WorkTimeContext = createContext<{
  workTimes: WorkTime;
  setWorkTimes: React.Dispatch<React.SetStateAction<WorkTime>>;
} | null>(null);

export const useWorkTime = () => {
  const context = useContext(WorkTimeContext);
  if (!context) throw new Error('useWorkTime must be used within WorkTimeProvider');
  return context;
};
