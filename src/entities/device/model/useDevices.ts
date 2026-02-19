import { useQuery } from "@tanstack/react-query";
import { getDevices, getDevice } from "../api/deviceApi";
import { QUERY_KEYS } from "@/shared/config";

export const useDevices = () => {
  return useQuery({
    queryKey: QUERY_KEYS.devices,
    queryFn: getDevices,
  });
};

export const useDevice = (deviceId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.device(deviceId),
    queryFn: () => getDevice(deviceId),
    enabled: !!deviceId,
    retry: false,
  });
};
