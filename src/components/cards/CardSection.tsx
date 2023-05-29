import { Text, View } from "react-native";
import Octions from "@expo/vector-icons/Octicons";

import colors from "tailwindcss/colors";
import { IRevenueSection } from "../../@dtos/RevenuesDTOS";

export function CardSection({
  id,
  description,
  contentSection,
}: IRevenueSection) {
  return (
    <View id={id} className="mt-8">
      <Text className="font-bold text-lg  text-primary-black">
        {description}
      </Text>

      {/* {contentSection?.map((item) => {
        return (
          <Text
            id={item.id}
            className="font-bold text-base  text-primary-black"
          >
            <Octions name="dot-fill" size={10} color={colors.black} /> {item.description}
          </Text>
        );
      })} */}
    </View>
  );
}
