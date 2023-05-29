import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1  bg-primary-black">
        <Routes />
      </View>
    </GestureHandlerRootView>
  );
}
