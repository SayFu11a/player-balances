import axiosInstance from "@/shared/api/axiosInstance";
import type { DevicePlace, ModBalanceRequest } from "@/shared/types";

export const updateBalance = async (
  deviceId: string,
  placeId: number,
  request: ModBalanceRequest
): Promise<DevicePlace> => {
  const { data } = await axiosInstance.post<DevicePlace>(
    `/a/devices/${deviceId}/place/${placeId}/update`,
    request
  );
  return data;
};
