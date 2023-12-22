export interface ListScenariosRequest {}

export interface ListScenariosResponse {
  scenarios: Array<Scenario>;
}

export interface Scenario {
  scenarioId: number;
  name: string;
  environmentId: number;
  rifleId: number;
  loadId: number;
}

export interface NewScenarioForm {
  name: string;
  environmentId: number;
  rifleId: number;
  loadId: number;
}

export async function fetchScenarios(request: ListScenariosRequest): Promise<Response> {
  return fetch('http://localhost:8080/ballistic/listscenarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}

export async function createScenario(formData: NewScenarioForm): Promise<Response> {
  return fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}
