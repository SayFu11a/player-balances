/**
 * Форматирует баланс из минимальных единиц валюты в читаемый вид.
 *
 * Сервер хранит деньги как целые числа (int64) в копейках/центах,
 * чтобы избежать погрешностей floating point при арифметике.
 *
 * Примеры:
 *   10050  → "100.50"
 *   -23519 → "-235.19"
 *   0      → "0.00"
 */
export const formatBalance = (balanceInMinorUnits: number): string => {
  return (balanceInMinorUnits / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
