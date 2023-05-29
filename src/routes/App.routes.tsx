import colors from "tailwindcss/colors";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RandomRevenues } from "../screens/RandomRevenues";
import { MyRevenues } from "../screens/MyRevenues";

export type AppBottomTabRoutesProps = {
  randomRevenue: undefined;
  myRevenues: undefined;
};

const BottomTabRoutes = createBottomTabNavigator<AppBottomTabRoutesProps>();

export function AppRoutes() {
  return (
    <BottomTabRoutes.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          borderTopColor: colors.yellow[300],
          backgroundColor: "#1b1521",
          paddingBottom: 10,
        },
        tabBarActiveTintColor: colors.yellow[300],
      }}
    >
      <BottomTabRoutes.Screen
        name="randomRevenue"
        component={RandomRevenues}
        options={{
          title: "Receitas aleatórias",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="random" size={24} color={color} />
          ),
        }}
      />
      
      <BottomTabRoutes.Screen
        name="myRevenues"
        component={MyRevenues}
        options={{
          title: "Minhas receitas ",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-takeout-box"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </BottomTabRoutes.Navigator>
  );
}
