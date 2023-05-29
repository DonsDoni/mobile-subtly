import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonRevenueStorageGroupProps = TouchableOpacityProps & {
  title: string;
  description: string;
  isSelected: boolean;
};

export function ButtonRevenueStorageGroup({
  title,
  description,
  isSelected = false,
  ...rest
}: ButtonRevenueStorageGroupProps) {
  {
    /* <View className="w-44 h-full  p-4  bg-yellow-300 rounded-md ">
            <Text className="font-bold text-base text-center text-primary-black">
              Receitas favoritas
            </Text>
            <View className="flex-1 items-center justify-center ">
              <Text className="font-bold text-6xl text-center text-primary-black">
                {dataFavoriteRevenues.length}
              </Text>
            </View>
          </View> */
  }
  const ButtonType = {
    primary: "w-44 h-full p-4 border-yellow-300 border-2 rounded-md",
    secondary:
      "w-44 h-full p-4 border-yellow-300 border-2 rounded-md bg-yellow-300 ",
  };

  const TextTitleType = {
    primary: "font-bold text-base text-center text-white",
    secondary: "font-bold text-base text-center text-primary-black",
  };

  const TextDescriptionType = {
    primary: "font-bold text-6xl text-center text-white",
    secondary: "font-bold text-6xl text-center text-primary-black",
  };

  const classNameButton = !isSelected
    ? ButtonType.primary
    : ButtonType.secondary;

  const classNameTextTitle = !isSelected
    ? TextTitleType.primary
    : TextTitleType.secondary;

  const classNameTextDescription = !isSelected
    ? TextDescriptionType.primary
    : TextDescriptionType.secondary;

  return (
    <TouchableOpacity className={classNameButton} {...rest}>
      <Text className={classNameTextTitle}>{title}</Text>
      <View className="flex-1 items-center justify-center ">
        <Text className={classNameTextDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
