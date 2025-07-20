import { Dayjs } from 'dayjs';
import { Todo } from '../../domain/entities/Todo';
import { MemoRepository } from '../../domain/repositories/MemoRepository';
import { MemoDao } from '../../local/dao/MemoDao';

export class MemoRepositoryImpl implements MemoRepository {
  constructor(private memoDao: MemoDao) {}

  async getAllMemos(): Promise<Todo[]> {
    return await this.memoDao.getAllMemos();
  }

  async getMemosByDate(targetDate: Dayjs): Promise<Todo[]> {
    return await this.memoDao.getMemosByDate(targetDate);
  }

  async addMemo(memo: Omit<Todo, 'id'>): Promise<number> {
    return await this.addMemo(memo)
  }

  async updateMemoComplete(id: number, completed: boolean): Promise<void> {
    return await this.updateMemoComplete(id, completed);
  }

  async deleteMemo(id: number): Promise<void> {
    return await this.deleteMemo(id);
  }

  async deleteMemoAll(): Promise<void> {
    return await this.deleteMemoAll();
  }
}
