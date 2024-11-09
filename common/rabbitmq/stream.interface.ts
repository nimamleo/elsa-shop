export interface Stream {
  name: string;
  payload: (data: any) => any;
}
