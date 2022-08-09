export class Task {
  id: number;
  taskname: string;
  description: string;
  assigneto: string;
  assignedate: string;
  duedate: string;
  status: string = 'NotStarted';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
