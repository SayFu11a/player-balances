import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateBalance } from "@/entities/device";
import type { AxiosError } from "axios";
import type { ApiError } from "@/shared/types";
import { getValidationError } from "../model/validation";

interface Props {
  deviceId: string;
  placeId: number;
}

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiError>;
  const serverMessage = axiosError?.response?.data?.err;

  if (serverMessage?.toLowerCase().includes("insufficient"))
    return "Недостаточно средств";
  if (serverMessage?.toLowerCase().includes("invalid"))
    return "Некорректная сумма";
  if (serverMessage) return serverMessage;
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
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <div>
      <InputGroup hasValidation>
        <Form.Control
          type="number"
          placeholder="Введите сумму"
          value={amount}
          min="0.01"
          step="0.01"
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
