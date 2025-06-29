// 의존성 관리
import {AddTodoUseCase} from '../domain/useCases/AddTodo';
import {TodoLocalSource} from '../data/sources/TodoLocalSource';
import {TodoRepositoryImpl} from '../data/repositories/TodoRepositoryImpl';
import {TodoCompletionUseCase} from '../domain/useCases/TodoCompletion';
import {DeleteTodoUseCase} from '../domain/useCases/DeleteTodo';
import {GetTodosUseCase} from '../domain/useCases/GetTodos';

// 1. 구체적인 데이터 소스 인스턴스 생성
const todoLocalSource = new TodoLocalSource();
// 2. 구체적인 리포지토리 구현체 인스턴스 생성 (localSource 주입)
const todoRepository = new TodoRepositoryImpl(todoLocalSource);

// 3. Use Case 인스턴스 생성 (repository 주입)
// ---> 이제 addTodoUseCase 사용가능! (AddTodoUseCase는 클래스이므로 이것을 직접 사용하는 것은 불가능함)
export const addTodoUseCase = new AddTodoUseCase(todoRepository);
export const getTodosUseCase = new GetTodosUseCase(todoRepository);
export const todoCompletionUseCase = new TodoCompletionUseCase(todoRepository);
export const deleteTodoUseCase = new DeleteTodoUseCase(todoRepository);
