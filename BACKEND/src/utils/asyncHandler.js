const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error("Caught Error:", error);

    const statusCode =
      error?.statusCode && error.statusCode >= 100 && error.statusCode < 600
        ? error.statusCode
        : 500;

    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export { asyncHandler };
