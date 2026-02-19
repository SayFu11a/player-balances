import axiosInstance from "@/shared/api/axiosInstance";
import type { Device, DevicePlace, ModBalanceRequest } from "@/shared/types";

export const getDevices = async (): Promise<Device[]> => {
  const { data } = await axiosInstance.get<Device[]>("/a/devices/");
  return data;
};

export const getDevice = async (deviceId: string): Promise<Device> => {
  const { data } = await axiosInstance.get<Device>(`/a/devices/${deviceId}/`);
  return data;
};

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
