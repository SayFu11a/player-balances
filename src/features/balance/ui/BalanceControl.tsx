import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useUpdateBalance } from "../model/useUpdateBalance";
import { getValidationError } from "../model/validation";
import type { ApiError } from "@/shared/types";

interface Props {
  deviceId: string;
  placeId: number;
}

type OperationType = "deposit" | "withdraw";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiError>(error)) {
    const serverMessage = error.response?.data?.err;
    const msg = serverMessage?.toLowerCase() ?? "";

    if (msg.includes("insufficient") || msg.includes("not enough")) {
      return "Недостаточно средств";
    }
    if (msg.includes("invalid")) {
      return "Некорректная сумма";
    }

    if (serverMessage) {
      return serverMessage;
    }

    if (!error.response) {
      return "Нет соединения с сервером";
    }

    return `Ошибка сервера (${error.response.status})`;
  }

  return "Произошла ошибка. Попробуйте снова";
};

export const BalanceControl = ({ deviceId, placeId }: Props) => {
  const [amount, setAmount] = useState("");
  const [inputError, setInputError] = useState("");
  const [activeOp, setActiveOp] = useState<OperationType | null>(null);

  const { mutate: updateBalance, isPending } = useUpdateBalance(deviceId);

  const validate = (value: string): boolean => {
    const error = getValidationError(value);
    setInputError(error ?? "");
    return error === null;
  };

  const handleOperation = (type: OperationType) => {
    if (!validate(amount)) return;

    const delta =
      Math.round(parseFloat(amount) * 100) * (type === "deposit" ? 1 : -1);

    setActiveOp(type);

    updateBalance(
      { placeId, request: { delta } },
      {
        onSuccess: () => {
          toast.success(
            type === "deposit" ? "Баланс пополнен!" : "Средства сняты!"
          );
          setAmount("");
          setInputError("");
          setActiveOp(null);
        },
        onError: (error: unknown) => {
          toast.error(getErrorMessage(error));
          setActiveOp(null);
        },
      }
    );
  };

  return (
    <div>
      <InputGroup hasValidation>
        <Form.Control
          type="text"
          inputMode="decimal"
          placeholder="Введите сумму"
          value={amount}
          isInvalid={!!inputError}
          onChange={(e) => {
            setAmount(e.target.value);
            if (inputError) validate(e.target.value);
          }}
          disabled={isPending}
        />
        <Form.Control.Feedback type="invalid">
          {inputError}
        </Form.Control.Feedback>
      </InputGroup>

      <div className="d-flex gap-2 mt-2">
        <Button
          variant="success"
          size="sm"
          disabled={isPending || !amount}
          onClick={() => handleOperation("deposit")}
          className="flex-grow-1"
        >
          {activeOp === "deposit" ? "Пополнение..." : "+ Deposit"}
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled={isPending || !amount}
          onClick={() => handleOperation("withdraw")}
          className="flex-grow-1"
        >
          {activeOp === "withdraw" ? "Списание..." : "− Withdraw"}
        </Button>
      </div>
    </div>
  );
};
