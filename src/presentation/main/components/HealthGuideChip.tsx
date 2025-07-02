import {
    Text,
    View 
} from 'react-native';

import BedIcon from '../../../assets/icons/ic_bed_24.svg';
import HourGlassIcon from '../../../assets/icons/ic_hourglass_24.svg';

import React from 'react';

enum HealthGuideType {
    SLEEP = 'SLEEP',
    FASTING_TIME = 'FASTING_TIME',
}


interface HealthGuideChipProps {
    healthGuideType: HealthGuideType;
    guideContent: string;
    guideTime: string;
}

const HealthGuideChip: React.FC<HealthGuideChipProps> = ({healthGuideType, guideContent, guideTime}) => {
    const HealthGuideIconComponent = () => {
        switch (healthGuideType) {
            case HealthGuideType.SLEEP:
                return <BedIcon />;
            case HealthGuideType.FASTING_TIME:
                return <HourGlassIcon />;
            default:
                return <HourGlassIcon />;
        }
    }

    const HealthGuideChipTitle = healthGuideType === HealthGuideType.SLEEP ? "수면 일정" :
        healthGuideType === HealthGuideType.FASTING_TIME ? "공복 시간" : "기타";

    return(
        <View className="flex-1 items-start justify-center bg-surface-white ps-number-7 pe-number-6 py-number-6 rounded-radius-s shadow-shadow-blur-3">
            <View className="flex-row items-center justify-center py-number-4">
                <HealthGuideIconComponent />
                <Text className="text-heading-xxxs ps-number-3 text-text-subtle font-semibold">{HealthGuideChipTitle}</Text>
            </View>

            <Text className="text-body-xxs text-text-disabled" numberOfLines={2}>
                {guideContent}
            </Text>            

            <Text className="text-heading-xxs text-text-basic font-pretendard font-semibold pt-number-6">
                {guideTime}
            </Text>            

        </View>
    );
}  

export default HealthGuideChip;
export { HealthGuideType };