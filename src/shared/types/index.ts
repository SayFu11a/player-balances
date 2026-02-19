/**
 * Место игрока на устройстве
 * balances — текущий баланс (в минимальных единицах валюты)
 */
export interface DevicePlace {
  balances: number;
  currency: string;
  device_id: number;
  place: number;
}

/**
 * Устройство с привязанными местами игроков
 */
export interface Device {
  id: number;
  name: string;
  places: DevicePlace[];
  created_at: string;
  updated_at: string;
}

/**
 * Тело запроса на изменение баланса
 * delta > 0 — пополнение (deposit)
 * delta < 0 — списание (withdraw)
 */
export interface ModBalanceRequest {
  delta: number;
}

/**
 * Стандартный формат ошибки от API
 */
export interface ApiError {
  data: string;
  err: string;
}
