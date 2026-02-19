import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={6}>
          <h1
            style={{ fontSize: "6rem", fontWeight: "bold", color: "#dee2e6" }}
          >
            404
          </h1>
          <h2 className="mb-3">Страница не найдена</h2>
          <p className="text-muted mb-4">
            Устройство не существует или было удалено
          </p>
          <Button variant="primary" onClick={() => navigate("/")}>
            ← Вернуться к устройствам
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
