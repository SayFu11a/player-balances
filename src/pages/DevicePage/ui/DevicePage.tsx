import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PlayerList } from "@/widgets/PlayerList";

export const DevicePage = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();

  if (!deviceId) return null;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/")}
            >
              ← Назад
            </Button>
            <h1 className="mb-0 fw-bold">Игроки устройства #{deviceId}</h1>
          </div>

          <PlayerList deviceId={deviceId} />
        </Col>
      </Row>
    </Container>
  );
};
