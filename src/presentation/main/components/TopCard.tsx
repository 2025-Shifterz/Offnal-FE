import { Dimensions, View } from 'react-native';
import { useState, useEffect } from 'react';
import BackGroundDawn from '../../../assets/cards/bg_dawn.svg';
import BackGroundMorning from '../../../assets/cards/bg_morning.svg';
import BackGroundAfternoon from '../../../assets/cards/bg_afternoon.svg';
import BackGroundEvening from '../../../assets/cards/bg_evening.svg';
// import BackGroundNight from '../../../assets/cards/bg_night.svg';
import BackGroundMidnight from '../../../assets/cards/bg_midnight.svg';

const { width: screenWidth } = Dimensions.get('window');

type TimeOfDay = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night' | 'midnight';

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 7) return 'dawn'; // 새벽 (04:00-06:59)
  if (hour >= 7 && hour < 12) return 'morning'; // 아침 (07:00-11:59)
  if (hour >= 12 && hour < 17) return 'afternoon'; // 오후 (12:00-16:59)
  if (hour >= 17 && hour < 20) return 'evening'; // 저녁 (17:00-19:59)
  if (hour >= 20 && hour < 24) return 'night'; // 밤 (20:00-23:59)
  return 'midnight'; // 자정 (00:00-03:59)
};

const getBackgroundComponent = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'dawn':
      return BackGroundDawn;
    case 'morning':
      return BackGroundMorning;
    case 'afternoon':
      return BackGroundAfternoon;
    case 'evening':
      return BackGroundEvening;
    case 'night':
      // return BackGroundNight;
      return BackGroundEvening; // bg_night.svg 인식 안되서 evening으로 대체
    case 'midnight':
      return BackGroundMidnight;
    default:
      return BackGroundEvening;
  }
};

const TopCard = () => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());

  useEffect(() => {
    // 매 분마다 시간대 체크하는거 너무 비효율적인 것 같아서 다른 방법 없을까요?
    const updateTimeOfDay = () => {
      const newTimeOfDay = getTimeOfDay();
      if (newTimeOfDay !== timeOfDay) {
        setTimeOfDay(newTimeOfDay);
      }
    };

    updateTimeOfDay(); // 컴포넌트 마운트 시 초기 시간대 설정

    // 1분마다 시간대 업데이트
    const interval = setInterval(() => {
      updateTimeOfDay();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const BackgroundComponent = getBackgroundComponent(timeOfDay);

  return (
    <View className="w-screen items-center overflow-hidden">
      <BackgroundComponent width={screenWidth} height={253} preserveAspectRatio="xMidYMid slice" />
    </View>
  );
};

export default TopCard;
