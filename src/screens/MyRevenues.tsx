import { useCallback, useState } from "react";
import { Text, ToastAndroid, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { storageRevenuesGet } from "../storage/storageRevenues";

import { STORAGE_KEY } from "../storage/storageConfig";
import { IRevenue } from "../@dtos/RevenuesDTOS";
import { useFocusEffect } from "@react-navigation/native";
import { ButtonRevenueStorageGroup } from "../components/buttons/ButtonRevenueStorageGroup";

export function MyRevenues() {
  const { FAVORITE_REVENUES, SAVED_REVENUES } = STORAGE_KEY;

  const [isLoading, setIsLoading] = useState(true);
  const [dataSavedRevenues, setDataSavedRevenues] = useState<IRevenue[]>([]);
  const [dataFavoriteRevenues, setDataFavoriteRevenues] =
    useState<IRevenue[]>();
  const [dataSelectedGroup, setDataSelectedGroup] = useState<IRevenue[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<
    "FAVORITE_REVENUES" | "SAVED_REVENUES"
  >("FAVORITE_REVENUES");

  async function fetchDataRevenues() {
    try {
      setIsLoading(true);
      const [dataFavorite, savedFavorite] = await Promise.all([
        storageRevenuesGet(FAVORITE_REVENUES),
        storageRevenuesGet(SAVED_REVENUES),
      ]);
      setDataFavoriteRevenues(dataFavorite);
      setDataSavedRevenues(savedFavorite);

      setSelectedGroup("FAVORITE_REVENUES");
      setDataSelectedGroup(dataFavorite);
    } catch (error) {
      ToastAndroid.show(error, ToastAndroid.LONG);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSetSelectedGroup(
    group: "FAVORITE_REVENUES" | "SAVED_REVENUES"
  ) {
    setSelectedGroup(group);

    group === "SAVED_REVENUES"
      ? setDataSelectedGroup(dataSavedRevenues)
      : setDataSelectedGroup(dataFavoriteRevenues);
  }

  useFocusEffect(
    useCallback(() => {
      fetchDataRevenues();
    }, [])
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <View className="flex-1 bg-primary-black px-4 pt-10 items-center justify-start">
      <ScrollView className="flex-1 w-full">
        <View className="w-full h-40 mt-9 mb-9  flex-row justify-between">
          <ButtonRevenueStorageGroup
            title="Receitas favoritas"
            description={String(
              dataFavoriteRevenues ? dataFavoriteRevenues.length : 0
            )}
            isSelected={selectedGroup === "FAVORITE_REVENUES"}
            onPress={() => handleSetSelectedGroup("FAVORITE_REVENUES")}
          />
          <ButtonRevenueStorageGroup
            title="Receitas salvas"
            description={String(
              dataSavedRevenues ? dataSavedRevenues.length : 0
            )}
            isSelected={selectedGroup === "SAVED_REVENUES"}
            onPress={() => handleSetSelectedGroup("SAVED_REVENUES")}
          />
        </View>

        {dataSelectedGroup.map((revenue) => {
          return (
            <View
              id={revenue.id}
              className="w-full h-24 mt-2 p-4 bg-yellow-300 rounded-md "
            >
              <Text className="font-bold text-base text-primary-black  ">
                {revenue.name}
              </Text>
              <View className="flex-1  justify-start ">
                <Text className="font-bold text-base  text-gray-700">
                  Salvo: 01/01/2023
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
