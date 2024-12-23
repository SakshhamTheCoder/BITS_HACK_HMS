const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
  
    const statusCode = err.statusCode || 500; 
    const errorMessage = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, 
    });
  };
  
  module.exports = errorMiddleware;
  