import { useQuery } from "@tanstack/react-query";
import { getDevices, getDevice } from "../api/deviceApi";
import { QUERY_KEYS } from "@/shared/config";
// import type { ModBalanceRequest } from "@/shared/types";

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
    // retry: false — не повторяем при 404 (устройство не найдено)
    retry: false,
  });
};

// export const useUpdateBalance = (deviceId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       placeId,
//       request,
//     }: {
//       placeId: number;
//       request: ModBalanceRequest;
//     }) => updateBalance(deviceId, placeId, request),
//     // После успешного обновления — обновляем кеш устройства
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.device(deviceId) });
//     },
//   });
// };
