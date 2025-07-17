export type StackParamList = {
  ScheduleRegType: undefined;
  ScheduleInfoInput: { selectedBoxId: number };
  CalendarType: {
    selectedBoxId: number;
    calendarName: string;
    workGroup: string;
    workTimes: {
      D: { startTime: string; endTime: string };
      E: { startTime: string; endTime: string };
      N: { startTime: string; endTime: string };
    };
  };
  SelectInputScheduleWithOCRType: undefined;
  SelectMonthWithOCR: undefined;
  CompleteCreateScheduleOCR: undefined;
  CompleteCreate: undefined;
  EditCalendar: undefined;
};
