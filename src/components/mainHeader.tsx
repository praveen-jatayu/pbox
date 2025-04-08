import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import { icons } from "../constants/Icon";
import mainStyles from "../assets/styles/mainStyles";
import { AppStackParamList } from "../navigation/navigationTypes";

interface HeaderProps {
  headerType?: "home" | "booking" | "bookmark" | "sub"; // 'sub' for screens with a back button
  title?: string; // Used for subheaders
  isFetchingLocation?: boolean;
  location?: string[];
  onPressBack?: () => void; // Back button action
  style?: StyleProp<ViewStyle>;
}

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const MainHeader: React.FC<HeaderProps> = ({
  headerType = "home",
  title = "",
  isFetchingLocation = false,
  location = [],
  onPressBack,
  style,
}) => {
  const navigation = useNavigation<NavigationProp>();

  // Default back action if onPressBack is not provided
  const handleBackPress = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigation.goBack();
    }
  };

  // Function to handle left content rendering
  const renderLeftContent = () => {
    switch (headerType) {
      case "home":
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("SelectLocation")}
            style={styles.locationContainer}
            activeOpacity={0.8}
          >
            <Image source={icons.locationIcon} style={styles.locationIcon} />
            <View style={styles.locationTextContainer}>
              {!isFetchingLocation ? (
                <View>
                  <Text style={[mainStyles.fontInriaSansRegular, mainStyles.darkTextColor, mainStyles.fontSize18]}>
                    {location[0] || "Select Location"}
                  </Text>
                  <Text style={[mainStyles.fontInriaSansRegular, mainStyles.darkTextColor, mainStyles.fontSize14]}>
                    {location[1] || ""}
                  </Text>
                </View>
              ) : (
                <View style={styles.skeletonPlaceholder} />
              )}
              <Image source={icons.downArrowIcon} style={styles.downArrowIcon} />
            </View>
          </TouchableOpacity>
        );

      case "booking":
        return <Text style={[mainStyles.darkTextColor, mainStyles.fontSize18, mainStyles.fontInriaSansRegular]}>Bookings</Text>;

      case "bookmark":
        return <Text style={[mainStyles.darkTextColor, mainStyles.fontSize18, mainStyles.fontInriaSansRegular]}>Bookmarks</Text>;

      case "sub":
        return (
          <TouchableOpacity onPress={handleBackPress} activeOpacity={0.6} style={styles.backButton}>
            <Image source={icons.backIcon} style={styles.icon} />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    
    <View
      style={[
        styles.headerContainer,
        mainStyles.secondaryBackgroundColor,
        mainStyles.widthFull,
        mainStyles.dropShadowEffect,
        style,
      ]}
    >
      {/* Left Content (Back button or location) */}
      {renderLeftContent()}

      {/* Centered Title for Sub Header */}
      {headerType === "sub" && (
        <Text style={[mainStyles.darkTextColor, mainStyles.fontSize18, mainStyles.fontInriaSansRegular, styles.centerTitle]}>
          {title}
        </Text>
      )}

      {/* Right Icons (Only for Main Headers) */}
      {headerType !== "sub" && (
        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")} activeOpacity={0.5}>
            <Image source={icons.notificationIcon} style={styles.headerIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} activeOpacity={0.5}>
            <Image source={icons.userIcon} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: moderateVerticalScale(60, 0.6),
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(5),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: scale(20),
    height: verticalScale(20),
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: scale(10),
  },
  downArrowIcon: {
    width: scale(17),
    height: verticalScale(17),
    marginLeft: scale(5),
  },
  iconGroup: {
    flexDirection: "row",
    gap: scale(10),
  },
  headerIcon: {
    width: moderateScale(23),
    height: moderateVerticalScale(23),
  },
  skeletonPlaceholder: {
    width: scale(80),
    height: verticalScale(16),
    backgroundColor: "#E0E0E0",
    borderRadius: scale(4),
  },
  centerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: verticalScale(16),
    textAlign: "center",
    pointerEvents: "none", // Prevents blocking touches
  },
  icon: {
    width: scale(22),
    height: verticalScale(22),
  },
  backButton: {
    zIndex: 20, // Ensures it's above other elements
   
  },
});
