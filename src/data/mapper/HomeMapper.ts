import { Meal as ApiMeal, Health as ApiHealth, TodayRoutine } from '../../remote/response/homeResponse';

// 컴포넌트가 기대하는 타입들
export interface Meal {
  mealType: string;
  slot: string;
  time: string;
  mealContent: string;
  description: string;
}

export interface HealthGuide {
  sleepGuide?: { content?: string; time?: string };
  fastingGuide?: { content?: string; time?: string };
}

export interface Alarm {
  [key: string]: unknown;
}

/**
 * API 응답의 Meal을 컴포넌트가 기대하는 Meal 타입으로 변환
 */
export function toMealModel(apiMeal: ApiMeal): Meal {
  return {
    mealType: apiMeal.label || 'UNKNOWN',
    slot: apiMeal.label || '기타',
    time: apiMeal.time,
    mealContent: apiMeal.items.join(', '),
    description: apiMeal.description,
  };
}

/**
 * API 응답의 Health를 컴포넌트가 기대하는 HealthGuide 타입으로 변환
 */
export function toHealthGuideModel(apiHealth: ApiHealth): HealthGuide {
  return {
    sleepGuide: {
      content: apiHealth.sleepGuide.join(' '),
      time: apiHealth.sleepSchedule,
    },
    fastingGuide: {
      content: apiHealth.fastingComment,
      time: apiHealth.fastingSchedule,
    },
  };
}

/**
 * API 응답의 TodayRoutine을 컴포넌트가 기대하는 타입으로 변환
 */
export function toTodayRoutineModel(todayRoutine: TodayRoutine) {
  return {
    meals: todayRoutine.meals.map(toMealModel),
    health: toHealthGuideModel(todayRoutine.health),
  };
} 