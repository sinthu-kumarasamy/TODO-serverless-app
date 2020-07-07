import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteUserTodos } from '../../businessLogic/todo'
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  logger.info('Event Processing', {event: event.body})

  //Get the TodoId From the Query String
  const todoId = event.pathParameters.todoId

  
  logger.info('User Todoid', {toId: todoId})

  
  //Delete User's Todo Item
  await deleteUserTodos(todoId)

  // Return the New Item Result back to the Client
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: {}
    })
  }
}
