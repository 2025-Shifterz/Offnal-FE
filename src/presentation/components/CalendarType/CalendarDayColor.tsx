/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface DateProps {
  date?: {
    dateString: string;
    day: number;
  };
  selected: boolean;
}

// 요일별 색상 지정
const getDayColor = (dateString: string) => {
  const dayIndex = new Date(dateString).getDay();
  if (dayIndex === 0) return '#BD2C0F'; // red
  if (dayIndex === 6) return '#096AB3'; // blue
  return '#1E2124';
};

// 오늘의 날짜를 'YYYY-MM-DD' 형식으로 구하기
// days 중에서 오늘의 날짜와 같으면 글자 색상 부여
const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formatDate = `${year}-${month}-${day}`;
  return formatDate;
};

const CalendarDayColor = ({ date, selected }: DateProps) => {
  // days 관련 커스텀 적용
  // 따라서 onDayPress, markedDates 불필요함 - 직접 적용해야함
  if (!date) return null;
  const dayColor = getDayColor(date.dateString);
  const isToday = date.dateString === todayDate();
  console.log(todayDate());
  console.log(isToday);
  return (
    <View
      style={[
        styles.dayContainer,

        { backgroundColor: isToday ? '#F4F5F6' : 'transparent' },
        selected && styles.selected,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: isToday ? '#131416' : dayColor }, // 회색 : 흰색
          selected && styles.selectedText,
        ]}
      >
        {date.day}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  selected: {
    backgroundColor: '#2ECADC', // 선택된 날짜 배경: 민트색
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  text: {
    fontSize: 13,
  },
});

export default CalendarDayColor;
