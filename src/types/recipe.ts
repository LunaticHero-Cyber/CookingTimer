export interface Step {
  name: string;
  time: number;
}

export type Recipe = {
  id: number;
  name: string;
  timeTaken: number;
  animation: any;
  steps: Step[];
};
