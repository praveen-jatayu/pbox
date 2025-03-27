import React, { ReactNode, useEffect, useState } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import NoDataContainer from "../components/noDataContainer";

interface InternetCheckProps {
  children: ReactNode;
}

const InternetCheck: React.FC<InternetCheckProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false); // Ensure it's always a boolean
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return (
      <>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={styles.fallbackContainer}>
          <NoDataContainer noDataText="No Internet Connection" style={undefined} />
        </View>
      </>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InternetCheck;
