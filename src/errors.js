const errors = {
  noTokenProvided: {
    errorCode: 100,
    errorInfo: 'No Token Provided'
  },
  invalidToken: {
    errorCode: 101,
    errorInfo: 'Invalid Token'
  },
  alreadyExist: {
    errorCode: 102,
    errorInfo: 'Already Exists'
  },
  databaseServerError: {
    errorCode: 103,
    errorInfo: 'Database Server Error'
  },
  noIdProvided: {
    errorCode: 104,
    errorInfo: 'No Id provided in update request'
  },
  noFieldToBeUpdated: {
    errorCode: 105,
    errorInfo: 'No fields need to be updated'
  },
  badRequest: {
    errorCode: 400,
    errorInfo: 'Bad Request'
  },
  unauthorized: {
    errorCode: 401,
    errorInfo: 'Unauthorized'
  },
  forbidden: {
    errorCode: 403,
    errorInfo: 'Forbidden'
  },
  notFound: {
    errorCode: 404,
    errorInfo: 'Not Found'
  },
  internalServerError: {
    errorCode: 500,
    errorInfo: 'Internal Server Error'
  }
}

export default errors;
