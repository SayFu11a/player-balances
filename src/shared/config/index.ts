export const API_BASE_URL = "https://dev-space.su/api/v1";

export const QUERY_KEYS = {
  devices: ["devices"] as const,
  device: (id: string) => ["devices", id] as const,
};
