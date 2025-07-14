export type StackParamList = {
  ScheduleRegType: undefined;
  ScheduleInfoInput: { selectedBoxId: number };
  CalendarType: {
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
  };
  CompleteCreate: undefined;
};
