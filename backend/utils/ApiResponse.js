/**
 * Standardized API response helper.
 * Usage: ApiResponse.success(res, data, 'Fetched successfully', 200);
 *        ApiResponse.error(res, 'Not found', 404);
 */
class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = 'Server Error', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}

module.exports = ApiResponse;
