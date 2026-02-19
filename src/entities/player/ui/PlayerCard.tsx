import { memo } from "react";
import { Card, Badge } from "react-bootstrap";
import { formatBalance } from "@/shared/lib/formatCurrency";
import type { DevicePlace } from "@/shared/types";

interface Props {
  place: DevicePlace;
  balanceControl?: React.ReactNode;
}

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

        {balanceControl}
      </Card.Body>
    </Card>
  );
});

PlayerCard.displayName = "PlayerCard";
