const notFound = (req, res) => {
  res.status(404).json({ error: "not found" });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const errorStatus = err.status ?? 500;

  res.status(errorStatus).json({ error: err.message });
};

module.exports = { errorHandler, notFound };
