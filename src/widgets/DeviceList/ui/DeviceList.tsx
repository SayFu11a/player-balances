import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDevices, DeviceCard } from "@/entities/device";
import { Loader, ErrorAlert } from "@/shared/ui";
import type { Device } from "@/shared/types";

export const DeviceList = () => {
  const navigate = useNavigate();
  const { data: devices, isLoading, isError } = useDevices();

  const handleDeviceClick = useCallback(
    (device: Device) => {
      navigate(`/devices/${device.id}`);
    },
    [navigate]
  );

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorAlert message="Не удалось загрузить список устройств" />;
  if (!devices?.length)
    return <p className="text-muted text-center py-4">Устройства не найдены</p>;

  return (
    <div>
      {devices.map((device) => (
        <div className="fade-in-up" key={device.id}>
          <DeviceCard device={device} onClick={handleDeviceClick} />
        </div>
      ))}
    </div>
  );
};
