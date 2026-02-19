import { getValidationError } from "../model/validation";

describe("getValidationError", () => {
  it("возвращает ошибку если поле пустое", () => {
    expect(getValidationError("")).toBe("Введите сумму");
  });

  it("возвращает ошибку если только пробелы", () => {
    expect(getValidationError("   ")).toBe("Введите сумму");
  });

  it("возвращает ошибку если введён ноль", () => {
    expect(getValidationError("0")).toBe("Сумма должна быть больше нуля");
  });

  it("возвращает ошибку если отрицательное число", () => {
    expect(getValidationError("-50")).toBe("Сумма должна быть больше нуля");
  });

  it("возвращает ошибку если 3 знака после запятой", () => {
    expect(getValidationError("100.567")).toBe(
      "Максимум 2 знака после запятой (например: 100.50)"
    );
  });

  it("возвращает null для целого числа", () => {
    expect(getValidationError("100")).toBeNull();
  });

  it("возвращает null для числа с 1 знаком после запятой", () => {
    expect(getValidationError("100.5")).toBeNull();
  });

  it("возвращает null для числа с 2 знаками после запятой", () => {
    expect(getValidationError("100.50")).toBeNull();
  });
});
