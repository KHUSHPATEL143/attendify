const jwt = require('jsonwebtoken');
const { User, Student } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

/**
 * Protect routes - Verify JWT token
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return next(new ApiError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user or student based on the role in the token
    if (decoded.role === 'admin' || decoded.role === 'teacher') {
      req.user = await User.findById(decoded.id);
    } else if (decoded.role === 'student') {
      req.user = await Student.findById(decoded.id);
      req.user.role = 'student'; // Add role explicitly since it's not in the Student schema
    }

    if (!req.user || !req.user.isActive) {
      return next(new ApiError('User not found or inactive', 401));
    }

    next();
  } catch (err) {
    return next(new ApiError('Not authorized to access this route', 401));
  }
});

/**
 * Grant access to specific roles
 * @param  {...String} roles - Array of roles allowed ('admin', 'teacher', 'student')
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // req.user is set in the protect middleware
    const userRole = req.user.role;
    
    if (!roles.includes(userRole)) {
      return next(
        new ApiError(
          `User role '${userRole}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
