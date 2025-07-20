import { Todo } from '../entities/Todo';
import dayjs from 'dayjs';

export interface MemoRepository {

  getAllMemos(): Promise<Todo[]>;

  getMemosByDate(targetDate: dayjs.Dayjs): Promise<Todo[]>

  addMemo(memo: Omit<Todo, 'id'>): Promise<number>;

  updateMemoComplete(id: number, completed: boolean): Promise<void>;

  deleteMemo(id: number): Promise<void>;

  deleteMemoAll(): Promise<void>;
}
