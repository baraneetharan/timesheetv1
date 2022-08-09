export class Log {
  id: number;
  taskname: string;
  empname: string;
  date: string;
  stime: string;
  etime: string;
  status: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
