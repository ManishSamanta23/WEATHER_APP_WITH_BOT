const logger = (req, res, next) => {
  const startTime = Date.now();
  const originalJson = res.json;

  res.json = function(data) {
    const duration = Date.now() - startTime;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    res.json = originalJson;
    return res.json(data);
  };

  next();
};

export default logger;
