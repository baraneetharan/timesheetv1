export class User {
  id: number;
  userid: string;
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
