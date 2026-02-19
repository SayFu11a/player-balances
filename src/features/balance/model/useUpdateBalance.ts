import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/config";
import type { ModBalanceRequest } from "@/shared/types";
import { updateBalance } from "../api/balanceApi";

export const useUpdateBalance = (deviceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      placeId,
      request,
    }: {
      placeId: number;
      request: ModBalanceRequest;
    }) => updateBalance(deviceId, placeId, request),
    // После успешного обновления — инвалидируем кеш устройства
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.device(deviceId) });
    },
  });
};
