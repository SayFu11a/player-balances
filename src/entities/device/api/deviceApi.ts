import axiosInstance from "@/shared/api/axiosInstance";
import type { Device } from "@/shared/types";

export const getDevices = async (): Promise<Device[]> => {
  const { data } = await axiosInstance.get<Device[]>("/a/devices/");
  return data;
};

export const getDevice = async (deviceId: string): Promise<Device> => {
  const { data } = await axiosInstance.get<Device>(`/a/devices/${deviceId}/`);
  return data;
};
