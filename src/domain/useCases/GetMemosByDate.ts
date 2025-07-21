import { Todo } from '../entities/Todo';
import { MemoRepository } from '../repositories/MemoRepository';
import dayjs from 'dayjs';

export class GetMemosByDateUseCase {
  constructor(private memoRepository: MemoRepository) {}

  async execute(targetDate: dayjs.Dayjs): Promise<Todo[]> {
    return await this.memoRepository.getMemosByDate(targetDate);
  }
}
