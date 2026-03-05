import error from "../utilities/error.js";

export const logReq = (req, _res, next) => {
  console.log(
    `${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`,
  );

  if (req.body) console.table(req.body);

  next();
};

export const globalErr = (err, _req, res, _next) => {
  res.status(err.status || 500).json({ errors: [{ msg: err.message }] });
};

export const notFound = (req, _res, next) => {
  next(error(404, "Resource not found"));
};
