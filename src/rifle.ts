export interface ListRiflesRequest {}

export interface ListRiflesResponse {
  rifles: Array<Rifle>;
}

export interface CreateRifleRequest {
  rifle: Rifle;
}

export interface CreateRifleResponse {
  rifle: Rifle;
}

export interface Rifle {
  rifleId?: number;
  name: string;
  sightHeight: number;
  barrelTwist: number;
  twistDirectionLeft: boolean;
  zeroRange: number;
}

export async function fetchRifles(
  request: ListRiflesRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/listrifles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function createRifle(
  formData: CreateRifleRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/createrifle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
