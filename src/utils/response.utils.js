/**
 * Formateadores de respuestas HTTP estandarizadas.
 */
export const sendSuccess = (res, data = [], message = 'Operación exitosa', statusCode = 200) => {
  return res.status(statusCode).json({
    status: 'success',
    payload: data,
    ...(message ? { message } : {}),
  });
};

export const sendError = (res, error = 'Error en la petición', statusCode = 500) => {
  return res.status(statusCode).json({
    status: 'error',
    error,
  });
};
