import { Container, Row, Col } from "react-bootstrap";
import { DeviceList } from "@/widgets/DeviceList";

export const DevicesPage = () => (
  <Container className="py-4">
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h1 className="mb-4 fw-bold">Устройства</h1>
        <DeviceList />
      </Col>
    </Row>
  </Container>
);
