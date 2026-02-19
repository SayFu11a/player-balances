import { memo } from "react";
import { Card, Badge } from "react-bootstrap";
import type { Device } from "@/shared/types";

interface Props {
  device: Device;
  onClick: (device: Device) => void;
}

export const DeviceCard = memo(({ device, onClick }: Props) => (
  <Card
    onClick={() => onClick(device)}
    className="mb-3 device-card"
    style={{
      cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLElement).style.boxShadow =
        "0 4px 12px rgba(0,0,0,0.12)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      (e.currentTarget as HTMLElement).style.boxShadow = "";
    }}
  >
    <Card.Body className="d-flex justify-content-between align-items-center">
      <div>
        <Card.Title className="mb-1">{device.name}</Card.Title>
        <Card.Text className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>
          ID: {device.id}
        </Card.Text>
      </div>
      <Badge bg="secondary" pill>
        {device.places.length} мест
      </Badge>
    </Card.Body>
  </Card>
));

DeviceCard.displayName = "DeviceCard";
