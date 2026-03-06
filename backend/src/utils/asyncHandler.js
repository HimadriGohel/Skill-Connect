const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error); // Log the error for debugging
    const statusCode = error.status || 500; // Default to 500 if error.status is not set
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error", // Fallback message
    });
  }
};

export { asyncHandler };
