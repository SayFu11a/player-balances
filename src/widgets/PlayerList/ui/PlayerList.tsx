import { useDevice } from "@/entities/device";
import { PlayerCard } from "@/entities/player";
import { BalanceControl } from "@/features/balance";
import { Loader, ErrorAlert } from "@/shared/ui";

interface Props {
  deviceId: string;
}

export const PlayerList = ({ deviceId }: Props) => {
  const { data: device, isLoading, isError } = useDevice(deviceId);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorAlert message="Не удалось загрузить игроков" />;
  if (!device?.places?.length)
    return <p className="text-muted text-center py-4">Игроки не найдены</p>;

  return (
    <div>
      {device.places.map((place) => (
        <div key={place.place} className="fade-in-up">
          <PlayerCard
            place={place}
            balanceControl={
              <BalanceControl deviceId={deviceId} placeId={place.place} />
            }
          />
        </div>
      ))}
    </div>
  );
};
