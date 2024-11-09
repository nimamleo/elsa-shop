export class Message<T> {
  constructor(init?: Partial<Message<T>>) {
    Object.assign(this, init);
  }
  value: T;
  name: string;
}
