import { getValidationError } from "./validation";

describe("getValidationError", () => {
  // --- Невалидные значения ---

  it("возвращает ошибку если поле пустое", () => {
    expect(getValidationError("")).toBe("Введите сумму");
  });

  it("возвращает ошибку если только пробелы", () => {
    expect(getValidationError("   ")).toBe("Введите сумму");
  });

  it("возвращает ошибку если введены буквы", () => {
    expect(getValidationError("abc")).toBe("Введите корректное число");
  });

  it("возвращает ошибку при научной нотации (1e5)", () => {
    expect(getValidationError("1e5")).toBe("Введите корректное число");
  });

  it("возвращает ошибку если введён ноль", () => {
    expect(getValidationError("0")).toBe("Сумма должна быть больше нуля");
  });

  it("возвращает ошибку при отрицательном числе", () => {
    expect(getValidationError("-50")).toBe("Введите корректное число");
  });

  it("возвращает ошибку если 3 знака после запятой", () => {
    expect(getValidationError("100.567")).toBe(
      "Максимум 2 знака после запятой (например: 100.50)"
    );
  });

  // --- Валидные значения ---

  it("пропускает целое число", () => {
    expect(getValidationError("100")).toBeNull();
  });

  it("пропускает число с 1 знаком после запятой", () => {
    expect(getValidationError("100.5")).toBeNull();
  });

  it("пропускает число с 2 знаками после запятой", () => {
    expect(getValidationError("100.50")).toBeNull();
  });

  it("пропускает число без целой части (.5)", () => {
    expect(getValidationError(".5")).toBeNull();
  });

  it("пропускает число без целой части (.99)", () => {
    expect(getValidationError(".99")).toBeNull();
  });
});
