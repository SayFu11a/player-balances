import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Перехватывает runtime-ошибки в дереве компонентов.
 * Без ErrorBoundary любая ошибка рендера = белый экран.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col xs={12} md={6}>
              <Alert variant="danger">
                <Alert.Heading>Что-то пошло не так</Alert.Heading>
                <p className="text-muted mb-3">
                  {this.state.error?.message ?? "Неизвестная ошибка"}
                </p>
                <Button variant="outline-danger" onClick={this.handleReset}>
                  Попробовать снова
                </Button>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    }

    return this.props.children;
  }
}
