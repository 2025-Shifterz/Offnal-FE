// 의존성 관리
import {AddTodoUseCase} from '../domain/useCases/AddTodo';
import {TodoRepositoryImpl} from '../data/impl/TodoRepositoryImpl';
import {TodoCompletionUseCase} from '../domain/useCases/TodoCompletion';
import {DeleteTodoUseCase} from '../domain/useCases/DeleteTodo';
import {GetTodosUseCase} from '../domain/useCases/GetTodos';
import {TodoDao} from '../local/dao/TodoDao';
import { UserRepositoryImpl } from '../data/impl/UserRepositoryImpl';
import { CalendarService } from '../remote/api/CalendarService';
import { WorkCalendarRepositoryImpl } from '../data/impl/CalendarRepositoryImpl';
import { HomeService } from '../remote/api/HomeService';
import { HomeRepositoryImpl } from '../data/impl/HomeRepositoryImpl';
import { GetHomeDataUseCase } from '../domain/useCases/GetHomeData';
import { FastAPIService } from '../remote/api/FastAPIService';
import { MemoDao } from '../local/dao/MemoDao';
import { MemoRepositoryImpl } from '../data/impl/MemoRepositoryImpl';

// 1. 구체적인 데이터 소스 인스턴스 생성
const todoDao = new TodoDao();
const memoDao = new MemoDao();

const calendarService = new CalendarService(); 
const homeService = new HomeService();
export const fastAPIService = new FastAPIService();

// 2. 구체적인 리포지토리 구현체 인스턴스 생성 (TodoDao 주입)
const userRepostiory = new UserRepositoryImpl;
export const todoRepository = new TodoRepositoryImpl(todoDao);
export const memoRepository = new MemoRepositoryImpl(memoDao);
export const workCalendarRepository = new WorkCalendarRepositoryImpl(calendarService);
export const homeRepository = new HomeRepositoryImpl(homeService);



// 3. Use Case 인스턴스 생성 (repository 주입)
// --> 이제 addTodoUseCase 사용가능!
export const addTodoUseCase = new AddTodoUseCase(todoRepository);
export const getTodosUseCase = new GetTodosUseCase(todoRepository);
export const todoCompletionUseCase = new TodoCompletionUseCase(todoRepository);
export const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
export const getHomeDataUseCase = new GetHomeDataUseCase(homeRepository);
