import { Spinner } from "react-bootstrap";

export const Loader = () => (
  <div className="d-flex justify-content-center align-items-center py-5">
    <Spinner animation="border" variant="primary" role="status">
      <span className="visually-hidden">Загрузка...</span>
    </Spinner>
  </div>
);
