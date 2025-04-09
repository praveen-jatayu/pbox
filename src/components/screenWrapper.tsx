import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean | number;
  safe?: boolean;
  backgroundColor?: string;
  safeAreaTopColor?: string;
  safeAreaBottomColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  keyboardAvoiding?: boolean;
  withHeader?: boolean; // NEW PROP
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  padding = false,
  safe = true,
  backgroundColor = '#fff',
  safeAreaTopColor,
  safeAreaBottomColor,
  statusBarStyle = 'dark-content',
  keyboardAvoiding = false,
  withHeader = false, // default is false (no header)
}) => {
  const insets = useSafeAreaInsets();

  const contentStyle: ViewStyle = {
    flex: 1,
    padding: typeof padding === 'boolean' ? (padding ? 16 : 0) : padding,
  };

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.inner, contentStyle]}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.inner, contentStyle]}>{children}</View>
  );

  return (
    <>
      <StatusBar
        translucent={!withHeader}  // ✅ only iOS
        barStyle={statusBarStyle}
        backgroundColor={
          Platform.OS === 'android' && withHeader
            ? safeAreaTopColor ?? backgroundColor
            : 'transparent'
        }
      />

      {safe ? (
        <View style={{flex: 1, backgroundColor}}>
          {/* Top Safe Area - SKIP if header is shown */}
          {!withHeader && (
            <View
              style={{
                height: insets.top,
                backgroundColor: safeAreaTopColor ?? backgroundColor,
              }}
            />
          )}

          {/* Content Area */}
          {keyboardAvoiding ? (
            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              {content}
            </KeyboardAvoidingView>
          ) : (
            content
          )}

          {/* Bottom Safe Area */}
          <View
            style={{
              height: insets.bottom,
              backgroundColor: safeAreaBottomColor ?? backgroundColor,
            }}
          />
        </View>
      ) : (
        <View style={[styles.container, {backgroundColor}]}>{content}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
