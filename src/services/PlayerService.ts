import { Player } from "../common/types/Player";
import fetchWithAuth from "./api";

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const createPlayerFromResponse = (data: any): Player => {
  return new Player(data);
};

export const addPlayer = async (
  name: string,
  skill_level: number
): Promise<Player> => {
  const body = JSON.stringify({ name, skill_level });
  const response = await fetchWithAuth("players", {
    method: "POST",
    body,
  });

  const result = await handleResponse(response);
  return createPlayerFromResponse(result.data);
};

export const updatePlayer = async (
  id: number,
  name: string,
  skill_level: number
): Promise<Player> => {
  const body = JSON.stringify({ name, skill_level });
  const response = await fetchWithAuth(`players/${id}`, {
    method: "PUT",
    body,
  });
  return await createPlayerFromResponse(response);
};

export const fetchPlayerById = async (id: number): Promise<Player> => {
  const response = await fetchWithAuth(`players/${id}`, { method: "GET" });
  const result = await handleResponse(response);
  return createPlayerFromResponse(result.data);
};

export const fetchPlayers = async (): Promise<Player[]> => {
  const response = await fetchWithAuth(`players`, {
    method: "GET",
  });
  const result = await handleResponse(response);
  return result.data.map(createPlayerFromResponse);
};

export const deletePlayer = async (id: number): Promise<void> => {
  const response = await fetchWithAuth(`players/${id}`, { method: "DELETE" });
  await handleResponse(response);
};
