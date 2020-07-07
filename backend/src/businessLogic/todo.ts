import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todosAccess'
import { parseUserId } from '../auth/utils'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import {getUserId} from '../lambda/utils';

const todoAccess = new TodoAccess()

export async function getUserTodos(jwtToken): Promise<TodoItem[]> {
  //Extract the UserId From the jwt Token
  const userId = parseUserId(jwtToken)
  //Return all the User's Todo Results 
  return await todoAccess.getUserTodos(userId)
}

export async function deleteUserTodos(todoId) {

  await todoAccess.deleteUserTodo(todoId)
}

export async function attachTodoUrl(uploadUrl, todoId) {  
  await todoAccess.attachTodoUrl(uploadUrl, todoId)
}

export async function processImage(Key) {  
  await todoAccess.processTodoImage(Key)
}

export async function createTodo(
  todo: TodoItem
): Promise<TodoItem> {
  
  

  return await todoAccess.createTodo(todo)
}


export async function updateTodo( event: APIGatewayProxyEvent ){
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
  const newTodo = await todoAccess.updateTodo(userId, todoId, updatedTodo);
  return newTodo
}

export function getUploadUrl(todoId: string): string {

  //Return the pre-signed Upload URL
  return todoAccess.getUploadUrl(todoId)

}