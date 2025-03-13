import React from 'react';
import { View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const slotContainerSkeleton = () => (
    <SkeletonPlaceholder backgroundColor="#e0e0e0" highlightColor="#f5f5f5" speed={1000}>
  <View
    style={{
      marginTop: verticalScale(10),
      paddingHorizontal: scale(16),
      paddingBottom: verticalScale(12),
    }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    
        <View style={{ width: scale(100), height: verticalScale(20), borderRadius: 4 }} />
        <View style={{ width: scale(24), height: verticalScale(24), marginTop: verticalScale(5), borderRadius: 12 }} />
    

      
        <View
          style={{
            width: '55%',
            height: verticalScale(70),
            borderRadius: moderateScale(5),
          }}
        />
    
    </View>
  </View>
  </SkeletonPlaceholder>
);

export default slotContainerSkeleton;
