global._handleResponse = (res, statusCode, response,
    message, count) => res.status(statusCode).json({
    status: 'success',
    code: response ? response.code : 200,
    message: message || '',
    data: response,
    ...(count !== undefined && { count }),
  });