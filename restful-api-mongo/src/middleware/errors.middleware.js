// ************************************
// ERROR-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

/**
 * Handle req that would produce a 404 status code and respond accordingly.
 */
export const error404 = (req, res, next) => {
  res.status(404).json({ message: 'Not Found' }); 
};

/**
 * Handle req that would produce a 500 status code and respond accordingly.
 */
export const error500 = (error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: {
      message: error.message,
    },
  });
};

export const logger = (port) => {
  return () => {
    console.log(`Running on port: ${port}...`);
  };
};