export interface ListLoadsRequest {}

export interface ListLoadsResponse {
  loads: Array<Load>;
}

export interface Load {
  loadId: number;
  bullet: Bullet;
  muzzleVelocity: number;
  powder: string;
  powderCharge: number;
}

export interface Bullet {
  caliber: number;
  weight: number;
  bc: BallisticCoefficient;
  length: number;
}

export interface BallisticCoefficient {
  value: number;
  dragFunction: number;
}

export interface NewLoadForm {
  name: string;
  bullet: Bullet;
  muzzleVelocity: number;
  powder: string;
  powderCharge: number;
}

export async function fetchLoads(request: ListLoadsRequest): Promise<Response> {
  return fetch('http://localhost:8080/ballistic/listloads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
}

export async function createLoad(formData: NewLoadForm): Promise<Response> {
  return fetch('http://localhost:8080', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}
