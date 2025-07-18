export interface GetWorkCalendarResponse {
  code: string;
  message: string;
  data: GetWorkCalendarResponseData[];
}

export interface GetWorkCalendarResponseData {
    day: string;
    workTypeName: '오전' | '오후' | '야간' | '휴무' | string;
}