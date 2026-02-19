import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateBalance } from "@/entities/device";
// import type { AxiosError } from "axios";
import axios from "axios";
import type { ApiError } from "@/shared/types";
import { getValidationError } from "../model/validation";

interface Props {
  deviceId: string;
  placeId: number;
}

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

    // Если сервер вернул что-то другое — показываем как есть
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

  const { mutate: updateBalance, isPending } = useUpdateBalance(deviceId);

  const validate = (value: string): boolean => {
    const error = getValidationError(value);
    setInputError(error ?? "");
    return error === null;
  };

  const handleOperation = (type: "deposit" | "withdraw") => {
    if (!validate(amount)) return;

    const delta =
      Math.round(parseFloat(amount) * 100) * (type === "deposit" ? 1 : -1);

    updateBalance(
      { placeId, request: { delta } },
      {
        onSuccess: () => {
          toast.success(
            type === "deposit" ? "Баланс пополнен!" : "Средства сняты!"
          );
          setAmount("");
          setInputError("");
        },
        onError: (error: unknown) => {
          toast.error(getErrorMessage(error));
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
          {isPending ? "Загрузка..." : "+ Deposit"}
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled={isPending || !amount}
          onClick={() => handleOperation("withdraw")}
          className="flex-grow-1"
        >
          {isPending ? "Загрузка..." : "− Withdraw"}
        </Button>
      </div>
    </div>
  );
};
