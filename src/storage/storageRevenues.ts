import { IRevenue } from "../@dtos/RevenuesDTOS";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageRevenueDelete(keyStorageRevenue: string) {
  try {
    await AsyncStorage.removeItem(keyStorageRevenue);
  } catch (error) {
    throw error;
  }
}

export async function storageRevenueSave(
  revenue: IRevenue,
  keyStorageRevenue: string
) {
  try {
    const oldsRevenue = await storageRevenuesGet(keyStorageRevenue);

    const findRevenue = oldsRevenue.find((item) => {
      return item.id === revenue.id;
    });
    if (!findRevenue) {
      const newRevenue = [...oldsRevenue];
      newRevenue.push(revenue);

      await AsyncStorage.setItem(keyStorageRevenue, JSON.stringify(newRevenue));
    }
  } catch (error) {
    throw error;
  }
}

export async function storageRevenuesGet(
  keyStorageRevenue: string
): Promise<IRevenue[]> {
  try {
    const storage = await AsyncStorage.getItem(keyStorageRevenue);
    const RevenuesData: IRevenue[] = JSON.parse(storage);
    return RevenuesData ? RevenuesData : [];
  } catch (error) {
    throw error;
  }
}

export async function storageRevenuesGetById(
  keyStorageRevenue: string,
  id: string
): Promise<IRevenue> {
  try {
    const storage = await AsyncStorage.getItem(keyStorageRevenue);
    const revenuesData: IRevenue[] = JSON.parse(storage);
    const revenueData = revenuesData.find((revenue) => {
      return revenue.id === id;
    });
    return revenueData ? revenueData : ({} as IRevenue);
  } catch (error) {
    throw error;
  }
}
