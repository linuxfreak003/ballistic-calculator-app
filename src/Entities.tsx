export interface CreateLoadRequest {
  load: Load;
}

export interface CreateLoadResponse {
  load: Load;
}

interface Load {
  loadId: number;
  bullet: Bullet;
  muzzleVelocity: number;
  powder?: string;
  powderCharge?: number;
}

interface Bullet {
  caliber: number;
  weight: number;
  bc: BallisticCoefficient;
  length: number;
}

interface BallisticCoefficient {
  value: number;
  dragFunction: DragFunction;
}

export enum DragFunction {
  DRAG_FUNCTION_UNSPECIFIED = 0,
  DRAG_FUNCTION_G1 = 1,
  DRAG_FUNCTION_G7 = 7,
}
