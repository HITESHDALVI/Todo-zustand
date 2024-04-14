interface IColor {
  id: number;
  name: string;
  color: string;
}

interface ICategory {
  id: number;
  name: string;
  title: string;
  description: string;
  time: string;
}

interface ITask {
  id: number;
  name: string;
  category_id: number;
  completed: boolean;
}
