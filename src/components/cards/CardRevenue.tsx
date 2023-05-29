import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";

import { CardSection } from "./CardSection";
import { IRevenue } from "../../@dtos/RevenuesDTOS";

const SCREEN_WIDTH = Dimensions.get("window").width;

export function CardRevenue({ id, name, section }: IRevenue) {
  const enteringKeyFrame = new Keyframe({
    0: {
      transform: [{ translateX: SCREEN_WIDTH }, { rotate: "10deg" }],
    },
    100: {
      transform: [{ translateX: 0 }, { rotate: "0deg" }],
    },
  });
  console.log("CardRevenue");

  section?.map((item) => {
    console.log(item.id);
  });

  return (
    <Animated.View
      id={id}
      entering={enteringKeyFrame.duration(400)}
      className="w-full h-full bg-yellow-300 rounded-md py-[22] px-6"
    >
      {/* <Text className="font-bold text-lg text-center text-primary-black">
        {name}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {section?.map((item) => {
          return (
            <CardSection
              id={item.id}
              description={item.description}
              contentSection={item.contentSection}
            />
          );
        })}
      </ScrollView> */}
    </Animated.View>
  );
}
