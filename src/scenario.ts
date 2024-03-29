import { host } from "./config";

export interface ListScenariosRequest {}

export interface ListScenariosResponse {
  scenarios: Array<Scenario>;
}

export interface Scenario {
  scenarioId?: number;
  name: string;
  environmentId: number;
  rifleId: number;
  loadId: number;
}

export interface CreateScenarioRequest {
  scenario: Scenario;
}

export interface UpdateScenarioRequest {
  scenario: Scenario;
}

export interface DeleteScenarioRequest {
  scenarioId: number;
}

export async function fetchScenarios(
  request: ListScenariosRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/listscenarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function createScenario(
  formData: CreateScenarioRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/createscenario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export async function updateScenario(
  formData: UpdateScenarioRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/updatescenario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}

export async function deleteScenario(
  formData: DeleteScenarioRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/deletescenario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
