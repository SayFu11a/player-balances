import { memo } from "react";
import { Card, Badge } from "react-bootstrap";
import type { DevicePlace } from "@/shared/types";

interface Props {
  place: DevicePlace;
  balanceControl?: React.ReactNode;
}

/**
 * Форматирует баланс из минимальных единиц валюты в читаемый вид.
 * Сервер хранит деньги как целые числа (int64) в копейках/центах,
 * чтобы избежать погрешностей floating point при арифметике.
 * Пример: 10000 → "100.00", -235198 → "-2,351.98"
 */
const formatBalance = (balances: number): string => {
  return (balances / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const PlayerCard = memo(({ place, balanceControl }: Props) => {
  const isNegative = place.balances < 0;

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <Card.Title className="mb-1">Игрок #{place.place}</Card.Title>
            <Card.Text
              className="text-muted mb-0"
              style={{ fontSize: "0.85rem" }}
            >
              Устройство ID: {place.device_id}
            </Card.Text>
          </div>
          <div className="text-end">
            <div
              className="fw-bold fs-5"
              style={{ color: isNegative ? "#dc3545" : "inherit" }}
            >
              {formatBalance(place.balances)}
            </div>
            <Badge bg="info" text="dark">
              {place.currency}
            </Badge>
          </div>
        </div>

        {/* Слот для управления балансом */}
        {balanceControl}
      </Card.Body>
    </Card>
  );
});

PlayerCard.displayName = "PlayerCard";
