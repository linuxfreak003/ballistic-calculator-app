import Config from "./api";

export interface ListLoadsRequest {}

export interface ListLoadsResponse {
  loads: Array<Load>;
}

export interface CreateLoadRequest {
  load: Load;
}

export interface CreateLoadResponse {
  load: Load;
}

export interface Load {
  loadId?: number;
  name: string;
  bullet: Bullet;
  muzzleVelocity: number;
  powder?: string;
  powderCharge?: number;
}

export interface Bullet {
  caliber: number;
  weight: number;
  bc: BallisticCoefficient;
  length: number;
}

export interface BallisticCoefficient {
  value: number;
  dragFunction: string;
}

export async function fetchLoads(request: ListLoadsRequest): Promise<Response> {
  return fetch(host + "/ballistic/listloads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function createLoad(
  formData: CreateLoadRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/createload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
