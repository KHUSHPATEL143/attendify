const { User, Student } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const jwt = require('jsonwebtoken');

/**
 * Helper to generate JWT token and send response
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign(
    { id: user._id, role: user.role || 'student' },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d',
    }
  );

  // Determine what user data to send back
  let userData;
  if (user.role) { // Admin or Teacher (from User model)
    userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      assignedClass: user.assignedClass
    };
  } else { // Student (from Student model)
    userData = {
      _id: user._id,
      name: user.name,
      grNumber: user.grNumber,
      role: 'student',
      class: user.class
    };
  }

  res.status(statusCode).json({
    success: true,
    message: 'Login successful',
    data: userData,
    token,
  });
};

/**
 * @desc    Login Admin / Teacher
 * @route   POST /api/auth/staff-login
 * @access  Public
 */
exports.staffLogin = asyncHandler(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ApiError('Please provide an email and password', 400));
  }

  // Validate role
  if (!role || !['admin', 'teacher'].includes(role)) {
    return next(new ApiError('Please provide a valid role (admin or teacher)', 400));
  }

  // Check for user
  const user = await User.findOne({ email, role }).select('+password');

  if (!user || !user.isActive) {
    return next(new ApiError('Invalid credentials or account inactive', 401));
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ApiError('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Login Student
 * @route   POST /api/auth/student-login
 * @access  Public
 */
exports.studentLogin = asyncHandler(async (req, res, next) => {
  const { grNumber, dateOfBirth } = req.body;

  // Validate GR Number & Date of Birth
  if (!grNumber || !dateOfBirth) {
    return next(new ApiError('Please provide GR Number and Date of Birth', 400));
  }

  // Find student by GR number
  const student = await Student.findOne({ grNumber }).populate('class');

  if (!student || !student.isActive) {
    return next(new ApiError('Invalid GR Number or account inactive', 401));
  }

  // Verify date of birth (simple comparison for login)
  // Converting both to ISO strings up to the 'T' (YYYY-MM-DD) for comparison
  const inputDOB = new Date(dateOfBirth).toISOString().split('T')[0];
  const dbDOB = new Date(student.dateOfBirth).toISOString().split('T')[0];

  if (inputDOB !== dbDOB) {
    return next(new ApiError('Invalid credentials', 401));
  }

  sendTokenResponse(student, 200, res);
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private (Admin/Teacher/Student)
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  // req.user is set in protect middleware, but we need to fetch fresh data and populate class
  let user;

  if (req.user.role === 'admin' || req.user.role === 'teacher') {
    user = await User.findById(req.user._id).populate('assignedClass');
    user = user.toObject(); // Convert to plain object to manipulate
  } else {
    // Setup student role and fetch fresh
    let student = await Student.findById(req.user._id).populate('class');
    user = student.toObject();
    user.role = 'student';
  }

  ApiResponse.success(res, user, 'Current user data retrieved');
});
