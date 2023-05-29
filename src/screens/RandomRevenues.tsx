import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  color,
} from "react-native-reanimated";

import { useCallback, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { View, ToastAndroid, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { api } from "../services/api";
import { IRevenue } from "../@dtos/RevenuesDTOS";
import { CardRevenue } from "../components/cards/CardRevenue";
import {
  storageRevenueSave,
  storageRevenuesGetById,
} from "../storage/storageRevenues";

import { STORAGE_KEY } from "../storage/storageConfig";
const { FAVORITE_REVENUES, SAVED_REVENUES } = STORAGE_KEY;

const CARD_SKIP = -120;
const CARD_INCLINATION = 50;
const CARD_ACTIVE_ANIMATION = 70;

const HeartButtonType = {
  primary: "",
  secondary: "",
};

const SavedButtonType = {
  primary: "",
  secondary: "",
};

export function RandomRevenues() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataRevenue, setDataRevenue] = useState<IRevenue>({} as IRevenue);

  const cardRevenuePosition = useSharedValue(0);

  const route = useRoute();

  async function fetchRandomRevenue() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/revenues/find/findRandomRevenue");
      setDataRevenue(data);

      const isFindFavorite = await findStorageRevenue(
        FAVORITE_REVENUES,
        data.id
      );
      const isFindSaved = await findStorageRevenue(FAVORITE_REVENUES, data.id);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFetchRandomRevenue() {
    try {
      setIsLoading(true);
      await fetchRandomRevenue();
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSetFavoriteRevenue() {
    try {
      setIsLoading(true);
      await storageRevenueSave(dataRevenue, FAVORITE_REVENUES);
      ToastAndroid.show("Adicionado as receitas favoritas", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSetSavedRevenue() {
    try {
      setIsLoading(true);
      await storageRevenueSave(dataRevenue, SAVED_REVENUES);
      ToastAndroid.show("Adicionado as receitas salvas", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

  async function findStorageRevenue(key: string, id: string) {
    const isFind = await storageRevenuesGetById(key, id);
    return isFind;
  }

  const onPan = Gesture.Pan()
    .activateAfterLongPress(CARD_ACTIVE_ANIMATION)

    .onUpdate((event) => {
      cardRevenuePosition.value = event.translationX;
    })
    .onEnd((event) => {
      if (event.translationX < CARD_SKIP) {
        runOnJS(handleFetchRandomRevenue)();
      }
      cardRevenuePosition.value = withTiming(0);
    });

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchRandomRevenue();
  //   }, [])
  // );

  const dragStyles = useAnimatedStyle(() => {
    const rotateZ = cardRevenuePosition.value / CARD_INCLINATION;
    return {
      transform: [
        {
          translateX: cardRevenuePosition.value,
        },
        { rotateZ: `${rotateZ}deg` },
      ],
    };
  });
  return (
    <View className="flex-1 px-4 bg-primary-black pt-10 items-center justify-start">
      <View className="w-full  h-10 mt-8 flex-row items-center justify-between  ">
        <TouchableOpacity
          className="h-full justify-center items-center"
          onPress={() => fetchRandomRevenue()}
        >
          <FontAwesome name="bug" size={20} color={colors.white} />
        </TouchableOpacity>

        <View className="h-full gap-4 flex-row items-center justify-end ">
          <TouchableOpacity
            className="h-full justify-center items-center"
            onPress={async () => await handleSetSavedRevenue()}
          >
            <FontAwesome name="save" size={20} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity className="h-full justify-center items-center">
            <FontAwesome name="share" size={20} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            className="h-full justify-center items-center"
            onPress={() => handleSetFavoriteRevenue()}
          >
            <FontAwesome name="heart" size={20} color={colors.red[500]} />
          </TouchableOpacity>
        </View>
      </View>
      <GestureDetector gesture={onPan}>
        <Animated.View className="h-[80%] w-full mt-5" style={dragStyles}>
          <CardRevenue
            id={dataRevenue.id}
            name={dataRevenue.name}
            section={dataRevenue.section}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
