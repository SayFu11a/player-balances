/**
 * Integration-тесты для компонента BalanceControl.
 * Проверяем что UI правильно реагирует на действия пользователя:
 * показывает ошибки, блокирует кнопки, вызывает мутацию.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BalanceControl } from "./BalanceControl";

// Мокаем toast чтобы он не падал в тестовой среде
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Мокаем хук обновления баланса
const mockMutate = vi.fn();
vi.mock("@/entities/device", () => ({
  useUpdateBalance: () => ({
    mutate: mockMutate,
    isPending: false,
  }),
}));

// Хелпер: рендерим компонент с обязательным QueryClientProvider
const renderComponent = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BalanceControl deviceId="1" placeId={1} />
    </QueryClientProvider>
  );
};

describe("BalanceControl", () => {
  beforeEach(() => {
    mockMutate.mockClear();
  });

  it("рендерится без ошибок", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Введите сумму")).toBeInTheDocument();
    expect(screen.getByText("+ Deposit")).toBeInTheDocument();
    expect(screen.getByText("− Withdraw")).toBeInTheDocument();
  });

  it("кнопки задизейблены если поле пустое", () => {
    renderComponent();
    expect(screen.getByText("+ Deposit")).toBeDisabled();
    expect(screen.getByText("− Withdraw")).toBeDisabled();
  });

  it("показывает ошибку при вводе числа с 3 знаками после запятой", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Введите сумму");

    await userEvent.type(input, "100.567");
    await userEvent.click(screen.getByText("+ Deposit"));

    expect(
      screen.getByText("Максимум 2 знака после запятой (например: 100.50)")
    ).toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("показывает ошибку при вводе нуля", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Введите сумму");

    await userEvent.type(input, "0");
    await userEvent.click(screen.getByText("+ Deposit"));

    expect(
      screen.getByText("Сумма должна быть больше нуля")
    ).toBeInTheDocument();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("вызывает мутацию с правильным delta при Deposit", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Введите сумму");

    await userEvent.type(input, "100.50");
    await userEvent.click(screen.getByText("+ Deposit"));

    expect(mockMutate).toHaveBeenCalledWith(
      { placeId: 1, request: { delta: 10050 } },
      expect.any(Object)
    );
  });

  it("вызывает мутацию с отрицательным delta при Withdraw", async () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Введите сумму");

    await userEvent.type(input, "50");
    await userEvent.click(screen.getByText("− Withdraw"));

    expect(mockMutate).toHaveBeenCalledWith(
      { placeId: 1, request: { delta: -5000 } },
      expect.any(Object)
    );
  });
});
