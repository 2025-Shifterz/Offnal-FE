export interface OnboardingItem {
  keyword: string;
  title: string;
  subtitle: string;
}

export const onboardingList: OnboardingItem[] = [
  {
    keyword: '근무 인식 & 루틴 자동화',
    title: '교대 근무표를 등록하면\n하루 루틴 자동 생성',
    subtitle: '교대 근무 패턴에 맞춘 수면•식사•운동 추천까지 한 번에',
  },
  {
    keyword: 'AI 근무표 인식',
    title: '사진 찍으면 AI가\n복잡한 근무표 자동 등록',
    subtitle: '교대근무 일정과 메모, 할 일을 한 눈에 보이게',
  },
  {
    keyword: '팀 기반 관리 및 공유',
    title: '팀원들과 근무 일정도\n소통도 함께',
    subtitle: '교대근무 일정을 팀에서 쉽게 공유하고 조율',
  },
];
