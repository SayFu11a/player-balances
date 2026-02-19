import { Alert } from "react-bootstrap";

interface Props {
  message?: string;
}

export const ErrorAlert = ({ message = "Что-то пошло не так" }: Props) => (
  <Alert variant="danger" className="mt-3">
    {message}
  </Alert>
);
