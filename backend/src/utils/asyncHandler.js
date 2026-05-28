const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    const statusCode = error.statusCode || error.status || 500;
    
    // Only log actual server crashes (500s), avoid spamming the terminal for expected 40x auth rejects
    if (statusCode >= 500) {
      console.error(error); 
    }

    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { asyncHandler };
