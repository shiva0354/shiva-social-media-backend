/*
 * Send success response to the client with the given data
 */
export const success = (res, data, message = "OK", debug = null) => {
  return response(res, 200, "success", message, debug, data);
};

/*
 * We failed to perform the requested action due to issues with the request (eg. invalid otp).
 */
export const failed = (res, message, errors = null, debug = null) => {
  return response(res, 400, "failed", message, debug, null, errors);
};

/*
 * Some part of the request is invalid. list of errors as (key => array of ) pair is sent in response
 */
export const invalid = (res, message, errors = null, debug = null) => {
  return response(res, 422, "invalid", message, debug, null, errors);
};

/*
 * Request is Unauthenticated. Auth token is missing or invalid.
 */
export const unauthenticated = (
  res,
  message = "Unauthenticated",
  debug = null
) => {
  return response(res, 401, "unauthenticated", message, debug);
};

/*
 * The request is forbidden for the current user due to permissions
 */
export const forbidden = (res, message = "Forbidden", debug = null) => {
  return response(res, 403, "forbidden", message, debug);
};

/*
 * The requested resource was not found on the server
 */
export const notfound = (res, message = "Not Found", debug = null) => {
  return response(res, 404, "notfound", message, debug);
};

/*
 * The request method is not allowed
 */
export const methodNotAllowed = (
  res,
  message = "Method Not Allowed",
  debug = null
) => {
  return response(res, 405, "disallowed", message, debug);
};

/*
 * The client is using an older version of app and must upgrade
 */
export const upgrade = (res, message = "Upgrade Required", debug = null) => {
  return response(res, 426, "upgrade", message, debug);
};

/*
 * The client is hitting our server too many times
 */
export const tooManyRequest = (
  res,
  message = "Too Many Request",
  debug = null
) => {
  return response(res, 429, "too many request", message, debug);
};

/*
 * An exception occurred while processing the request.
 */
export const exception = (res, err, debug = null) => {
  return response(res, 500, "error", "Server Error: " + err.message, debug);
};

const response = (
  res,
  code,
  status,
  message,
  debug = null,
  data = null,
  errors = null
) => {
  let result = { code: code, status: status, message: message };
  if (data) result.data = data;

  if (debug) result.debug = debug;

  if (errors) result.errors = errors;

  // res.status(code)
  return res.status(code).json(result);
  // return result;
};
