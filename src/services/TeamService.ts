import { API_URL } from "../common/constants";
import { Team } from "../common/types/Team";
import { TeamPlayer } from "../common/types/TeamPlayer";
import fetchWithAuth from "./api";

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
};

const createPlayerFromResponse = (data: any): Team => {
  return new Team(data);
};

const createTeamPlayerFromResponse = (data: any[]): TeamPlayer[] => {
  return data.map((item) => new TeamPlayer(item));
};

export const addTeam = async (name: string): Promise<Team> => {
  const body = JSON.stringify({ name });
  const response = await fetchWithAuth("teams", {
    method: "POST",
    body,
  });

  const result = await handleResponse(response);
  return createPlayerFromResponse(result.data);
};

export const updateTeam = async (id: number, name: string): Promise<Team> => {
  const body = JSON.stringify({ name });
  const response = await fetchWithAuth(`teams/${id}`, {
    method: "PUT",
    body,
  });

  const result = await handleResponse(response);
  return createPlayerFromResponse(result.data);
};

export const fetchTeamById = async (id: number): Promise<Team> => {
  const response = await fetchWithAuth(`teams/${id}`, { method: "GET" });
  const result = await handleResponse(response);
  return createPlayerFromResponse(result.data);
};

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await fetchWithAuth(`teams`, {
    method: "GET",
  });
  const result = await handleResponse(response);
  return result.data.map(createPlayerFromResponse);
};

export const deleteTeam = async (id: number): Promise<void> => {
  const response = await fetchWithAuth(`teams/${id}`, { method: "DELETE" });
  await handleResponse(response);
};

export const generateBalancedTeams = async (
  team_ids: number[]
): Promise<TeamPlayer[]> => {
  const body = JSON.stringify({ team_ids });
  const response = await fetch(`${API_URL}/api/v1/teams/generation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  });

  const result = await handleResponse(response);
  return createTeamPlayerFromResponse(result.data);
};
