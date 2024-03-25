import { host } from "./config";

export interface SolveTableRequest {
  scenarioId: number;
  includeSpinDrift: boolean;
  includeCoriolis: boolean;
  maxRange: number;
  increment: number;
}

export interface SolveTableResponse {
  solutions: Array<Solution>;
}

export interface SolveRequest {
  scenarioId: number;
  includeSpinDrift: boolean;
  includeCoriolis: boolean;
  range: number;
}

export interface SolveResponse {
  solution: Solution;
}

export interface Solution {
  range: number;
  raw_range: number;
  drop: number;
  drop_moa: number;
  time: number;
  windage: number;
  windage_moa: number;
  energy: number;
  velocity: number;
  velocity_x: number;
  velocity_y: number;
}

export async function solveTable(
  request: SolveTableRequest,
): Promise<Response> {
  return fetch(host + "/ballistic/solvetable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function solve(formData: SolveRequest): Promise<Response> {
  return fetch(host + "/ballistic/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
}
