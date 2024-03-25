export interface ListEnvironmentsRequest {}

export interface ListEnvironmentsResponse {
  environments: Array<Environment>;
}

export interface CreateEnvironmentRequest {
  environment: Environment;
}

export interface CreateEnvironmentResponse {
  environment: Environment;
}

export interface Environment {
  environmentId?: number;
  name: string;
  temperature: number;
  altitude: number;
  pressure: number;
  humidity: number;
  windAngle: number;
  windSpeed: number;
  pressureIsAbsolute: boolean;
  latitude: number;
  azimuth: number;
}

export async function fetchEnvironments(
  request: ListEnvironmentsRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/listenvironments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function createEnvironment(
  formData: CreateEnvironmentRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/createenvironment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
