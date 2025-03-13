import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';

const SportsCategorySkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor="#e0e0e0" highlightColor="#f5f5f5" speed={1000}>
    
      <View
        style={{
          width: scale(75),
          height: verticalScale(100),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          marginRight: scale(8),
        }}
      >
        {/* Logo Placeholder */}
        <View
          style={{
            width: moderateScale(40),
            height: moderateVerticalScale(40),
            borderRadius: moderateScale(20),
            marginBottom: verticalScale(8),
          }}
        />

        {/* Text Placeholder */}
        <View
          style={{
            width: scale(50),
            height: verticalScale(9),
            borderRadius: 4,
          }}
        />
      </View>
      
    </SkeletonPlaceholder>
  );
};

export default SportsCategorySkeleton;
